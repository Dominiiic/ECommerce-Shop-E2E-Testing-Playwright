import fs from 'fs';
import path from 'path';
import { generateHtmlReport } from './generateHTMLReport.js';
import { sendEmail } from './sendEmail.js';

const reportPath = path.resolve('playwright-report/index.json');

const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

const html = generateHtmlReport(reportData);

await sendEmail(html, reportPath);

console.log('📧 Report email sent successfully');