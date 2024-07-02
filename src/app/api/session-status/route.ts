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

export async function GET(req: Request) {
    const data = await getServerSession(authOptions);

    if (!data?.user) {
        return NextResponse.json({}, { status: 403 })
    }
    try {
        const session = await stripe.checkout.sessions.retrieve(new URL(req.url).searchParams.get("session_id") ?? "");
        return NextResponse.json({
            status: session.status,
            customer_email: session?.customer_details?.email ?? ""
        }, { status: 200 });
    } catch (error) {
        if (error instanceof Stripe.errors.StripeError) {
            const { message } = error;
            return NextResponse.json({ message }, { status: error.statusCode });
        }
    }
}
