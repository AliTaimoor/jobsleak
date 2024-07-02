'use client'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test public API key.
const stripePromise = loadStripe("pk_test_51MW2YiKVzPXKk9PeFXm20gCEk8rVf7WvceGvee1692Cd8TLfbuWbf3cr8IRpeM46Bye0rsqaKVyQJKWrApVESxt400uvc0dOnr");

interface CheckoutFormProps {
    clientSecret: string
}
const CheckoutForm = ({ clientSecret }: CheckoutFormProps) => {

    return (
        <div id="checkout">
            {clientSecret && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>

    )
}

export default CheckoutForm