import sendMail from "./sendMail.js";

const sendEmailVerificationMail = async (email, token, username) => {
  const SERVER_BASE_URL = process.env.SERVER_BASE_URL;
  if (!SERVER_BASE_URL) {
    throw new Error("SERVER_BASE_URL not Defined");
  }

  const verificationURL = SERVER_BASE_URL + "/user/verify-email/" + token;
  const senderEmail = process.env.MAIL_USER;
  const emailSubject = "Verify your Email on PICT Archieve";
  const emailTemplate = "user_email_verification";
  const officialName = "PICT Archieve";
  const context = { verificationURL, username, officialName };

  const mailOptions = {
    from: senderEmail,
    to: email,
    subject: emailSubject,
    template: emailTemplate,
    context: context,
  };

  return await sendMail(mailOptions);
};

export default sendEmailVerificationMail;
