require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to read the form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // This serves your HTML/CSS

app.post('/send-contact', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
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
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send("Error!");
        res.send("Message Sent Successfully!");
    });
});
// This tells the server: "Use the port the host gives me, or 3000 if I'm at home."
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
