import nodemailer from "nodemailer";

const transpoter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASS
    }
});

export default transpoter;