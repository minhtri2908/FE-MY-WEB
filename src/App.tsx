import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Contact from "./Contact/contact";
import ScrollDownButton from "./component/ScrollDownButton";
import { Pagination, Autoplay } from "swiper/modules";
import "./App.css";
const aboutData = {
  avatar: "https://same-assets.com/placeholder-avatar.png",
  name: "Phạm Minh Trí",
  title: "Fullstack Developer & Photographer",
  bio: "Một Intern Fullstack Developer & Photographer, đam mê phát triển web ứng dụng và chia sẻ niềm vui với mọi người bằng hình ảnh, rất vui được gặp tất cả các bạn! Hãy tham quan trang web của tôi.",
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
              className="shadow w-[180px] h-[180px] object-cover bg-white animate-morph-rounded"
            />
          </div>
          <h1 className="text-[2.5rem] sm:text-[3.7rem] mb-4 font-bold flex items-center justify-center gap-2">
            <span>Xin Chào</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 36"
              fill="currentColor"
              className="inline-block w-10 h-10 ml-2"
            >
              <path
                fill="#FFDC5D"
                d="M32.375 16.219c-1.381-.611-3.354.208-4.75 2.188c-.917 1.3-1.187 3.151-2.391 3.344c-.46.074-.71-.206-.84-.609c-.137-.68-.107-1.731.147-3.201l2.74-12.315c.218-.941-.293-1.852-1.523-2.149s-2.155.306-2.374 1.247L20.938 15.89c-.493 2.466-1.407 2.018-1.186-.775v-.001l.701-13.092C20.51 1.01 19.732.183 18.582.139c-1.15-.044-1.979.646-2.038 1.657l-.668 13.409c-.143 2.707-1.112 1.687-1.322-.274L13 4.083c-.159-1.023-1.118-1.73-2.268-1.546c-1.15.185-1.845 1.136-1.686 2.159l1.495 9.914c.593 3.785-.182 4.833-1.458.723L7.489 9.308c-.26-.967-1.213-1.567-2.41-1.231c-1.197.336-1.713 1.299-1.454 2.266l1.558 5.663c.651 4.077.651 5.686.651 8.493S7.125 36 17 36s11.906-10.031 12-10.666c0 0 .123-1.48 1.156-2.865a57.846 57.846 0 0 1 3.125-3.866c.317-.359.625-1.707-.906-2.384z"
              />
              <path
                fill="#EF9645"
                d="M24.911 21.741c-.3-.122-.554-.436-.584-1.119c-1.892.259-4.451.789-6.42 2.715c-2.556 2.499-2.992 5.2-2.971 7.007c.017 1.457.812 2.147 1.045-.012c.293-2.727 2.282-8.143 8.93-8.591z"
              />
            </svg>
          </h1>
          <div className="w-full text-center md:text-left">
            <h2 className="font-bold text-2xl mb-1">Tôi là {aboutData.name}</h2>
            {/* <h5 className="text-gray-500 text-lg mb-3">{aboutData.title}</h5> */}
            <p className="text-gray-500 text-base mb-6 max-w-[600px] mx-auto leading-relaxed">{aboutData.bio}</p>
            <div className="mb-6 flex justify-center">
              <ScrollDownButton />
            </div>
          </div>
        </div>

        <div className="w-[90%] mb-2">
          {isMobile ? (
            <Swiper
              spaceBetween={20}
              slidesPerView={1.5}
              centeredSlides={true}
              freeMode={true}
              grabCursor={true}
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
      <Contact />
    </>
  );
}
