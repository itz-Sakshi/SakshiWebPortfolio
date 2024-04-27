const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD 
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
});


// POST route to handle form submissions
app.post('/send-email', (req, res) => {
    const { fullName, emailAddress, mobileNumber, emailSubject, message } = req.body;

    // Compose email
    const mailOptions = {
        from: emailAddress,
        to: process.env.EMAIL, 
        subject: emailSubject,
        text: `Name: ${fullName}\nEmail: ${emailAddress}\nMobile Number: ${mobileNumber}\n\nMessage:\n${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
