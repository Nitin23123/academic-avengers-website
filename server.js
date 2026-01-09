const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Static Files
// This ensures all CSS, JS, and HTML files are accessible
app.use(express.static(path.join(__dirname)));

// API Endpoint for Contact Form
app.post('/api/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Log the data (in a real app, this would send an email or save to DB)
    console.log('--------------------------------');
    console.log('📩 New Contact Form Submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Message: ${message}`);
    console.log('--------------------------------');

    // Simulate success response
    res.json({ success: true, message: 'Message received successfully!' });
});

// Default Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📄 Serving files from: ${__dirname}`);
});
