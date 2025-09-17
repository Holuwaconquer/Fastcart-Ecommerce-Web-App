import React, { useState, useRef, useEffect, useContext } from "react";
import { GoArrowRight } from "react-icons/go";
import Xbox from "../assets/xbox.png";
import GooglePixel from "../assets/googlePixel.png";
import Airpod from "../assets/airpod.png";
import { GoPackage, GoCreditCard } from "react-icons/go";
import { PiTrophyThin } from "react-icons/pi";
import { SlEarphonesAlt } from "react-icons/sl";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import Playstation from "../assets/playstation.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import Drone from "../assets/drone.png";
import Samsung from "../assets/samsung-phone.png";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Computer from "../assets/computer.png";
import Banner from "../assets/Banner.png";
import { CategoryContext } from "../CategoryContext";
import BestDeals from "../components/BestDeals";
import FeaturedProducts from '../components/FeaturedProducts'
import FewProduct from "../components/FewProduct";

const Landingpage = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const {allCategory} = useContext(CategoryContext)
  const { allProduct } = useContext(CategoryContext)
  const [chunkSize, setChunkSize] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChunkSize(2);
      } else if (window.innerWidth < 1024) {
        setChunkSize(4);
      } else {
        setChunkSize(6);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };
  const slideCategory = chunkArray(allCategory, chunkSize);


  return (
    <div
      className="w-full h-auto flex flex-col gap-y-[2em]"
      style={{ padding: "10px 6%" }}
    >
      <div className="w-full grid md:grid-cols-[2fr_1fr] gap-[2em]">
        {/* for the xbox section */}
        <div
          className="w-full h-auto bg-[#F2F4F5] rounded-[6px]"
          style={{ padding: "40px" }}
        >
          <div className="w-full flex items-center justify-center gap-[2em]">
            {/* for the xbox content */}
            <div className="w-full flex flex-col gap-4">
              <p className="text-[#2484C2] text-[14px] flex gap-2 items-center font-bold">
                <span className="w-[24px] bg-[#2484C2] h-[2px]"></span>
                <span>THE BEST PLACE TO PLAY</span>
              </p>
              <h1 className="text-[48px] text-[#191C1F] leading-[1em]">
                Xbox Consoles
              </h1>
              <p className="text-[18px] text-[#475156]">
                Save up to 50% on select Xbox games. Get 3 months of PC Game
                Pass for $2 USD.
              </p>
              <div>
                <button
                  className="flex gap-4 text-white bg-[#FA8232] rounded-[3px]"
                  style={{ padding: "20px 32px" }}
                >
                  <span>SHOP NOW</span> <GoArrowRight size={24} />
                </button>
              </div>
            </div>
            {/* for the xbox image */}
            <div className="w-full relative">
              <div>
                <img src={Xbox} alt="" />
              </div>
              <div className="w-[100px] h-[100px] flex flex-col items-center justify-center font-bold absolute top-0 right-0 rounded-[50%] bg-[#2DA5F3] text-black">
                <h1 className="text-[22px]">$299</h1>
              </div>
            </div>
            {/* xbox image end */}
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex flex-col gap-[2em]">
            {/* for google pixel phone */}
            <div
              className="w-full bg-[#191C1F] rounded-[6px] relative"
              style={{
                padding: "40px",
                backgroundImage: `url(${GooglePixel})`,
                backgroundPosition: "200px 100px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            >
              <div className="w-full flex items-center justify-center">
                {/* for summer sales content */}
                <div className="w-full flex flex-col gap-4">
                  <p className="text-[#EBC80C] text-[14px]">
                    <span>Summer Sales</span>
                  </p>
                  <h1 className="text-[24px] text-white leading-[1em]">
                    New Google Pixel 6 Pro
                  </h1>
                  <div>
                    <button
                      className="flex gap-4 text-white bg-[#FA8232] rounded-[3px]"
                      style={{ padding: "20px 25px" }}
                    >
                      <span>SHOP NOW</span> <GoArrowRight size={24} />
                    </button>
                  </div>
                </div>
                <div
                  className="rounded-[2px] bg-[#EFD33D] absolute top-[20px] right-[20px] text-[#141414] font-bold"
                  style={{ padding: "10px" }}
                >
                  <span className="text-16px">29% OFF</span>
                </div>
              </div>
            </div>
            {/* for earpod */}
            <div>
              <div
                className="w-full bg-[#F2F4F5] rounded-[6px] relative"
                style={{ padding: "40px" }}
              >
                <div className="w-full flex items-center justify-center">
                  <div className="w-full">
                    <img src={Airpod} alt="" />
                  </div>
                  {/* for summer sales content */}
                  <div className="w-full flex flex-col gap-4">
                    <h1 className="text-[24px] text-white leading-[1em]">
                      Xiaomi FlipBuds Pro
                    </h1>
                    <p className="text-[#2DA5F3] text-[18px]">
                      <span>$299 USD</span>
                    </p>
                    <div>
                      <button
                        className="flex gap-4 text-white bg-[#FA8232] rounded-[3px]"
                        style={{ padding: "10px" }}
                      >
                        <span>SHOP NOW</span> <GoArrowRight size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* for fast delivery and ... */}
      <div
        className="w-full md:border-1 md:border-[#E4E7E9] rounded-[6px]"
        style={{ padding: "16px" }}
      >
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-0">
          {/* for fastest delivery */}
          <div style={{padding: '10px'}} className="border-1 border-[#E4E7E9] md:border-0 rounded-[6px] flex flex-col md:flex-row items-center justify-center gap-3 md:border-r-1 md:border-[#E4E7E9]">
            <GoPackage size={40} />
            <div className="text-center md:text-left">
              <p className="text-[14px] text-[#191C1F] font-bold">
                FASTEST DELIVERY
              </p>
              <p className="text-[#5F6C72] text-[14px]">Delivery in 24/H</p>
            </div>
          </div>
          {/* for 24h return */}
          <div style={{padding: '10px'}} className="border-1 border-[#E4E7E9] md:border-0 rounded-[6px] flex flex-col md:flex-row items-center justify-center gap-3 md:border-r-1 md:border-[#E4E7E9]">
            <PiTrophyThin size={40} />
            <div className="text-center md:text-left">
              <p className="text-[14px] text-[#191C1F] font-bold">
                24 HOURS RETURN
              </p>
              <p className="text-[#5F6C72] text-[14px]">
                100% money-back guarantee
              </p>
            </div>
          </div>
          {/* for secure payment */}
          <div style={{padding: '10px'}} className="border-1 border-[#E4E7E9] md:border-0 rounded-[6px] flex flex-col md:flex-row items-center justify-center gap-3 md:border-r-1 md:border-[#E4E7E9]">
            <GoCreditCard size={40} />
            <div className="text-center md:text-left">
              <p className="text-[14px] text-[#191C1F] font-bold">
                SECURE PAYMENT
              </p>
              <p className="text-[#5F6C72] text-[14px]">Your money is safe</p>
            </div>
          </div>
          {/* for support 24/7 */}
          <div style={{padding: '10px'}} className="border-1 border-[#E4E7E9] md:border-0 rounded-[6px] flex flex-col md:flex-row items-center justify-center gap-3 md:border-r-1 md:border-[#E4E7E9]">
            <SlEarphonesAlt size={40} />
            <div className="text-center md:text-left">
              <p className="text-[14px] text-[#191C1F] font-bold">
                SUPPORT 24/7
              </p>
              <p className="text-[#5F6C72] text-[14px]">Live contact/message</p>
            </div>
          </div>
        </div>
      </div>
      {/* for best deals */}
      <div className="w-full flex flex-col gap-4" style={{ marginTop: "30px" }}>
        <div className="w-full flex items-center justify-between">
          {/* for best deals and countdown */}
          <div className="flex gap-4 items-center">
            <p className="text-[#191C1F] text-[24px] font-bold">Best Deals</p>
          </div>
          <div className="text-[14px] text-[#2DA5F3] flex gap-2 font-bold">
            <span>Browse All Product</span>
            <IoIosArrowRoundForward size={20} />
          </div>
        </div>
        {/* for best deal products */}
        <BestDeals />
      </div>
      {/* for shop with catergory section */}
      <div
        className="w-full flex flex-col gap-4 relative"
        style={{ margin: "30px 0" }}
      >
        <h1 className="text-[#191C1F] text-[32px] text-center">
          Shop with Categories
        </h1>
        <div className="w-full">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            className="w-full"
            
          >
            {slideCategory.map((allCategory, index) => (
              <SwiperSlide key={index}>
                {allCategory ?
                  <div className={`w-full grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6`}>
                    {allCategory.map((category, i) => (
                      <div
                        key={i}
                        className="bg-white border-1 border-[#E4E7E9] rounded-[4px] flex flex-col gap-4 items-center justify-center"
                        style={{ padding: "24px 12px" }}
                      >
                        <img src={category.image} alt="category-image" />
                        <h1 className="text-[#191C1F] text-[16px] font-bold">
                          {category.name}
                        </h1>
                      </div>
                    ))}
                  </div>
                 :
                  <div className="skeleton-loader">
                    <div className="image"></div>
                    <div className="title"></div>
                  </div>
                }
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-full flex justify-between items-center">
            <button
              ref={prevRef}
              className="bg-[#FA8232] w-[48px] h-[48px] absolute top-[55%] left-[-20px] z-10 rounded-[50%] text-white flex flex-col items-center justify-center cursor-pointer"
            >
              <IoIosArrowRoundBack size={24} />
            </button>
            <button
              ref={nextRef}
              className="bg-[#FA8232] w-[48px] h-[48px] absolute top-[55%] right-[-20px] z-10 rounded-[50%] text-white flex flex-col items-center justify-center cursor-pointer"
            >
              <IoIosArrowRoundForward size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* for few product from store */}
      <FewProduct />
      {/* for featured products */}
      <FeaturedProducts />
    </div>
  );
};

export default Landingpage;
