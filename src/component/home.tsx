import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { categoryService } from "../service/api/category.service";
import { Category } from "../service/types/category.types";
import { productService } from "../service/api/product.service";
import { Product } from "../service/types//product.types";
import { formatPrice } from "../service/utils/price.utils";
import { useCart } from "./cart";
import { BASE_URL } from "../service/api/client";

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // Ambil data dari API
    const fetchData = async () => {
      try {
        const [cats, prods] = await Promise.all([
          categoryService.getAll(),
          productService.getAll(),
        ]);

        setCategories(cats);
        setProducts(prods);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Tampilan loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="relative w-full bg-white pt-10 pb-16 overflow-x-hidden">
        {/* ORNAMENT KANAN */}
        <img
          src="/images/img-ornament-hero.svg"
          alt="ornament"
          className="
        hidden sm:block
        absolute top-30 -right-50
        w-52 md:w-72 lg:w-96
        opacity-90 pointer-events-none
        "
        />

        {/* CONTAINER UTAMA */}
        <div
          className="
        max-w-6xl        
        mx-auto
        px-4 sm:px-6 md:px-8
        grid grid-cols-1 lg:grid-cols-2
        items-center
        gap-8 lg:gap-6  
        justify-items-center
        relative z-10
        "
        >
          {/* LEFT */}
          <div className="relative max-w-lg lg:justify-self-end">
            <img
              src="/images/img-basketball.png"
              alt="basketball"
              className="
            hidden sm:block
            absolute -top-10 -left-12
            w-40 md:w-56 lg:w-64
            -z-10 opacity-80
            "
            />

            <span className="inline-block text-xs sm:text-sm bg-orange-100 text-orange-600 px-4 py-1 rounded-full mb-4 font-semibold">
              Friday Sale, 50%
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-center lg:text-left italic">
              <span className="text-black block">WEAR YOUR</span>
              <span className="bg-gradient-to-b from-black via-gray-700 to-gray-400 bg-clip-text text-transparent px-2 inline-block">
                TOP–QUALITY
              </span>
              <br />
              <span className="bg-gradient-to-b from-gray-700 to-gray-300 bg-clip-text text-transparent px-2 inline-block">
                SPORTSWEAR
              </span>
            </h1>

            <div className="mt-6 flex justify-center sm:hidden">
              <img
                src="/images/img-hero.png"
                alt="shoes"
                className="w-64 rotate-2 drop-shadow-2xl"
              />
            </div>

            <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg max-w-md text-center lg:text-left">
              Engineered for endurance and designed for speed. Experience gear
              that moves as fast as you do.
            </p>

            <div className="mt-6 sm:mt-8 flex items-center gap-4 sm:gap-6 justify-center lg:justify-start">
              <button className="flex items-center gap-2 bg-[#FF5A3D] hover:bg-[#E44E33] text-white px-8 py-4 transition-colors rounded-lg">
                Explore More
                <ChevronRight className="w-5 h-5" />
              </button>

              <button className="flex items-center gap-2 bg-[#f5f5f5] hover:bg-[#828282] text-black px-8 py-4 transition-colors rounded-lg">
                <span>Watch Video</span>
                <img src="/images/icon-play-video.svg" alt="" />
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative hidden sm:flex justify-center lg:justify-start">
            <img
              src="/images/img-hero.png"
              alt="shoes"
              className="
                w-64 sm:w-72 md:w-[400px] lg:w-[480px]
                rotate-2 drop-shadow-2xl
                "
            />
          </div>
        </div>
      </section>
      {/* categories  */}
      <section className="relative w-full bg-white pb-20 overflow-x-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <h3 className="text-l lg:text-xl font-bold text-foreground">
              Browse By Categories
            </h3>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors"
            >
              See All Categories
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {categories.map((category) => (
              <button
                key={category._id}
                className="group flex flex-col items-center justify-center gap-3 p-5 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 shadow-sm hover:shadow-md bg-[#f5f5f5] text-gray-700 hover:bg-[#ebebeb]"
              >
                <div className="transition-transform duration-300 group-hover:scale-110 text-gray-600 group-hover:text-orange-500">
                  <img
                    src={`${BASE_URL}/${category.imageUrl}`}
                    alt={category.name}
                    className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                  />
                </div>

                <span className="text-xs lg:text-sm font-bold group-hover:text-orange-500">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="relative w-full bg-white pb-20 overflow-x-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10 lg:mb-14">
            <h2 className="text-xl lg:text-3xl font-bold italic">
              <span className="text-primary">OUR</span>
              <span className="text-foreground"> PRODUCTS</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 ">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-background rounded-2xl overflow-hidden p-3 shadow-md"
              >
                <div className="relative aspect-square rounded-2xl p-4 lg:p-6 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
                  {/* ADD TO CART */}
                  <button
                    type="button"
                    onClick={() => addToCart(product, 1)}
                    className="absolute top-3 right-3 w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-orange-500 flex items-center justify-center shadow-sm hover:bg-orange-600 transition-colors z-10"
                  >
                    <Plus className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                  </button>

                  {/* LINK KE DETAIL */}
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={`${BASE_URL}/${product.imageUrl}`}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>

                <div className="py-3 lg:py-4">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="font-semibold text-sm lg:text-base text-foreground mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      {product.category.name}
                    </p>
                    <span className="text-sm lg:text-base font-semibold text-primary">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
