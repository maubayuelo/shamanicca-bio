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

const MeditationSlider = ({ playlistId, apiKey }) => {
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
        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      }
    };

    fetchVideos();
  }, [playlistId, apiKey]);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">
          Change your reality with Our Sacred Codes Meditations
        </h2>

        <div className="flex space-x-2">
          <button
            className={`prev-btn-meditation transition ${
              isBeginning ? "text-gray-400 cursor-not-allowed" : "text-black"
            }`}
            disabled={isBeginning}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
          <button
            className={`next-btn-meditation transition ${
              isEnd ? "text-gray-400 cursor-not-allowed" : "text-black"
            }`}
            disabled={isEnd}
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>
        </div>
      </div>

      <div className="relative w-full mt-3 mb-9">
        <Swiper
          slidesPerView={1.2}
          spaceBetween={20}
          navigation={{
            nextEl: ".next-btn-meditation",
            prevEl: ".prev-btn-meditation",
          }}
          modules={[Navigation]}
          className="mySwiper"
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id} className="w-[75%] md:w-[75%]">
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
              <p className="mt-2 font-bold text-sm">{video.snippet.title}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <a
        className="btn bg-primary text-white py-4 px-6 rounded-full font-bold uppercase hover:bg-primary-600"
        href="https://youtube.com/playlist?list=PLYLd6kR0uMdMqh0aRC8E2cn_pwzbTkrjO&"
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
        What are Agesta's Sacred Codes?
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
          Agesta's Sacred Codes are numerical sequences used in meditation to
          connect with higher energies or divine beings for healing and
          manifesting intentions. Derived from ancient practices and
          rediscovered by modern channelers like José Gabriel Uribe (Agesta),
          these codes transmute frequencies and aid in various aspects of life,
          like health, relationships, abundance, etc. Practitioners should
          recite each code 45 times with faith and intention. The codes are
          adaptable to individual needs and can be used for others by setting
          the intention. They require preliminary cleansing meditation for
          optimal results and are said to work through the heart's energy.
        </p>
      </div>
    </>
  );
};

export default MeditationSlider;
