const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
   },
});

const htmlContent = (confirmationToken) => `
  <!DOCTYPE html
   PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html xmlns="http://www.w3.org/1999/xhtml">

   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to Barbell Log</title>
      <style type="text/css">
         /* Client-specific styles */
         body {
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            margin: 0;
            padding: 0;
            line-height: 100%;
            background-color: #f6f6f6;
            /* Fallback for clients that don't support body style */
         }

         /* Basic reset */
         table {
            border-spacing: 0;
            border-collapse: collapse;
         }

         td {
            padding: 0;
         }

         img {
            border: 0;
            -ms-interpolation-mode: bicubic;
         }
      </style>
   </head>

   <body style="width:100%;margin:0;padding:0;background-color:#f6f6f6;">
      <center>
         <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
            <tr>
               <td align="center" style="padding: 20px 0;">
                  <table border="0" cellpadding="0" cellspacing="0" width="600"
                     style="border-collapse: collapse; background-color: #121212;">
                     <tr>
                        <td align="center"
                           style="padding: 40px 0 30px 0; font-family: Arial, sans-serif; font-size: 24px;">
                           <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 640 640"
                              style="fill: #3ace87;"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                              <path
                                 d="M96 176C96 149.5 117.5 128 144 128C170.5 128 192 149.5 192 176L192 288L448 288L448 176C448 149.5 469.5 128 496 128C522.5 128 544 149.5 544 176L544 192L560 192C586.5 192 608 213.5 608 240L608 288C625.7 288 640 302.3 640 320C640 337.7 625.7 352 608 352L608 400C608 426.5 586.5 448 560 448L544 448L544 464C544 490.5 522.5 512 496 512C469.5 512 448 490.5 448 464L448 352L192 352L192 464C192 490.5 170.5 512 144 512C117.5 512 96 490.5 96 464L96 448L80 448C53.5 448 32 426.5 32 400L32 352C14.3 352 0 337.7 0 320C0 302.3 14.3 288 32 288L32 240C32 213.5 53.5 192 80 192L96 192L96 176z" />
                           </svg>
                        </td>
                     </tr>
                     <tr>
                        <td
                           style="padding: 20px 30px; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                           <h1 style="text-align: center; font-size: 32px; color: #3ace87;">Barbell Log</h1>
                           <p style="color: #898989;">You are receiving this message because you signed up for Barbell Log,
                              a simple straight forward approach to workout tracking.</p>
                           <p style="color: #898989;">Click the link below to verify your account and start logging today!
                           </p>
                           <table border="0" cellspacing="0" cellpadding="0" style="margin-top: 20px; display: flex; justify-content: center;">
                              <tr>
                                 <td align="center" style="border-radius: 5px; text-align: center;" bgcolor="#007bff">
                                    <a href="https://barbell-log.com/verify/${confirmationToken}" target="_blank"
                                       style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #121212; text-decoration: none; border-radius: 5px; padding: 12px 24px; background-color: #3ace87; display: inline-block;">
                                       Verify
                                    </a>
                                 </td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <td align="center"
                           style="padding: 30px 0 40px 0; font-family: Arial, sans-serif; font-size: 12px; color: #999999;">
                           <p>&copy; Barbell Log. All Rights Reserved.</p>
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
         </table>
      </center>
   </body>

</html>
`;

module.exports = { transporter, htmlContent };
