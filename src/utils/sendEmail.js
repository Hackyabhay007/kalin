// src/utils/sendEmail.js
const API_KEY = process.env.SENDINBLUE_API_KEY;

export const sendEmail = async (emailData) => {
    try {
      const response = await fetch('https://api.sendinblue.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': API_KEY,
        },
        body: JSON.stringify({
          sender: { name: emailData.name, email: emailData.email },
          to: [{ email: 'prmdbirla65@gmail.com', name: 'pb' }],
          subject: 'Contact Us Form Submission',
          htmlContent: `
            <h3>Contact Us Form Details</h3>
            <p><strong>Name:</strong> ${emailData.name}</p>
            <p><strong>Email:</strong> ${emailData.email}</p>
            <p><strong>Phone:</strong> ${emailData.phone}</p>
            <p><strong>Message:</strong> ${emailData.message}</p>
          `,
        }),
      });
  
      const result = await response.json();
      console.log('Sendinblue Response:', result);  // Log the result for debugging
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send email');
      }
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };
  