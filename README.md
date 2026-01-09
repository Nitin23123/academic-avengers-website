# Academic Avengers - Premium Educational Assistance Platform

**Academic Avengers** is a high-end web platform designed to connect students with expert academic assistance. The website features a "Premium Dark" aesthetic, cinematic animations, and a fully interactive user experience powered by modern web technologies.

[![Live Site](https://img.shields.io/badge/Live-Site-orange?style=for-the-badge&logo=render)](https://academicavenger.onrender.com/)
![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

## 🌐 Live Demo
You can view the live website here: [https://academicavenger.onrender.com/](https://academicavenger.onrender.com/)

## 🚀 Overview

This project is a full-stack web application (Frontend + Node.js Backend) that serves as the digital storefront for Academic Avengers. It showcases services like Assignment Support, Dissertation Guidance, and Resume Building with a focus on visual impact and user engagement.

## ✨ Key Features

*   **Cinematic UI/UX**:
    *   **GSAP Animations**: Complex staggered entrance animations, scroll-triggered reveals, and 3D card tilts.
    *   **Hero Particle Network**: An interactive HTML5 Canvas background that reacts to mouse movement.
    *   **Liquid Cursor**: A custom "difference-mode" cursor that ensures visibility on all backgrounds.
    *   **Smooth Parallax**: Elements move at different speeds for a depth effect.
*   **Comprehensive Services**:
    *   Dedicated sections for Assignments, Dissertations, Content Writing, and more.
    *   Interactive Service Cards with hover lift effects.
*   **Functional Backend**:
    *   **Node.js & Express**: Serves the application and handles API requests.
    *   **Contact Form**: A working endpoint (`/api/contact`) that accepts submissions (currently logs to console, ready for DB/Email integration).
*   **Responsive Design**:
    *   Fully optimized for Desktop, Tablet, and Mobile devices.
    *   Modern CSS Grid and Flexbox layouts.

## 🛠️ Technology Stack

*   **Frontend**:
    *   **HTML5**: Semantic structure.
    *   **CSS3**: Custom variables, Grid/Flexbox, `mix-blend-mode`, Glassmorphism.
    *   **JavaScript (ES6+)**: Logic for animations, DOM manipulation, and API calls.
    *   **GSAP (GreenSock)**: The core engine for all advanced animations (`ScrollTrigger`, `Timeline`, `Tween`).
*   **Backend**:
    *   **Node.js**: Runtime environment.
    *   **Express.js**: Web server framework.
    *   **Body-Parser**: Middleware for handling JSON requests.

## 📂 Project Structure

```bash
academic-avenger-website/
├── css/
│   ├── style.css           # Global styles (Variables, Typography, Footer, Hero)
│   ├── aboutus.css         # Styles specific to About Us page
│   ├── contactus.css       # Styles specific to Contact Us page
│   └── service.css         # Styles specific to Services page
├── js/
│   └── script.js           # Main logic: GSAP animations, Preloader, Form handling
├── images/                 # Assets (Logos, Icons, etc.)
├── index.html              # Landing Page (Home)
├── aboutus.html            # Company Information
├── service.html            # Services Listing
├── contactus.html          # Interactive Contact Page
├── server.js               # Node.js Server Entry Point
└── package.json            # Project Metadata & Dependencies
```

## 💻 Installation & Usage

### Prerequisites
*   [Node.js](https://nodejs.org/) (Version 14+ recommended)
*   npm (Node Package Manager)

### Step 1: Clone or Download
If you haven't already, download the project files to your local machine.

### Step 2: Install Dependencies
Open your terminal in the project directory and run:

```bash
npm install
```
This will install `express`, `cors`, and other necessary packages defined in `package.json`.

### Step 3: Run the Server
Start the application locally:

```bash
npm start
```
You should see:
```
🚀 Server running at http://localhost:3000
📄 Serving files from: ...
```

### Step 4: Access the Website
Open your browser and navigate to:
**http://localhost:3000**

## 🔌 API Reference

### Contact Form Submission
*   **Endpoint**: `/api/contact`
*   **Method**: `POST`
*   **Content-Type**: `application/json`
*   **Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "message": "I need help with my assignment."
    }
    ```
*   **Response**: Returns a JSON success message.

## 📝 Deployment

### Option 1: Node.js Hosting (Recommended)
This project is configured for platforms like **Render**, **Heroku**, or **Railway**.
1.  Push code to GitHub.
2.  Connect your repository to the hosting provider.
3.  The provider will detect `npm start` and run the server automatically.
4.  **Note**: Ensure the environment variable `PORT` is respected (handled in `server.js`).

### Option 2: Static Hosting
If you only need the frontend (no working contact form):
1.  Upload `index.html`, `css/`, `js/`, and `images/` to Netlify or Vercel.
2.  **Warning**: The `/api/contact` endpoint will fail as there is no backend server running.

## 📄 License
This project is proprietary to **Academic Avengers**. All rights reserved.

---
*Built with ❤️ by the Academic Avengers Tech Team.*
