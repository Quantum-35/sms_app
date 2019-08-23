import SendgridClient from '@sendgrid/mail';
import dotenv from 'dotenv';


dotenv.config();
const { env: { SENDER_EMAIL, SENDGRID_API_KEY, BASE_URL } } = process;


class EmailService {
    static async sendValidationEmail(client) {
        const { firstName, lastName, email, username, token } = client;
        const url = `${BASE_URL}api/auth/verify-account?token=${token}`;
        const message = {
            to: email,
            from: SENDER_EMAIL,
            subject: 'Welcome',
            templateId: 'd-1387e1a284134f88b64ecae511c170fa',
            dynamicTemplateData: {
                userFirstName: firstName,
                userLastName: lastName,
                uUsername: username,
                validateUrl: url
            },
        };
        SendgridClient.setApiKey(SENDGRID_API_KEY);
        SendgridClient.setSubstitutionWrappers('{{', '}}'),
        await SendgridClient.send(message);
    }
}

export default EmailService;