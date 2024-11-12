import { otps } from '@/utils/otpStorage'; // If you are storing `otps` in a separate file

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const storedOtp = otps.get(email);

  if (storedOtp === otp) {
    otps.delete(email); // Remove OTP after successful verification
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(401).json({ error: 'Invalid OTP' });
  }
}
