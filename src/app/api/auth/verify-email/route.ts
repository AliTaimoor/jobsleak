// app/api/verify-email.ts
// import { sendEmail } from '@/utils/sendEmail'
import { type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  // const { email, verifyUrl } = await req.json()
  // const result = await sendEmail({
  //   to: email,
  //   subject: 'Verify Your Email',
  //   // text: `Please verify your email by clicking on this link: ${verifyUrl}`,
  //   // html: `<p>Please verify your email by clicking on this link: <a href="${verifyUrl}">${verifyUrl}</a></p>`
  // })

  return new Response(JSON.stringify({}), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
