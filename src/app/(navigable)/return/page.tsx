"use client";
import React from 'react'
import Modal from "@/components/atomic/modal/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ReturnPage = () => {
    const router = useRouter()
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const searchParams = useSearchParams()
    useEffect(() => {

        const urlParams = new URLSearchParams(searchParams);
        const sessionId = urlParams.get('session_id');

        fetch(`/api/session-status?session_id=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
            });
    }, []);

    if (status === 'open') {
        router.push("/settings#subscriptions");
        return <></>
    }

    if (status === 'complete') {
        return (
            <div className="h-screen w-full">
                <Modal isOpen={true} onClose={() => { router.push("/dashboard") }}>
                    <h1>Success</h1>
                    <section id="success" >
                        <p className="text-black dark:text-white">
                            We appreciate your business! A confirmation email will be sent to {customerEmail}.

                            If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                        </p>
                    </section>
                </Modal>
            </div>

        )
    }

    return null;
}


export default ReturnPage;