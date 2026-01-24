import { useState, useEffect } from "react";
import { ShoppingCart, CheckCircle, XCircle, RotateCw } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { transactionService } from "../service/api/transaction.service";
import { Transaction } from "../service/types/transaction.types";

const OrderStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const transactionId = location.state?.transactionId;

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch transaction status
  const fetchTransactionStatus = async (isRefresh = false) => {
    if (!transactionId) {
      navigate("/");
      return;
    }

    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }

      const data = await transactionService.getById(transactionId);
      setTransaction(data);
    } catch (error) {
      console.error("Error fetching transaction:", error);
      alert("Failed to fetch order status");
    } finally {
      if (isRefresh) {
        setIsRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTransactionStatus(false);
  }, [transactionId]);

  // Handle refresh button
  const handleRefresh = () => {
    fetchTransactionStatus(true);
  };

  // Loading state
  if (loading) {
    return (
      <section className="w-full bg-white grid place-items-center py-10 min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order status...</p>
        </div>
      </section>
    );
  }

  if (!transaction) {
    return null;
  }

  const status = transaction.status?.trim().toLowerCase();

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
          ) : status === "paid" ? (
            /* TAMPILAN ACCEPTED */
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
          ) : (
            /* TAMPILAN REJECTED */
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <XCircle className="text-red-600" size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Payment Rejected</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                We're sorry, but your payment could not be verified. This might
                be due to an invalid payment proof or incorrect payment amount.
                Please contact our customer service or try again with the
                correct payment information.
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-black text-white px-8 py-3 rounded-md font-bold hover:bg-gray-800 transition-all"
              >
                Back to Home
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderStatus;
