// utils/stripe.ts
import platformConfig from '@/config/app-config'
import Stripe from 'stripe'



const stripe = new Stripe(platformConfig.variables.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
})

export default stripe
