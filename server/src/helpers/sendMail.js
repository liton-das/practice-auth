const nodemailer = require("nodemailer");
// configure 
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "priyankadas88439@gmail.com",
    pass: "wojk visb ugtm xdor",
  },
});

// sendMail
const sendMail = async(mailTo,sub)=>{
    const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" priyankadas88439@gmail.com',
    to: mailTo,
    subject: sub,
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });
}
module.exports = sendMail