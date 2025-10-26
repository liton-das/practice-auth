const mailTemplate=(user,otp)=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Template</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, Helvetica, sans-serif;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); margin-top:30px;">
    <tr>
      <td align="center" style="background-color:#007bff; padding:20px 0; border-top-left-radius:8px; border-top-right-radius:8px;">
        <h1 style="color:#ffffff; margin:0; font-size:24px;">🌤️ CloudSnap</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:30px;">
        <h2 style="color:#333333; margin-bottom:15px;">Hello, <span style="color:#007bff;">${user}</span> 👋</h2>
        <p style="color:#555555; line-height:1.6;">
          Welcome to <strong>CloudSnap</strong>! We’re excited to have you on board.  
          Click the button below to verify your email and activate your account.
        </p>
        <div style="text-align:center; margin:25px 0;">
          <a href="/verify" style="background-color:#007bff; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; display:inline-block; font-weight:bold;">
            ${otp}
          </a>
        </div>
        <p style="color:#777777; font-size:14px;">
          If you didn’t create this account, please ignore this email.
        </p>
        <p style="color:#777777; font-size:14px; margin-top:25px;">
          Best regards, <br />
          <strong>The CloudSnap Team</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td align="center" style="background-color:#f0f0f0; padding:15px; font-size:13px; color:#999999; border-bottom-left-radius:8px; border-bottom-right-radius:8px;">
        © 2025 CloudSnap. All rights reserved.  
        <br /> 
        <a href="#" style="color:#007bff; text-decoration:none;">Visit Website</a> • 
        <a href="#" style="color:#007bff; text-decoration:none;">Contact Support</a>
      </td>
    </tr>
  </table>
</body>
</html>
`
}
module.exports = mailTemplate