import { prisma } from "@/lib/prisma";
import stripe from "@/utils/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import platformConfig from "@/config/app-config";


export async function POST(request: Request) {
    const rawBody = (await request.text()) as any;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event = null;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers.get('stripe-signature');

        try {
            if (!signature) throw new Error('Stripe signature is missing')
            event = stripe.webhooks.constructEvent(
                rawBody,
                signature,
                endpointSecret
            );
        } catch (err: any) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return NextResponse.json({}, { status: 400 });
        }
    }
    let subscription;
    let status;

    const dataObject = (event as any).data.object;
    if (!event) {
        return NextResponse.json({}, { status: 400 });
    }
    // Handle the event
    switch ((event as any).type) {
        case 'invoice.payment_succeeded':
            if (dataObject['billing_reason'] === 'subscription_create') {
                // The subscription automatically activates after successful payment
                // Set the payment method used to pay the first invoice
                // as the default payment method for that subscription
                const subscription_id = dataObject['subscription']
                const payment_intent_id = dataObject['payment_intent']

                // Retrieve the payment intent used to pay the subscription
                const payment_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

                try {
                    const sub = await stripe.subscriptions.update(
                        subscription_id,
                        {
                            default_payment_method: payment_intent.payment_method as string ?? undefined,
                        },
                    );

                    console.log("Default payment method set for subscription:" + payment_intent.payment_method);

                    let quota = 0;
                    const priceId = sub.items.data[0].price.id;
                    if(priceId === platformConfig.pricing.plans.basic.planId)
                        quota = platformConfig.pricing.plans.basic.quota;
                    else if(priceId === platformConfig.pricing.plans.pro.planId)
                        quota = platformConfig.pricing.plans.pro.quota;
                    else if(priceId === platformConfig.pricing.plans.proPlus.planId)
                        quota = platformConfig.pricing.plans.proPlus.quota;

                    await prisma.subscription.update({
                        where: {
                            stripeSubscriptionId: subscription_id,
                        },
                        data: {
                            status: "active",
                            totalQuota: quota,
                            usedQuota: 0
                        }
                    });

                } catch (err) {
                    console.log(err);
                    console.log(`⚠️  Falied to update the default payment method for subscription: ${subscription_id}`);
                }
            }
            break;
        case 'invoice.payment_failed':
            // If the payment fails or the customer does not have a valid payment method,
            //  an invoice.payment_failed event is sent, the subscription becomes past_due.
            // Use this webhook to notify your user that their payment has
            // failed and to retrieve new card details.
            break;
        case 'invoice.finalized':
            // If you want to manually send out invoices to your customers
            // or store them locally to reference to avoid hitting Stripe rate limits.
            break;
        case 'customer.subscription.trial_will_end':
            subscription = event.data.object as Stripe.Subscription;
            status = subscription.status;
            // Then define and call a method to handle the subscription trial ending.
            // handleSubscriptionTrialEnding(subscription);
            break;
        case 'customer.subscription.deleted':
            subscription = event.data.object as Stripe.Subscription;
            status = subscription.status;
            await prisma.subscription.delete({
                where: {
                    stripeSubscriptionId: subscription.id,
                }
            });
            console.log(`Subscription status is ${status}.`);
            // Then define and call a method to handle the subscription deleted.
            // handleSubscriptionDeleted(subscriptionDeleted);
            break;
        case 'customer.subscription.created': {

            subscription = (event.data.object as Stripe.Subscription);
            status = (subscription as Stripe.Subscription).status;


            const plan = await stripe.plans.retrieve(subscription.items.data[0].plan.id);
            const product = await stripe.products.retrieve(plan.product as string);

            await prisma.subscription.create({
                data: {
                    stripeSubscriptionId: subscription.id,
                    status: subscription.status,
                    name: product.name,
                    startDate: new Date(subscription.current_period_start),
                    endDate: new Date(subscription.current_period_end),
                    priceId: subscription.items.data[0].price.id,
                    userId: subscription.metadata.userId,
                    teamId: subscription.metadata.teamId,
                    totalQuota: 0,
                    usedQuota: 0
                }
            });
            // Then define and call a method to handle the subscription created.
            // handleSubscriptionCreated(subscription);
        }
            break;
        case 'customer.subscription.updated':
            subscription = event.data.object as Stripe.Subscription;
            status = subscription.status;
            await prisma.subscription.update({
                where: {
                    stripeSubscriptionId: subscription.id,
                },
                data: {
                    stripeSubscriptionId: subscription.id,
                    status: subscription.status,
                    startDate: new Date(subscription.current_period_start),
                    endDate: new Date(subscription.current_period_end),
                    priceId: subscription.items.data[0].price.id,
                    userId: subscription.metadata.userId,
                    teamId: subscription.metadata.teamId,
                }
            });
            // Then define and call a method to handle the subscription update.
            // handleSubscriptionUpdated(subscription);
            break;
        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);
    }
    return NextResponse.json({}, { status: 200 });
}
