// app/api/payment.ts
import type { NextRequest } from 'next/server'
import stripe from '../../utils/stripe'

export async function middleware (req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const { amount, customerId } = await req.json()
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customerId
      // Additional payment settings...
    })

    return new Response(JSON.stringify(paymentIntent), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
