import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  },
});

interface EmailParams {
  to: string[];
  subject: string;
  body: string;
  from: string;
}

export async function sendEmail({
  to,
  subject,
  body,
  from,
}: EmailParams): Promise<void> {
  const params = {
    Destination: {
      ToAddresses: to,
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: from,
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}
