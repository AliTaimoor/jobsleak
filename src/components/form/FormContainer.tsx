import React, { Suspense } from 'react'


interface FormContainerProps extends React.HTMLAttributes<HTMLFormElement> {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void

}

const FormContainer = (props: FormContainerProps) => {
    return (
        <Suspense fallback="loading">
            <div className="flex py-6 lg:py-10 justify-center w-full min-h-screen items-center  ">
                <form onSubmit={props.onSubmit} className=" w-11/12 md:w-2/3 lg:w-full max-w-[500px] bg-white dark:bg-card-dark  rounded-[20px]      m-auto flex flex-col  gap-4  lg:gap-8 p-6 lg:p-10 ">
                    {props.children}
                </form>
            </div>
        </Suspense>
    )
}

export default FormContainer