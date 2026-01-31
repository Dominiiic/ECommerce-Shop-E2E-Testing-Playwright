import { transporter } from './mailer.js';

export async function sendEmail(
  html,
  attachmentPath
) {
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: process.env.RECIPIENTS,
    subject: 'Playwright Automation Report',
    html,
    // attachments: [
    //   {
    //     filename: 'playwright-report.zip',
    //     path: attachmentPath,
    //   },
    // ],
  });
}