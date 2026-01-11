import { useState } from "react";
import { ShoppingCart, CheckCircle, RotateCw } from "lucide-react";

const OrderStatus = () => {
  // Status bisa berupa: 'pending' atau 'success'
  const [status, setStatus] = useState("pending");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulasi loading selama 1 detik sebelum berubah ke Success
    setTimeout(() => {
      setStatus("success");
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <section className="w-full bg-white grid place-items-center py-10">
      <div className="w-full max-w-2xl bg-gray-50 rounded-xl border border-gray-200 p-8 md:p-16">
        <h1 className="text-4xl font-black text-center mb-10">Order Status</h1>

        <div className="bg-white rounded-xl shadow-sm p-10 flex flex-col items-center text-center">
          {status === "pending" ? (
            /* TAMPILAN PENDING */
            <>
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="text-blue-600" size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Order Submitted !!</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Your Order is recorded in our system, we are still confirming
                the payment status, please wait and your order status will be
                updated in less than 12 hours.
              </p>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-md font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
              >
                <RotateCw
                  size={18}
                  className={isRefreshing ? "animate-spin" : ""}
                />
                {isRefreshing ? "Checking..." : "Refresh Order Status"}
              </button>
            </>
          ) : (
            /* TAMPILAN SUCCESS */
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Order Confirmed !!</h2>
              <p className="text-gray-500 leading-relaxed">
                We have received your payment, and your order is currently
                processed by our staff, just wait until your favorite sportswear
                arrive in your home. We will contact you in Whatsapp for further
                shipping updates.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderStatus;
