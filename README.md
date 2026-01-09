# Academic Avengers Website

This is the official codebase for the Academic Avengers website, built with HTML, CSS, JS, and Node.js.

## Project Structure
- **`index.html`**: The main landing page.
- **`aboutus.html`**: Company information.
- **`service.html`**: Services overview.
- **`contactus.html`**: Interactive contact form.
- **`css/`**: All stylesheets (Global `style.css` + page specifics).
- **`js/`**: Global scripts and GSAP animations.
- **`server.js`**: Node.js Entry point for serving the site and API.

## How to Run

### 1. Install Dependencies
Run this command in your terminal to install necessary packages:
```bash
npm install
```

### 2. Start the Server
Run this command to start the application:
```bash
npm start
```
The the website will be live at: `http://localhost:3000`

## Deployment
This project is deployment-ready for standard Node.js environments (e.g., Render, Heroku) or static sites (Netlify/Vercel) if you ignore `server.js`.

### For Node.js Hosting (Recommended):
- Ensure `package.json` has `"start": "node server.js"` (Already Configured).
- The `PORT` will automatically default to `process.env.PORT` or `3000`.

### For Static Hosting (Netlify/GitHub Pages):
- Upload the contents of this folder.
- `index.html` will be the entry point.
- *Note: Contact Form API features will not work on static hosting.*
