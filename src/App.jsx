// App.jsx
import React from "react";
import BrandIdentity from "./components/BrandIdentity";
import BookPromo from "./components/BookPromo";
import SubliminalAudioSlider from "./components/SubliminalAudioSlider";
import MeditationSlider from "./components/MeditationSlider";
import BlogArticlesSlider from "./components/BlogArticlesSlider";
import NoveltiesSlider from "./components/NoveltiesSlider";
import { data } from "./data";

const App = () => {
  const API_KEY = "AIzaSyBZl26h5BtDIwBRVg16crtbYE7MvMaayPM";
  const MEDITATION_PLAYLIST_ID = "PLYLd6kR0uMdMqh0aRC8E2cn_pwzbTkrjO";
  const SUBLIMINALS_PLAYLIST_ID = "PLYLd6kR0uMdONcS-wsEW5hX8rOINPTZUM";
  const WP_API_URL = "https://shamanicca.com/wp-json/wp/v2/posts?categories=82";

  return (
    <>
      <div className="max-w-screen-bio mx-auto mt-9 pb-1">
        {/* Brand Identity Section */}
        {data.brand && <BrandIdentity brand={data.brand} />}
      </div>
      <div className="w-full border-t border-gray-300 my-6" />
      <div className="max-w-screen-bio mx-auto p-4">
        {/* Meditation Slider Section */}
        <MeditationSlider
          playlistId={MEDITATION_PLAYLIST_ID}
          apiKey={API_KEY}
        />
      </div>
      <div className="w-full border-t border-gray-300 my-6" />
      <div className="max-w-screen-bio mx-auto p-4">
        {/* Meditation Slider Section */}
        <SubliminalAudioSlider
          playlistId={SUBLIMINALS_PLAYLIST_ID}
          apiKey={API_KEY}
        />
      </div>
      <div className="w-full border-t border-gray-300 my-6" />
      <div className="max-w-screen-bio mx-auto p-4">
        {/* Book Promo Section */}
        {data.books && data.books.length > 0 && (
          <BookPromo book={data.books[0]} />
        )}
      </div>
      <div className="w-full border-t border-gray-300 my-6" />
      <div className="max-w-screen-bio mx-auto p-4">
        {/* Blog Articles Slider Section */}
        <BlogArticlesSlider apiUrl={WP_API_URL} />
      </div>
      <div className="w-full border-t border-gray-300 my-6" />
      <div className="max-w-screen-bio mx-auto p-4">
        {/* Novelties Section */}
        {data.novelties && (
          <NoveltiesSlider novelties={data.novelties} brand={data.brand} />
        )}
      </div>
    </>
  );
};

export default App;
