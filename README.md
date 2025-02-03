# Shamanicca Bio Page

## Overview
Shamanicca Bio Page is a ReactJS (Vite) project that serves as a dedicated page to showcase brand identity, products, meditations, and blog content. The page is designed to integrate with various APIs and dynamically fetch content.

## Features
- **Brand Identity Display**: Showcases the Shamanicca brand with logo and social media links.
- **Meditation & Subliminal Audio Sliders**: Fetches and displays YouTube playlists for guided meditations.
- **Book Promotion**: Highlights and reviews the book "Digital Shamanic Activism."
- **Blog Articles Integration**: Fetches and displays top articles from the Shamanicca WordPress site.
- **Responsive Design**: Fully optimized for mobile and desktop views.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_USERNAME/shamanicca-bio-page.git
   cd shamanicca-bio-page
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The app should be accessible at `http://localhost:5173/bio/`.

## Deployment
For deployment, the project needs to run at `https://shamanicca.com/bio/`. Ensure the `vite.config.js` file is configured with:
   ```js
   export default defineConfig({
     base: "/bio/",
     plugins: [react()],
   });
   ```
Run the build command:
   ```sh
   npm run build
   ```
Upload the contents of the `dist/` folder to your hosting service.

## Tech Stack
- **ReactJS (Vite)** - Frontend framework
- **Swiper.js** - Sliders for showcasing content
- **Axios** - API requests
- **FontAwesome** - Social media icons
- **Tailwind CSS** - Styling framework
- **GitHub Actions** - CI/CD integration
- **Netlify/Vercel** - Deployment platforms

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```sh
   git commit -m "Added new feature"
   ```
4. Push to the branch:
   ```sh
   git push origin feature-name
   ```
5. Open a Pull Request.

## License
This project is licensed under the MIT License.

