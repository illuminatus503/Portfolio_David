import nodemailer from "nodemailer";

const createTransport = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
};

const transport = createTransport();

export const mailService = {
  async sendContactNotification(submission) {
    if (!transport || !process.env.RECIPIENT_EMAIL) {
      console.log("[mail] contact", submission);
      return;
    }

    await transport.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Portfolio contact: ${submission.subject}`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Subject: ${submission.subject}`,
        "",
        submission.message
      ].join("\n")
    });
  }
};
