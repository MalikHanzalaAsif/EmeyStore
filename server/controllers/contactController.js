import nodemailer from 'nodemailer';


export const sendEmails = async (req, res, next) => {
    try {
        console.log(req.body);
        const { fullName, email, phone, message } = req.body;

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.FROM_EMAIL_PASS,
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