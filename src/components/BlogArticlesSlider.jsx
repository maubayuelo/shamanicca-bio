import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/navigation";

const BlogArticlesSlider = ({ apiUrl }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            _embed: "wp:featuredmedia", // Embed media details in the API response
          },
        });

        const articlesData = response.data;
        console.log(articlesData);

        // Function to get fallback image URL
        const getFallbackImageUrl = async () => {
          try {
            const fallbackResponse = await axios.get(
              "https://shamanicca.com/cms/wp-json/wp/v2/257"
            );
            return fallbackResponse.data.source_url || "/default-image.jpg";
          } catch (error) {
            console.error("Error fetching fallback image:", error);
            return "/default-image.jpg";
          }
        };

        // Get the fallback image URL
        const fallbackImageUrl = await getFallbackImageUrl();

        // Process articles
        const articlesWithImages = articlesData.map((article) => {
          const media = article._embedded?.["wp:featuredmedia"]?.[0];

          return {
            ...article,
            featured_image_url:
              media?.media_details?.sizes?.medium?.source_url ||
              media?.source_url || // Fallback to full-size image
              (article.featured_media === 257
                ? fallbackImageUrl
                : "/default-image.jpg"), // Handle ID 257 case
          };
        });

        setArticles(articlesWithImages);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error fetching articles:",
          err.response ? err.response.data : err.message
        );
        setError("Failed to load articles. Please try again.");
        setLoading(false);
      }
    };

    fetchArticles();
  }, [apiUrl]);

  if (loading) return <p className="text-center mt-4">Loading articles...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Blog Top Articles</h2>

        <div className="flex space-x-2">
          <button
            className={`prev-btn-blog transition ${
              isBeginning ? "text-gray-400 cursor-not-allowed" : "text-black"
            }`}
            disabled={isBeginning}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
          <button
            className={`next-btn-blog transition ${
              isEnd ? "text-gray-400 cursor-not-allowed" : "text-black"
            }`}
            disabled={isEnd}
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>
        </div>
      </div>

      <div className="relative w-full mt-4">
        <Swiper
          slidesPerView={1.2} // 75% visible slide + 25% next slide
          spaceBetween={20}
          navigation={{
            nextEl: ".next-btn-blog",
            prevEl: ".prev-btn-blog",
          }}
          modules={[Navigation]}
          className="mySwiper"
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {articles.map((article, index) => (
            <SwiperSlide key={index} className="w-[75%] md:w-[75%]">
              <img
                src={article.featured_image_url}
                alt={article.title.rendered}
                className="rounded-xl w-full"
              />
              <h3 className="mt-2 text-lg font-semibold">
                {article.title.rendered}
              </h3>
              <a
                href={`https://shamanicca.com/post/${article.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary mt-2 inline-block"
              >
                Read More →
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default BlogArticlesSlider;
