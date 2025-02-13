import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

const BookPromo = ({ book }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    // Ensure Swiper instance updates state
    const swiperInstance = document.querySelector(".mySwiper")?.swiper;
    if (swiperInstance) {
      swiperInstance.on("slideChange", () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      });
    }
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold">
        Digital Shamanic Activism, Recommended Read
      </h2>

      {/* Book Cover and Summary */}
      <div className="flex overflow-x-scroll space-x-4 mt-4 mb-9">
        <div className="min-w-[270px]">
          <img
            src={book.cover}
            alt={book.title}
            className="max-w-screen-bio mx-auto rounded-xl w-full"
          />
        </div>
        <div className="min-w-[90%]">
          <p>{book.summary}</p>
        </div>
      </div>
      <a
        className="btn bg-primary text-white py-4 px-6 rounded-full font-bold uppercase hover:bg-primary-600"
        href="https://a.co/d/cmd3pke"
        target="_blank"
        rel="noopener noreferrer"
      >
        Buy Book on Amazon
      </a>

      {/* Navigation Buttons ABOVE Swiper */}
      <div className="flex items-center justify-between mt-9 mb-2">
        <h2 className="text-xl font-bold">Amazon's Readers Reviews</h2>

        <div className="flex space-x-2">
          <button
            className={`prev-btn-rev transition ${
              isBeginning ? "text-gray-400 cursor-default" : "text-black"
            }`}
            disabled={isBeginning}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
          <button
            className={`next-btn-rev transition ${
              isEnd ? "text-gray-400 cursor-default" : "text-black"
            }`}
            disabled={isEnd}
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>
        </div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        slidesPerView={1.2} // 75% visible slide + 25% next slide
        spaceBetween={21}
        navigation={{
          nextEl: ".next-btn-rev",
          prevEl: ".prev-btn-rev",
        }}
        modules={[Navigation]}
        className="mySwiper"
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {book.reviews.map((review, index) => (
          <SwiperSlide
            key={index}
            className="w-[81%] md:w-[81%] bg-gray-100 p-5 rounded-xl"
          >
            <h4 className="font-bold">{review.title}</h4>
            {/* Reviews Texts */}
            <p className="mt-1 max-h-[180px] overflow-y-auto pr-1 text-md">
              {review.comment}
            </p>
            <p className="mt-5 italic text-sm">{review.reviewer}</p>
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={
                    i < review.rating
                      ? "text-yellow-500 text-sm"
                      : "text-gray-500 text-sm"
                  }
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <a
        className="btn bg-primary text-white mt-9 py-4 px-6 rounded-full font-bold uppercase hover:bg-primary-600"
        href="https://a.co/d/cmd3pke"
        target="_blank"
        rel="noopener noreferrer"
      >
        Buy Book on Amazon
      </a>
    </>
  );
};

export default BookPromo;
