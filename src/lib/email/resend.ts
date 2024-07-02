import platformConfig from '@/config/app-config';
import { Resend } from 'resend';


if (!platformConfig.variables.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set in .env.local")
}

const resend: Resend | null = platformConfig.variables.RESEND_API_KEY ? new Resend(platformConfig.variables.RESEND_API_KEY) : null;


export default resend;