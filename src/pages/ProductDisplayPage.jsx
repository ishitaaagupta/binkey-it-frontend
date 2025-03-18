import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import Divider from "../components/Divider";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0]; // Extracting product ID from URL params

  const [data, setData] = useState({
    name: "",
    image: [],
    description: "",
    unit: "",
    price: 0,
    discount: 0,
    stock: 0,
    more_details: {},
  });
  const [imageIndex, setImageIndex] = useState(0); // Index of currently displayed image

  // Fetch product details from API
  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <FaAngleRight className="text-xl md:text-2xl cursor-pointer" />,
    prevArrow: <FaAngleLeft className="text-xl md:text-2xl cursor-pointer" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 3 },
      },
    ],
  };

  return (
    <section className="container mx-auto p-2 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left Section: Product Image & Thumbnails */}
      <div>
       
          {/* Main Product Image */}
          <div className="relative bg-white min-h-48 max-h-56 sm:min-h-[65vh] sm:max-h-[65vh] rounded flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={() =>
                setImageIndex((prev) =>
                  prev === 0 ? data.image.length - 1 : prev - 1
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
            >
              <FaAngleLeft className="text-xl sm:text-2xl" />
            </button>
            <img
              src={data.image[imageIndex]}
              className="w-full h-full object-contain"
              alt="Product"
            />
            <button
              onClick={() =>
                setImageIndex((prev) =>
                  prev === data.image.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
            >
              <FaAngleRight className="text-xl sm:text-2xl" />
            </button>
          </div>

          {/* Scrollable Thumbnail Images */}
          <Slider {...settings} className="my-4">
            {data.image.map((img, index) => (
              <div key={img + index} className="px-2">
                <img
                  src={img}
                  alt="min-product"
                  onClick={() => setImageIndex(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-contain cursor-pointer shadow-md ${
                    index === imageIndex ? "border-2 border-yellow-500" : ""
                  }`}
                />
              </div>
            ))}
          </Slider>
     
        {/* Product Details (Desktop) */}
        <div className="my-4 hidden lg:grid gap-3">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data.unit}</p>
          </div>
          {data?.more_details &&
            Object.keys(data?.more_details).map((element) => (
              <div key={element}>
                <p className="font-semibold">{element}</p>
                <p className="text-base">{data?.more_details[element]}</p>
              </div>
            ))}
        </div>
      </div>
      {/* Right Section: Product Info & Pricing */}
      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className="bg-green-300 w-fit px-2 rounded-full">10 Min</p>
        <h2 className="text-lg font-semibold lg:text-3xl">{data.name}</h2>
        <p>{data.unit}</p>
        <Divider />

        {/* Price & Discount */}
        <div>
          <p>Price</p>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
              <p className="font-semibold text-lg lg:text-xl">
                {DisplayPriceInRupees(
                  pricewithDiscount(data.price, data.discount)
                )}
              </p>
            </div>
            {data.discount > 0 && (
              <>
                <p className="line-through">
                  {DisplayPriceInRupees(data.price)}
                </p>
                <p className="font-bold text-green-600 lg:text-2xl">
                  {data.discount}%{" "}
                  <span className="text-base text-neutral-500">Discount</span>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Add to Cart / Out of Stock */}
        {data.stock === 0 ? (
          <p className="text-lg text-red-500 my-2">Out of Stock</p>
        ) : (
          <div className="my-4">
            <AddToCartButton data={data} />
          </div>
        )}

        {/* Why Shop from Binkeyit? */}
        <h2 className="font-semibold">Why shop from Binkeyit?</h2>
        <div>
          {[
            {
              img: image1,
              title: "Superfast Delivery",
              desc: "Get your order delivered to your doorstep at the earliest from dark stores near you.",
            },
            {
              img: image2,
              title: "Best Prices & Offers",
              desc: "Best price destination with offers directly from the manufacturers.",
            },
            {
              img: image3,
              title: "Wide Assortment",
              desc: "Choose from 5000+ products across food, personal care, household & other categories.",
            },
          ].map(({ img, title, desc }, index) => (
            <div className="flex items-center gap-4 my-4" key={index}>
              <img src={img} alt={title} className="w-20 h-20" />
              <div className="text-sm">
                <div className="font-semibold">{title}</div>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Product Details (Mobile) */}
        <div className="my-4 grid gap-3 lg:hidden">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data.unit}</p>
          </div>
          {data?.more_details &&
            Object.keys(data?.more_details).map((element) => (
              <div key={element}>
                <p className="font-semibold">{element}</p>
                <p className="text-base">{data?.more_details[element]}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
