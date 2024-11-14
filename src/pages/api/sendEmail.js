// src/pages/api/sendEmail.js

import SibApiV3Sdk from 'sib-api-v3-sdk';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Set up Brevo API key
    const apiKey = process.env.BREVO_API_KEY;
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apiKey;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
      email: 'prmdbirla65@gmail.com', // Your email address
    };

    const receivers = [
      { email: 'prmdbirla65@gmail.com' }, // The email where you want to receive messages
    ];

    const emailData = {
      sender,
      to: receivers,
      subject: `New Message from ${name}`,
      htmlContent: `<html><body>
        <h3>New message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </body></html>`,
    };

    try {
      await tranEmailApi.sendTransacEmail(emailData);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
