import nodemailer from 'nodemailer';
import { google } from 'googleapis';



export const sendEmails = async (req, res, next) => {

    const OAuth2 = google.auth.OAuth2;
    console.log("oauth2" , OAuth2);
    const oauth2Client = new OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET,
        process.env.GMAIL_REDIRECT_URI
    );
    console.log("oauth2 client", oauth2Client);
    oauth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse.token;
    console.log("access token", accessToken);
    try {

        console.log("req.body", req.body);
        const { fullName, email, phone, message } = req.body;

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "oauth2",
                user: process.env.FROM_EMAIL,
                clientId: process.env.GMAIL_CLIENT_ID,
                clientSecret: process.env.GMAIL_CLIENT_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        // Email options
        const ownerMailOptions = {
            from: process.env.FROM_EMAIL,
            to: process.env.TO_EMAIL,
            subject: "Contact Form Submission on Emey's Store",
            text: `
                   NAME: ${fullName}
                   EMAIL: ${email}
                   MESSAGE: ${message}
                   CONTACT: ${phone}
                   `
        };
        const userMailOptions = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: "Contact Form Submitted on Emey's Store",
            text: `Dear ${fullName}! We've got your query . We'll get back to you soon. Thanks for reaching out!`
        };

        // Send email asynchronously
        const ownerInfo = await transporter.sendMail(ownerMailOptions);
        console.log("Email sent successfully to owner:", ownerInfo.response);
        res.json({ message: "Form Submitted Successfully!" });

        // send email to user
        const userInfo = await transporter.sendMail(userMailOptions);
        console.log("Email sent successfully to user:", userInfo.response);
    } catch (err) {
        console.error("Error sending email:", err);
        next(err); // Pass the error to the error-handling middleware
    }
}