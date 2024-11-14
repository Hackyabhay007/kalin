// src/utils/sendEmail.js
const API_KEY = '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';

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
  