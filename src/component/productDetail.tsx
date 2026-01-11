import { useState } from "react";
import { ShoppingBag } from "lucide-react";

const ProductDetail = () => {
  //   const { id } = useParams();
  const [qty, setQty] = useState(1);
  const increase = () => setQty((p) => p + 1);
  const decrease = () => setQty((p) => (p > 1 ? p - 1 : 1));

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start md:p-5 lg:p-10 p-4">
        {/* LEFT IMAGE */}
        <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative w-full md:h-full overflow-x-hidden grid place-items-center rounded-xl">
          <img
            src="/images/products/product-4.png"
            alt="SportsOn HyperSoccer v2"
            className="hidden sm:block object-contain "
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h1 className="text-4xl font-extrabold mb-2">
            SportsOn HyperSoccer v2
          </h1>

          {/* CATEGORY TAG */}
          <span className="bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-full">
            Football
          </span>

          <div className="mt-6 flex justify-center sm:hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative w-full md:h-full rounded-xl p-4">
            <img
              src="/images/products/product-4.png"
              alt="shoes"
              className="w-64 rotate-2 drop-shadow-2xl"
            />
          </div>

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-600 leading-relaxed text-justify">
            The SportsOn HyperSoccer v2 is engineered for the player who demands
            precision, power, and unrivaled speed on the pitch. Featuring a
            striking, two-toned black and white design with deep crimson
            accents, these cleats don’t just perform—they make a statement.
            Experience the future of football footwear with v2's enhanced fit
            and cutting-edge traction.
          </p>
          {/* 
          <p className="hidden sm:block text-3xl font-bold text-orange-500 mt-4 ">
            Rp. 458.000
          </p> */}

          {/* ACTION SECTION CONTAINER */}
          <div className="mt-8 flex flex-col gap-6">
            {/* HARGA (Baris Atas) */}
            <p className="text-3xl md:text-4xl font-extrabold text-orange-500">
              Rp. 458.000
            </p>

            <div className="flex flex-row items-center gap-2 sm:gap-4 w-full">
              {/* QTY SELECTOR*/}
              <div className="flex items-center border border-gray-200 rounded-lg h-14 bg-white overflow-hidden shadow-sm w-20 sm:w-28 flex-shrink-0">
                <div className="flex-1 flex items-center justify-center border-r border-gray-100 font-bold text-sm sm:text-base">
                  {qty}
                </div>
                <div className="flex flex-col w-8 sm:w-10 h-full bg-gray-50">
                  <button
                    onClick={increase}
                    className="flex-1 flex items-center justify-center hover:bg-gray-100 border-b border-gray-200 text-sm sm:text-base font-bold text-gray-600"
                    title="Tambah"
                  >
                    +
                  </button>
                  <button
                    onClick={decrease}
                    className="flex-1 flex items-center justify-center hover:bg-gray-100 text-sm sm:text-base font-bold text-gray-600"
                    title="Kurang"
                  >
                    −
                  </button>
                </div>
              </div>

              {/* WRAPPER TOMBOL */}
              <div className="flex flex-row gap-2 flex-1 min-w-0">
                {/* ADD TO CART */}
                <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-orange-500 text-white h-14 rounded-lg hover:bg-orange-600 font-bold transition-all active:scale-95 shadow-md min-w-0">
                  <ShoppingBag size={22} strokeWidth={2} />
                  <span className="whitespace-nowrap text-[10px] xs:text-xs sm:text-sm lg:text-base truncate">
                    Add to Cart
                  </span>
                </button>

                {/* CHECKOUT */}
                <button className="flex-1 bg-gray-900 text-white h-14 rounded-lg hover:bg-black font-bold transition-all active:scale-95 shadow-md whitespace-nowrap text-[10px] xs:text-xs sm:text-sm lg:text-base truncate">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
