//yarn add nodemailer
//yarn add @types/nodemailer --dev
import nodemailer from "nodemailer";

//const nodemailerClinet

const sendEmail = (subject: string, html: string) => {
  const emailData = 0;
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://nuver.com/verification/${key}/">`;

  return sendEmail(emailSubject, emailBody);
};
