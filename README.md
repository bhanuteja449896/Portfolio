# Bhanu Teja Makkineni - Full Stack Developer Portfolio

Welcome to the source code for my personal portfolio website, available at [https://bhanuteja-portfolio.web.app](https://bhanuteja-portfolio.web.app).

## Technologies Used
This project is built with a modern web stack:
- **Vite** (Build tool)
- **React** (UI Library)
- **TypeScript** (Language)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Firebase** (Hosting)

## Running Locally

To run this project locally on your machine, you'll need Node.js installed. 

1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd Portfolio
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. Open `http://localhost:8080` (or the port specified in your terminal) to view it in the browser.

## Deployment

To deploy this site to Firebase Hosting:

1. Create a production build:
   ```sh
   npm run build
   ```
2. Deploy to Firebase:
   ```sh
   npx firebase deploy --only hosting
   ```
