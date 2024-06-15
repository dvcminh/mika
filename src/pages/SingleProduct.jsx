import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaLongArrowAltRight } from "react-icons/fa";
import lazadaLogo from "/images/logo-lazada.png";
import shopeeLogo from "/images/logo-shopee.png";
import tikiLogo from "/images/logo-tiki.png";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarShopeeProduct, setSimilarShopeeProduct] = useState([]);
  const [similarTikiProduct, setSimilarTikiProduct] = useState([]);
  const [similarLazadaProduct, setSimilarLazadaProduct] = useState([]);
  const [relativeProducts, setRelativeProducts] = useState([]);
  const [category, setCategory] = useState("");
  console.log(id);

  const formatPrice = (price, type) => {
    if (type === "lazada") {
      return price;
    } else if (type === "tiki") {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    } else if (type === "shopee") {
      return price;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/products/findProductById",
          {
            params: {
              id: id,
            },
          }
        );
        console.log(response.data);
        setProduct(response.data);
        setCategory(response.data.category);
        console.log(response.data.title);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchShopeeData = async () => {
      if (product.type && product.subcategory) {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/v1/products/getSimilarProductsByCategoryAndType",
            {
              params: {
                type: "shopee",
                subcategory: product.subcategory,
              },
            }
          );
          console.log(response.data);
          setSimilarShopeeProduct(response.data);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      } else {
        console.log("Product type or subcategory is null or undefined.");
      }
    };
    const fetchTikiData = async () => {
        if (product.type && product.subcategory) {
            try {
              const response = await axios.get(
                "http://localhost:8080/api/v1/products/getSimilarProductsByCategoryAndType",
                {
                  params: {
                    type: "tiki",
                    subcategory: product.subcategory,
                  },
                }
              );
              console.log(response.data);
              setSimilarTikiProduct(response.data);
            } catch (error) {
              console.log("Error fetching data:", error);
            }
          } else {
            console.log("Product type or subcategory is null or undefined.");
          }
    };

    const fetchLazadaData = async () => {
        if (product.type && product.subcategory) {
            try {
              const response = await axios.get(
                "http://localhost:8080/api/v1/products/getSimilarProductsByCategoryAndType",
                {
                  params: {
                    type: "lazada",
                    subcategory: product.subcategory,
                  },
                }
              );
              console.log(response.data);
              setSimilarLazadaProduct(response.data);
            } catch (error) {
              console.log("Error fetching data:", error);
            }
          } else {
            console.log("Product type or subcategory is null or undefined.");
          }
    };
    fetchLazadaData();
    fetchShopeeData();
    fetchTikiData();
  }, [product.type, product.subcategory]);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const response = await axios.get("http://localhost:8080/api/v1/products/findProductByName", {
  //                 params: {
  //                     category: category
  //                 }
  //             });
  //             console.log("hello");
  //             console.log(response.data);
  //             setRelativeProducts(response.data);
  //         }
  //         catch (error) {
  //             console.log("Error aaa fetching data:", error);
  //         }
  //     }
  //     fetchData();
  //     //window.scrollTo(0, 0);
  // }, [category])

  const handleButtonClick = (link_item) => {
    window.open(link_item);
  };

  const getLogoSrc = (type) => {
    switch (type) {
      case "lazada":
        return lazadaLogo;
      case "shopee":
        return shopeeLogo;
      case "tiki":
        return tikiLogo;
      default:
        return "https://w7.pngwing.com/pngs/426/341/png-transparent-shopping-cart-e-commerce-online-shopping-logo-shopping-cart-blue-service-logo.png";
    }
  };

  return (
    <div className="mt-32 px-28 max-w-screen-2xl mx-auto container">
      <div className="p-3 m-auto">
        <hr />
        {/* path */}
        <div className="mt-10">
          <a href="/" className="text-gray-600">
            Home{" "}
          </a>
          <a href="/category" className="font-bold">
            / Category
          </a>
        </div>

        {/* Main section */}
        <div className="mt-12 sm:mt-10">
          <div className="flex gap-4 h-max justify-center">
            {/* image */}
            <div className="w-1/2 flex border p-8 rounded-lg shadow-sm">
              <img
                src={product.image_url}
                alt="image"
                className="h-120 w-[80%] object-cover  mx-auto"
              />
            </div>
            {/* product detail */}
            <div className="w-1/2">
              <h2 className="text-2xl font-bold capitalize text-center">
                {product.title}
              </h2>
              {/* <p className='mt-4 text-gray-500 text-base leading-6 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque in hic magni esse distinctio maxime alias tempore aperiam sunt odit unde quia, a autem voluptas eaque? Ut veniam dolorum velit. Et voluptatum quia nulla optio, suscipit sit repellendus eos ab, magnam natus quam. Ea perspiciatis voluptates sunt inventore accusamus, debitis, ipsam ipsa eveniet quo, quas adipisci nisi error reiciendis asperiores?</p> */}
              <span className="flex text-yellow-400 my-8 max-sm:my-4 text-xl items-center gap-1">
                (120)
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </span>

              <div className="mt-3">
                {/* <div className='flex flex-col gap-2 w-full'>
                                    <label className='font-semibold'>Quantity</label>
                                    <input type="number" name='quantity' id='price' defaultValue={1} required className='border p-2 border-gray-400
                                    font-semibold outline-none w-full max-w-full focus:border-red-500' />
                                </div> */}
                <div className="w-full mt-2 flex items-center justify-between px-4 py-4 shadow-sm border rounded-md">
                  <p className="text-red-600 font-semibold max-sm:text-xl ">
                    {formatPrice(product.price, product.type)}
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={getLogoSrc(product.type)}
                      alt="logo"
                      className="h-8 object-cover"
                    />
                    <button
                      onClick={() => handleButtonClick(product.link_item)}
                      className="flex text-white rounded-md bg-orange-500 px-4 py-2 hover:bg-[#ea4531] hover:text-gray-200 justify-center items-center gap-2"
                    >
                      Đến nơi bán
                      <FaLongArrowAltRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          {/* Description */}

          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-4">CHI TIẾT SẢN PHẨM</h1>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>

          {/* Relative product */}
          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-4">SẢN PHẨM LIÊN QUAN</h1>
            <div class="mb-2 mt-6">
              <img
                data-src="https://lh3.googleusercontent.com/VaYiFU3XqGRArjLz8nZhSv2VWl39KbeU3Kv3HiK7c5LNA-JqSRZo22Ds2JK0kK04SENns6F8c-vrtQLlC7VHkvh3Y-grYu2HKF6hVAfY0rH_ivBDwdQXB2wc1hkPbBNjp_2Sme5wTA=w515-h50-no"
                alt="platform"
                class="img-responsive h-8"
                src="https://lh3.googleusercontent.com/VaYiFU3XqGRArjLz8nZhSv2VWl39KbeU3Kv3HiK7c5LNA-JqSRZo22Ds2JK0kK04SENns6F8c-vrtQLlC7VHkvh3Y-grYu2HKF6hVAfY0rH_ivBDwdQXB2wc1hkPbBNjp_2Sme5wTA=w515-h50-no"
                lazy="loaded"
              />
            </div>
            {/* tiki */}

            {similarTikiProduct.map((product) => (
              <div key={product.id} className="product-card flex flex-wrap p-2">
                <div className="flex w-full sm:w-auto">
                  <div className="thumbnail-wrapper flex-none relative">
                    <img
                      alt={product.title}
                      className="thumbnail h-12 w-12 lg:h-20 lg:w-20"
                      src={product.image_url}
                    />
                  </div>
                </div>
                <div className="product-body flex justify-between items-center flex-auto ml-2">
                  <div className="info-name overflow-hidden pr-2">
                    <div className="relative product-name break-words">
                      <a
                        href={product.link_item}
                        target="_self"
                        title={product.title}
                        className="hover:text-primary-700 cursor-pointer"
                      >
                        <span className="leading-5 line-clamp__2 text-sm app-sm:text-base">
                          {product.title}
                        </span>
                      </a>
                    </div>
                    <div className="flex sm:items-end flex-col sm:flex-row text-xs"></div>
                  </div>
                  <div className="flex flex-col flex-wrap items-end space-y-1 cursor-pointer">
                    <div className="flex items-center min-w-max">
                      <span className="text-red-600 font-medium">
                        {parseInt(product.price).toLocaleString()}&nbsp;₫
                      </span>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div
                  className="target ml-2 flex flex-col items-end justify-center"
                  style={{ maxWidth: "45%" }}
                >
                  <div
                    className="a-btn inline-flex secondary medium px-2 py-2 md:px-5 md:py-3"
                    rel="nofollow"
                    href={product.link_item}
                    style={{ minWidth: "125px" }}
                  >
                    <p className="a-btn-content">
                      Đến nơi bán
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 ml-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* lazada */}
            <div class="mb-2 mt-6">
              <img
                data-src="https://lh3.googleusercontent.com/DF4aF5VZEz_NYkI_eJIyYFD6SM21UyBxiEeWVRaYY3Cr-MUZ8AuUgB6kI6L6DBCzmCJf7TIMRQYdHgZ9m4WEA4e41oglDoWQIpwoK0Tj784azJsPky9g3w6tUR7mhsfi4U8o_NSGJw=w765-h50-no"
                alt="platform"
                class="img-responsive h-8"
                src="https://lh3.googleusercontent.com/DF4aF5VZEz_NYkI_eJIyYFD6SM21UyBxiEeWVRaYY3Cr-MUZ8AuUgB6kI6L6DBCzmCJf7TIMRQYdHgZ9m4WEA4e41oglDoWQIpwoK0Tj784azJsPky9g3w6tUR7mhsfi4U8o_NSGJw=w765-h50-no"
                lazy="loaded"
              />
            </div>

            {similarLazadaProduct.map((product) => (
              <div key={product.id} className="product-card flex flex-wrap p-2">
                <div className="flex w-full sm:w-auto">
                  <div className="thumbnail-wrapper flex-none relative">
                    <img
                      alt={product.title}
                      className="thumbnail h-12 w-12 lg:h-20 lg:w-20"
                      src={product.image_url}
                    />
                  </div>
                </div>
                <div className="product-body flex justify-between items-center flex-auto ml-2">
                  <div className="info-name overflow-hidden pr-2">
                    <div className="relative product-name break-words">
                      <a
                        href={product.link_item}
                        target="_self"
                        title={product.title}
                        className="hover:text-primary-700 cursor-pointer"
                      >
                        <span className="leading-5 line-clamp__2 text-sm app-sm:text-base">
                          {product.title}
                        </span>
                      </a>
                    </div>
                    <div className="flex sm:items-end flex-col sm:flex-row text-xs"></div>
                  </div>
                  <div className="flex flex-col flex-wrap items-end space-y-1 cursor-pointer">
                    <div className="flex items-center min-w-max">
                      <span className="text-red-600 font-medium">
                        {formatPrice(product.price, product.type)}
                      </span>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div
                  className="target ml-2 flex flex-col items-end justify-center"
                  style={{ maxWidth: "45%" }}
                >
                  <div
                    className="a-btn inline-flex secondary medium px-2 py-2 md:px-5 md:py-3"
                    rel="nofollow"
                    href={product.link_item}
                    style={{ minWidth: "125px" }}
                  >
                    <p className="a-btn-content">
                      Đến nơi bán
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 ml-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* shopee */}
            <div className="mb-2 mt-6">
              <img
                data-src="https://lh3.googleusercontent.com/OwDr2GswbeYne43OtdOL1cqPx_Q7MoXNPbGAAalXumcCojcbb-KcUQqjP4l2EHOPXySoPWqk5YKDcRqT4_22Yv0L0g0NS6owVBz5ZRFCmUEyyC3NcZd4Nndb6vLEkFJ6k29I5fOb=w556-h50-no"
                alt="platform"
                className="img-responsive h-10"
                src="https://lh3.googleusercontent.com/OwDr2GswbeYne43OtdOL1cqPx_Q7MoXNPbGAAalXumcCojcbb-KcUQqjP4l2EHOPXySoPWqk5YKDcRqT4_22Yv0L0g0NS6owVBz5ZRFCmUEyyC3NcZd4Nndb6vLEkFJ6k29I5fOb=w556-h50-no"
              />
            </div>
            <div>
              {similarShopeeProduct.map((product) => (
                <div
                  key={product.id}
                  className="product-card flex flex-wrap p-2"
                >
                  <div className="flex w-full sm:w-auto">
                    <div className="thumbnail-wrapper flex-none relative">
                      <img
                        alt={product.title}
                        className="thumbnail h-12 w-12 lg:h-20 lg:w-20"
                        src={product.image_url}
                      />
                    </div>
                  </div>
                  <div className="product-body flex justify-between items-center flex-auto ml-2">
                    <div className="info-name overflow-hidden pr-2">
                      <div className="relative product-name break-words">
                        <a
                          href={product.link_item}
                          target="_self"
                          title={product.title}
                          className="hover:text-primary-700 cursor-pointer"
                        >
                          <span className="leading-5 line-clamp__2 text-sm app-sm:text-base">
                            {product.title}
                          </span>
                        </a>
                      </div>
                      <div className="flex sm:items-end flex-col sm:flex-row text-xs"></div>
                    </div>
                    <div className="flex flex-col flex-wrap items-end space-y-1 cursor-pointer">
                      <div className="flex items-center min-w-max">
                        <span className="text-red-600 font-medium">
                          {formatPrice(product.price, product.type)}
                        </span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div
                    className="target ml-2 flex flex-col items-end justify-center"
                    style={{ maxWidth: "45%" }}
                  >
                    <div
                      className="a-btn inline-flex secondary medium px-2 py-2 md:px-5 md:py-3"
                      rel="nofollow"
                      href={product.link_item}
                      style={{ minWidth: "125px" }}
                    >
                      <p className="a-btn-content">
                        Đến nơi bán
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-5 ml-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          ></path>
                        </svg>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
