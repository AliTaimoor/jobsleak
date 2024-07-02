'use client'
import { CheckoutSubscriptionBody } from '@/app/api/checkout-session/route'
import React from 'react'
import Stripe from 'stripe';
import Button from '../../atomic/button/Button';
import TickIcon from '@/icons/TickIcon';
import CrossIcon from '@/icons/cross-icon.svg';
import Modal from '../../atomic/modal/Modal';
import CheckoutForm from '@/containers/CheckoutForm';
import customToast from '../../atomic/toast/customToast';
import { Plans } from '@/config/app-config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import siteUrls from '@/config/site-config';
import { cn } from '@/utils/cn';
import { useTranslation } from 'react-i18next';
export default function PricingProduct({ name, description, price, features, plan, recommended, planId, isMonthly }: {
    name: string
    description?: string
    price: number
    features: { name: string, plans: Plans[] }[]
    plan: Plans
    planId: string
    recommended?: boolean
    isMonthly?: boolean
}) {
    const { t } = useTranslation('landing')
    const { data: session } = useSession()
    const [loading, setLoading] = React.useState(false)
    const [clientSecret, setClientSecret] = React.useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const router = useRouter()
    const handleClick = async () => {

        if (!session?.user) {
            return router.push(`${siteUrls.general.login}?callbackUrl=${siteUrls.general.settings}`)
        }
        // step 1: load stripe
        try {
            // step 2: define the data for monthly subscription
            const body: CheckoutSubscriptionBody = {
                price_id: planId
            };

            setLoading(true)
            // step 3: make a post fetch api call to /checkout-session handler
            const result = await fetch("/api/checkout-session", {
                method: "post",
                body: JSON.stringify(body, null),
                headers: {
                    "content-type": "application/json",
                },
            });

            // step 4: get the data and redirect to checkout using the sessionId
            const data = (await result.json()) as Stripe.Checkout.Session;
            console.log(data);
            setClientSecret(data.client_secret);
            setIsModalOpen(true);
            setLoading(false)
        } catch (error) {
            customToast.error((error as any).message)
        }

    };
    return (
        <>
            <div className={cn("card  border border-grey-500 dark:border-input-border-dark dark:bg-card-dark rounded-[32px] h-full flex justify-center bg-white px-5 py-14 lg:px-8", recommended ? "border-[4px] border-primary-end dark:border-primary" : "")}>
                {recommended && (
                    <div className='rounded-[40px] shadow-recommended-pricing  px-6 py-[6px]  bg-primary text-white leading-[140%] text-sm font-semibold  w-fit absolute top-[-20px] mx-auto left-0 right-0 text-center  '>{t("pricing.recommended")}</div>
                )}
                <div className="card-body p-0">
                    <div className='flex  flex-col items-center justify-center mb-2 '>
                        <h3 className="mb-6 text-[40px] font-semibold text-stone-950 dark:text-white ">{name}</h3>
                        {description && <p className="font-light text-light-grey text-center m:text-lg min-h-[90px] text-stone-6 max-w-[300px] ">{description}</p>}
                    </div>

                    <div className="flex justify-center items-end py-8 !text-stone-950 dark:!text-white">
                        <span className="mr-2 text-4xl font-bold flex items-end leading-none ">
                            $ {price.toFixed(2)}
                        </span>
                        <div className='text-2xl leading-none'>
                            <span className='mr-1'>
                                /
                            </span>
                            <span>
                                {isMonthly ? t("pricing.month") : t("pricing.year")}
                            </span>

                        </div>

                    </div>

                    <div className="card-actions mb-8 justify-center">
                        <Button className='w-full' onClick={handleClick} loading={loading} label={t("pricing.start")} />
                    </div>
                    <ul role="list" className="mb-8 space-y-2 text-left">
                        {
                            features.filter(f => f.plans.includes(plan)).map((feature, index) => {
                                return (
                                    <li className="flex  flex-row items-center gap-4 py-3 px-2 text-stone-950 text-sm font-semibold dark:text-white" key={feature + '-' + index}>
                                        {feature.plans.includes(plan) ? <TickIcon /> : <CrossIcon />}
                                        <span><b className='text-lg leading-none'></b> {feature.name}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>

                </div>
            </div>
            {clientSecret && <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }} > <h1>Stripe</h1> <CheckoutForm clientSecret={clientSecret} /></Modal>}
        </>
    )
}