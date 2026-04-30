import 'dotenv/config'; 
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

// --- MIDDLEWARE ---
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

// --- THE ROUTE ---
app.post('/send-contact', async (req, res) => {
    // 1. Destructure data from the request body
    const { name, email, message } = req.body;

    // 2. Logging for debugging (The "Real Error" check)
    console.log("Attempting to send mail from:", email);

    // 3. Create the transporter (Configured for Gmail)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS  
        },
        tls: {
            rejectUnauthorized: false 
        }
    });

    // 4. Define the email options
    const mailOptions = {
        from: process.env.EMAIL_USER, // Gmail often forces the "from" to be your own address
        replyTo: email,               // This lets you hit "Reply" to email the user directly
        to: process.env.EMAIL_USER,
        subject: `Portfolio Message from ${name}`,
        text: `From: ${name} <${email}>\n\nMessage:\n${message}`
    };

    // 5. Execution using Try/Catch
    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");
        res.status(200).send("Message Sent Successfully!");
    } catch (error) {
        console.error("❌ THE REAL ERROR IS:", error);
        res.status(500).send("Error sending message.");
    }
});

// --- SERVER START ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});