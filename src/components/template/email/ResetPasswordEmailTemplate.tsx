import platformConfig from "@/config/app-config";
import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface ResetPasswordEmailProps {
    name?: string;
    organizationName?: string;
    resetPasswordLink?: string;
}

const baseUrl = platformConfig.variables.NEXT_URL || "http://localhost:3000"

export const ResetPasswordEmail = ({
    name,
    resetPasswordLink,
    organizationName
}: ResetPasswordEmailProps) => {
    const previewText = `Reset password for  account on ${organizationName}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind config={{
                theme: {
                    extend: {
                        colors: {
                            'primary-500': "#705AF8",
                            'primary-600': " #5C37EB",
                            'disabled': "#D6D5FF"
                        },
                    },
                },
            }}>
                <Body className="bg-[#FAFAFA] font-sans  pt-[60px] ">
                    <Container className=" bg-white  px-[5vw] pt-[36px] pb-[24px] rounded-[10px]    mx-auto  flex flex-col justify-center    min-w-[250px] max-w-[565px]">
                        <Text className="text-black text-2xl font-bold leading-[24px]">
                            Hi {name},
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            You recently requested an password reset  and reset password  email is sent.
                        </Text>
                        <Text>
                            Click the button below to reset the password,
                        </Text>
                        <Section className="text-left mt-[32px] mb-[32px]">
                            <Button
                                className=" min-w-fit cursor-pointer rounded-lg flex justify-center items-center gap-2 duration-150 ease-in-out  text-[14px] font-normal leading-[20px] 
                                hover:bg-primary-600 text-white bg-primary-500 focus:shadow-focus-primary  disabled:bg-disabled 
                                py-[14px] px-5 "
                                href={resetPasswordLink}
                            >
                                Reset your Password                            </Button>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px]">
                            or copy and paste this URL into your browser:{" "}
                            <Link href={resetPasswordLink} className="text-blue-600 no-underline">
                                {resetPasswordLink}
                            </Link>
                        </Text>
                        <Section className="text-left mt-[-10px] mb-[32px]">
                            <Text>
                                Thanks,
                            </Text>
                            <Text>
                                {organizationName} team
                            </Text>
                        </Section>
                        <Section className="text-left mt-[32px] mb-[32px] p-4  border-gray-300 rounded-md  border border-solid">
                            <Text>
                                P.S. We also love hearing from you and helping you with any issues you have. Please reply to this email if you want to ask a question or just say hi.
                            </Text>
                        </Section>
                    </Container>
                    <Container className=" !w-full min-w-full min-h-[250px] mx-auto">
                        <Section className="mt-4 text-center mb-4">
                            <Row>
                                <Img
                                    src={`${baseUrl}/images/email-footer-logo.png`}

                                    alt="CodePilot"
                                    className="my-0  mx-auto"
                                    width={"142"}
                                    height={"35"}
                                />
                            </Row>
                        </Section>
                        <Section className=" text-center">
                            <Row className="mx-auto">
                                <Column>

                                    <Text className="text-[#8E8E8E] text-center text-[12px]">
                                        © 2024, All right reserved.
                                    </Text>
                                </Column>
                            </Row>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

ResetPasswordEmail.PreviewProps = {
    name: "Fortan",
    resetPasswordLink: "https://codepilot.dev/confirm/1234567890",
    organizationName: "CodePilot",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;
