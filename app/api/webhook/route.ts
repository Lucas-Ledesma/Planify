import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/organization/subscription`

export async function POST(req: Request) {
	const body = await req.text()
	const signature = headers().get(
		'Stripe-Signature'
	) as string

	let event: Stripe.Event

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		)
	} catch (error) {
		return new NextResponse('Webhook error', {
			status: 400,
		})
	}

	const session = event.data
		.object as Stripe.Checkout.Session

	await axios.post(`${URL}`, { event, session })

	return new NextResponse(null, { status: 200 })
}
