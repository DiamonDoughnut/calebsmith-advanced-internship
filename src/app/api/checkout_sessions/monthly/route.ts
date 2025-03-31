
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../../lib/stripe'
import { NextURL } from 'next/dist/server/web/next-url'

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1R8VREFKTdx3nO9pCWndXHit',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/for-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/choose-plan?canceled=true`,
    });
    return NextResponse.redirect(session.url as string | URL | NextURL, 303)
  } catch (err) {
    return NextResponse.json(
      //@ts-expect-error: error is type unknown
      { error: err.message as string | URL | NextURL },
      //@ts-expect-error: error is type unknown
      { status: err.statusCode as number || 500 }
    )
  }
}