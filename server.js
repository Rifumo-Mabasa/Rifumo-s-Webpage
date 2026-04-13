require('dotenv').config();
import express, { json, urlencoded, static } from 'express';
import { createTransport } from 'nodemailer';
const app = express();

// Middleware
app.use(json()); // <--- CRITICAL: This lets the server read your fetch data
app.use(urlencoded({ extended: true }));
app.use(static('public')); 

// Changed route to '/send' to match your script.js fetch call
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Message from ${name}`,
        text: `From: ${name} (${email})\n\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error); // This helps you see the error in Render logs
            return res.status(500).send("Error!");
        }
        res.status(200).send("Message Sent Successfully!");
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});