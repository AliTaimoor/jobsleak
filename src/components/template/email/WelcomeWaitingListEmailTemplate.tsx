import platformConfig from "@/config/app-config";
import {
    Body,
    Column,
    Container,
    Head,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";


interface WelcomeWaitingListEmailTemplateProps {
    organizationName?: string;
}

const baseUrl = platformConfig.variables.NEXT_URL;

export const WelcomeWaitingListEmailTemplate = ({
    organizationName
}: WelcomeWaitingListEmailTemplateProps) => {
    const previewText = `Welcome list completion ${organizationName}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>

            <Tailwind
            >


                <Body className="bg-[#FAFAFA] font-sans  pt-[60px] ">
                    <Container className=" bg-white  px-[5vw] pt-[36px] pb-[24px] rounded-[10px]   mx-auto  flex flex-col justify-center    min-w-[350px] max-w-[565px]">
                        <Section>
                            <Text className="text-black text-2xl font-bold leading-[24px]">
                                You’ve submitted! 💌
                            </Text>
                            <Text className="text-black text-[14px] leading-[24px]">
                                Thank you for submitting your email. <br />
                                We can’t wait to inform you for our launch! ⏳
                            </Text>
                        </Section>

                        <Section className="text-left  mb-[32px]">
                            <Text>
                                Enjoy the rest of your week,<br />
                                {organizationName} team.
                            </Text>
                        </Section>
                        <Section className="text-left mt-[32px] mb-[32px] px-4   border-gray-300 rounder-md rounded-md  border border-solid">
                            <Text className="text-[#7A7A7A]">
                                <span className="font-extrabold">   P.S. </span> We also love hearing from you and helping you with any issues you have. Please reply to this email if you want to ask a question or just say hi.
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


WelcomeWaitingListEmailTemplate.PreviewProps = {
    organizationName: "CodePilot",
} as WelcomeWaitingListEmailTemplateProps;

export default WelcomeWaitingListEmailTemplate;
