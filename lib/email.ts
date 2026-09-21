import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type { InquiryData } from './crm';

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.error('[email] SMTP not configured (SMTP_HOST/SMTP_USER/SMTP_PASS)');
    return null;
  }

  const port = parseInt(process.env.SMTP_PORT || '465', 10);

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

export interface EmailResult {
  sent: boolean;
  messageId?: string;
}

export async function sendInquiryEmail(data: InquiryData): Promise<EmailResult> {
  const tr = getTransporter();
  if (!tr) return { sent: false };

  const fromUser = process.env.SMTP_USER as string;
  const to = process.env.INQUIRY_RECIPIENT || fromUser;

  const body = [
    `Name: ${data.contactName}`,
    `Email: ${data.email}`,
    `Company: ${data.companyName || '-'}`,
    `Phone: ${data.phone || '-'}`,
    `Country: ${data.country || '-'}`,
    `Product: ${data.product || '-'}`,
    `Quantity: ${data.quantity || '-'}`,
    '',
    'Message:',
    data.message || '-',
  ].join('\n');

  const info = await tr.sendMail({
    from: `${fromUser}`,
    to,
    replyTo: data.email,
    subject: `[AnkhPeptide] New inquiry from ${data.contactName}`,
    text: body,
  });

  console.log(`[email] sent messageId=${info.messageId} to=${to}`);
  return { sent: true, messageId: info.messageId };
}