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
// Change this:
fetch('http://localhost:3000/send', { ... })

// To this (Relative Path):
fetch('/send', { ... })
