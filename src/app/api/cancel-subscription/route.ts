// app/checkout-sessions/route.ts
import { authOptions } from "@/lib/auth/authOptions";
import stripe from "@/utils/stripe";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// data needed for checkout
export interface CheckoutSubscriptionBody {
    price_id: string;
    customerId?: string;
}

export async function POST() {
    const data = await getServerSession(authOptions);

    if (!data?.user) {
        return NextResponse.json({}, { status: 403 })
    }
    const user = data.user;
    if (!user.subscription) {
        return NextResponse.json({ message: "User does not have a subscription" }, { status: 400 });
    }

    try {
        const response = await stripe.subscriptions.cancel(user.subscription.stripeSubscriptionId);

        return NextResponse.json({
            message: "Subscription cancelled successfully",
            response
        }, { status: 200 });
    } catch (error) {
        if (error instanceof Stripe.errors.StripeError) {
            const { message } = error;
            return NextResponse.json({ message }, { status: error.statusCode });
        }
    }
}
