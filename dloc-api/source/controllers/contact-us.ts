import { configDotenv } from 'dotenv';
import { contactUs } from '../services/contact-us/contact-us';
import express, { Request, Response } from 'express';
import { printMessage } from '../functions/printMessage';
configDotenv();

const CONTACT_US_MAIL_TO = process.env.CONTACT_US_MAIL_TO ?? '';

const routers = express.Router();

routers.post('/contact-us', async (req: Request, res: Response, next) => {
  const { email, name, message } = req.body;

  if (!email || !name || !message) return res.status(400).json({ message: 'Bad request' });

  if (!CONTACT_US_MAIL_TO) {
    printMessage('The contact email is not defined');
    return res.status(500).json({ message: 'Internal server error' });
  }

  await contactUs(CONTACT_US_MAIL_TO, `Contact from [${name}] (${email})`, `[${name}] (${email}) send the message: \n\n${message}`);
  return res.status(200).json({ send: true });
});

export default routers;
