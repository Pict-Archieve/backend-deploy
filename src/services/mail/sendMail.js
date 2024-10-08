import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

//new code
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Setup Node Mailer
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
  host: "smtp.gmail.com",
  port: 465,
});

// Config Handlebars options
const handlebarOptions = (hbs.NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.join(__dirname, "./views"),
    defaultLayout: false,
  },
  viewPath: path.join(__dirname, "./views"),
});

// Attach Handlebars with nodemailer
transporter.use("compile", hbs(handlebarOptions));

export default transporter.sendMail.bind(transporter);
