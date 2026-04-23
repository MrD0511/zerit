
import path from "path";
import fs from "fs/promises";
import nodemailer from "nodemailer"

const brevo_smtp_key = process.env.BREVO_SMTP_KEY;

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "a90f41001@smtp-brevo.com", // Found in SMTP settings
        pass: brevo_smtp_key,               // NOT your account password
    },
});

async function getEmailTemplate(token) {
  const filePath = path.join(process.cwd(), "src/templates", "token-mail.html");

  let html = await fs.readFile(filePath, "utf-8");

  html = html.replace('{{TOKEN}}', token);

  return html;
}

async function sendEmail(userEmail, token) {
  try {
    const emailTemplate = await getEmailTemplate(token);

    const response = await transporter.sendMail({
      from: 'Zerit <sharmadhruv00005@gmail.com>',
      to: userEmail,
      subject: `Your print token is ready.`,
      html: emailTemplate,
    });

    if(response.error){
        console.error("Error sending email: ",response.error)
    }

    console.log(`Email sent to ${userEmail}`);
  } catch (error) {
    console.error(error);
  }
}

export { sendEmail };