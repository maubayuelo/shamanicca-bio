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
        });

        const articlesData = response.data;

        // Fetch featured images separately
        const articlesWithImages = await Promise.all(
          articlesData.map(async (article) => {
            if (article.featured_media) {
              try {
                const mediaResponse = await axios.get(
                  `http://shamanicca.local/wp-json/wp/v2/media/${article.featured_media}`
                );
                return {
                  ...article,
                  featured_image_url: mediaResponse.data.source_url,
                };
              } catch (mediaError) {
                console.error("Error fetching featured image:", mediaError);
                return { ...article, featured_image_url: "/default-image.jpg" };
              }
            }
            return { ...article, featured_image_url: "/default-image.jpg" };
          })
        );

        setArticles(articlesWithImages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching articles:", err);
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
                href={article.link}
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
