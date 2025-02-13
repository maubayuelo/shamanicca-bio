import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/navigation";

const SubliminalAudioSlider = ({ playlistId, apiKey }) => {
  const [videos, setVideos] = useState([]);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems`,
          {
            params: {
              part: "snippet",
              maxResults: 10,
              playlistId: playlistId,
              key: apiKey,
            },
          }
        );
        setVideos(response.data.items || []);
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      }
    };

    fetchVideos();
  }, [playlistId, apiKey]);

  useEffect(() => {
    // Ensure Swiper navigation buttons are initialized properly
    const checkButtons = () => {
      setIsBeginning(true);
      setIsEnd(videos.length <= 1);
    };

    if (videos.length) {
      checkButtons();
    }
  }, [videos]);

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">
          Unlock Your Powers With Our Subliminals Audios
        </h2>

        <div className="flex space-x-2">
          <button
            className={`prev-btn-subliminal transition ${
              isBeginning ? "text-gray-400 cursor-not-allowed" : "text-black"
            }`}
            disabled={isBeginning}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
          <button
            className={`next-btn-subliminal transition ${
              isEnd ? "text-gray-400 cursor-not-allowed" : "text-black"
            }`}
            disabled={isEnd}
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>
        </div>
      </div>

      <div className="relative w-full mb-6">
        {videos.length > 0 ? (
          <Swiper
            slidesPerView={1.2}
            spaceBetween={20}
            navigation={{
              nextEl: ".next-btn-subliminal",
              prevEl: ".prev-btn-subliminal",
            }}
            modules={[Navigation]}
            className="mySwiper"
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {videos.map((video) => (
              <SwiperSlide
                key={video.snippet.resourceId.videoId}
                className="w-[75%] md:w-[75%]"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="rounded-xl w-full"
                  />
                </a>
                <p className="mt-2 font-bold text-md">{video.snippet.title}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">No videos available.</p>
        )}
      </div>

      <a
        className="btn bg-primary text-white py-4 px-6 rounded-full font-bold uppercase hover:bg-primary-600"
        href="https://youtube.com/playlist?list=PLYLd6kR0uMdONcS-wsEW5hX8rOINPTZUM&"
        target="_blank"
        rel="noopener noreferrer"
      >
        Subscribe on YouTube
      </a>

      {/* Expand Collapse Section */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }}
        className="text-primary hover:underline cursor-pointer font-medium mt-6 block"
      >
        What Are Subliminal Audios?
        <FontAwesomeIcon
          icon={isExpanded ? faChevronUp : faChevronDown}
          size="lg"
          className="ml-2"
        />
      </a>

      <div
        className={`mt-3 overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="">
          Subliminal positive affirmation audios are recordings that embed
          encouraging and constructive statements beneath ambient sounds. These
          affirmations are designed to bypass conscious awareness and influence
          the subconscious mind, promoting positive changes in mindset,
          behavior, and overall well-being. Listeners often use them to
          reinforce self-belief, reduce stress, or cultivate healthier habits
          over time.
        </p>
      </div>
    </>
  );
};

export default SubliminalAudioSlider;
