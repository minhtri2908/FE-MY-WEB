import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { Pagination, Autoplay } from "swiper/modules";
import "./App.css";
const aboutData = {
  avatar: "https://same-assets.com/placeholder-avatar.png",
  name: "Phạm Minh Trí",
  title: "Fullstack Developer & Photographer",
  bio: "Chào bạn! Tôi là Trí, đam mê phát triển web ứng dụng và chia sẻ niềm vui với mọi người bằng hình ảnh",
};

const data = [
  { label: "ABOUT", href: "/about", img: "/image/IMG_9265-2.jpg" },
  { label: "STORY", href: "/story", img: "/image/IMG_7172-3.jpg" },
  { label: "HOBBY", href: "/hobby", img: "/image/TAI_0870.jpg" },
  { label: "WORK", href: "/work", img: "/image/IMG_9274.JPG" },
];

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="content flex flex-col flex-[1_1_auto] items-center justify-center m-0">
        <div className="flex-col md:flex-row items-center text-center mb-[clamp(2rem,5vw,4rem)] p-[clamp(1rem,3vw,2rem)]">
          {/* Avatar */}
          <div className="w-full  flex justify-center mb-4 md:mb-0">
            <img
              src="/image/IMG_9261.jpg"
              alt="avatar"
              className="rounded-full shadow w-[180px] h-[180px] object-cover bg-white"
            />
          </div>
          <h1 className="text-[3.7rem] mb-4 font-bold">Xin Chào!</h1>
          {/* Text */}
          <div className="w-full text-center md:text-left">
            <h2 className="font-bold text-2xl mb-1">Tôi là {aboutData.name}</h2>
            <h5 className="text-gray-500 text-lg mb-3">{aboutData.title}</h5>
          </div>
        </div>
        <div className="w-[90%] mb-2">
          {isMobile ? (
            <Swiper
              spaceBetween={20}
              slidesPerView={1.5}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
              className="mySwiper"
            >
              {data.map((item, index) => (
                <SwiperSlide key={index}>
                  <a
                    href={item.href}
                    className="block relative rounded-xl overflow-hidden shadow-md group cursor-pointer"
                  >
                    <img
                      className="w-full h-[250px] object-cover"
                      src={item.img}
                      alt={item.label}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300" />
                    <h2 className="inset-0 flex items-center justify-center absolute text-white text-xl font-bold">
                      {item.label}
                    </h2>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {data.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-md group hover:scale-105 transition duration-300"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={item.img}
                    alt={item.label}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300" />
                  <h2 className="inset-0 flex items-center justify-center absolute text-white text-xl font-bold">
                    {item.label}
                  </h2>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
