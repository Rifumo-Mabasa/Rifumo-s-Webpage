require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.post('/send', (req, res) => {
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
        text: `From: ${name} (${email})\n\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error!");
        }
        res.status(200).send("Message Sent Successfully!");
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});