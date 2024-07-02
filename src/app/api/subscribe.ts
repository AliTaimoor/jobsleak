// app/api/subscribe.ts
import type { NextRequest } from 'next/server'
import stripe from '@/utils/stripe'

export async function middleware (req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const { customerId, planId } = await req.json()
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ plan: planId }]
      // Add more subscription details as per your requirements
    })

    return new Response(JSON.stringify(subscription), {
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
