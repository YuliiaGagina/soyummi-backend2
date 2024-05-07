const nodemailer = require("nodemailer");

class MailServise {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link, name) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Aктивация аккаунта" + process.env.SITE_URL,
      text: "",
      html: `
      <div>
          <p>Привет, ${name}!</p>
          <h1>Для активации своего аккаунда, перейдите по ссылке</h1>
          <a href=${link}>${link}</a>
        </div>
        `,
    });
  }
}

module.exports = new MailServise();
