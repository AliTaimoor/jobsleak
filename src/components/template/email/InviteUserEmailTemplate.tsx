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

interface InviteUserEmailTemplateProps {
    organizationName?: string;
    acceptInviteLink?: string;
}

const baseUrl = process.env.NEXT_URL || "http://localhost:3000"

export const InviteUserEmailTemplate = ({
    organizationName,
    acceptInviteLink
}: InviteUserEmailTemplateProps) => {
    const previewText = `Invitation to join ${organizationName}!`;

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
                    <Container className="bg-white rounded-[10px]    mx-auto  min-w-[250px]   ">
                        <Section className="text-center">
                            <Row>
                                <Column>
                                    <Img
                                        src={`${baseUrl}/images/launch-ph.png`}
                                        alt="CodePilot"
                                        className="my-0  mx-auto w-full min-h-[150px]  object-cover"
                                    />
                                </Column>
                            </Row>
                        </Section>
                        <Container className=" px-5 pt-5 pb-[24px]  flex flex-col justify-center  gap-6 max-w-[500px]  ">

                            <Text className="text-[#0F0F0F] text-[28px] mb-6 font-bold leading-[38px]">
                                You’re invited to join {organizationName}
                            </Text>
                            <Text className="text-[#0F0F0F] text-base  mb-6 leading-[24px]">
                                Are you ready to unlock the potential of AI & Software tools?
                            </Text>
                            <Text className="text-[#0F0F0F] text-base  mb-6 leading-[24px]">
                                Join
                                <Link href="https://www.codepilot.dev" target="_blank" className="text-blue-600 ml-1 no-underline">Codepilot </Link>

                                today and gain access to a curated directory of the most innovative AI & software solutions on the market.
                            </Text>
                            <Button
                                className=" min-w-fit cursor-pointer rounded-lg flex justify-center items-center gap-2 duration-150 ease-in-out  text-[14px] font-normal leading-[20px] 
                                hover:bg-primary-600 text-white bg-primary-500 focus:shadow-focus-primary  disabled:bg-disabled 
                                py-[14px] px-5 "
                                href={acceptInviteLink}
                            >
                                Accept Invitation
                            </Button>
                            <Text className="text-[#0F0F0F] text-base  mb-6 leading-[24px]">
                                Thank you for your support and for being part of our community. We can&apos;t wait to see what you build!
                            </Text>
                            <Text className="text-[#0F0F0F] text-base  mb-6 leading-[24px]">
                                Enjoy the rest of your week, <br />
                                {organizationName} team.
                            </Text>
                            <Section className="text-left mt-[32px] mb-[32px] p-4  border-gray-300 rounded-md  border border-solid">
                                <Text className="text-[#7A7A7A] text-base leading-[150%]">
                                    <span className="font-bold">P.S. </span> We also love hearing from you and helping you with any issues you have. Please reply to this email if you want to ask a question or just say hi.
                                </Text>
                            </Section>
                        </Container>
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

InviteUserEmailTemplate.PreviewProps = {
    organizationName: "Codepilot",
    acceptInviteLink: "https://codepilot.dev/confirm/1234567890",
} as InviteUserEmailTemplateProps;

export default InviteUserEmailTemplate;
