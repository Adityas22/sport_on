import { CreditCard, Upload, CheckCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./cart";
import { formatPrice } from "../service/utils/price.utils";
import { useEffect, useState } from "react";
import { transactionService } from "../service/api/transaction.service";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, buyNowItems } = useCart();

  // State untuk form data dari checkout
  const checkoutData = location.state?.checkoutData;

  // Cek mode dari state yang dikirim dari checkout
  const mode = location.state?.mode || "cart";

  // Tentukan items yang akan dibayar
  const paymentItems = mode === "buy_now" ? buyNowItems : cartItems;

  // State untuk file upload dan loading
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hitung total
  const totalAmount = paymentItems.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0,
  );

  // Redirect jika tidak ada items atau checkout data
  useEffect(() => {
    if (paymentItems.length === 0 || !checkoutData) {
      navigate("/");
    }
  }, [paymentItems, checkoutData, navigate]);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  // Handle submit payment
  const handleSubmit = async () => {
    if (!paymentProof) {
      alert("Please upload payment proof!");
      return;
    }

    if (!checkoutData) {
      alert("Checkout data missing!");
      return;
    }

    try {
      setIsSubmitting(true);

      const transactionPayload = {
        paymentProof,
        purchasedItems: paymentItems.map((item) => ({
          productId: item.product._id,
          qty: item.qty,
        })),
        totalPayment: totalAmount,
        customerName: checkoutData.fullName,
        customerContact: checkoutData.whatsapp,
        customerAddress: checkoutData.address,
      };

      const transaction = await transactionService.create(transactionPayload);

      navigate("/order-status", {
        state: { transactionId: transaction._id },
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Failed to submit payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentOptions = [
    { bank: "BCA", number: "0123182312" },
    { bank: "Mandiri", number: "83923912013203123" },
    { bank: "BTPN", number: "5238218923" },
  ];

  return (
    <section className="w-full min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-black text-center mb-10">Payment</h1>

        {/* Info mode untuk debugging - bisa dihapus */}
        {mode === "buy_now" && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-md mb-4 text-center text-sm">
            Buy Now Payment
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: PAYMENT OPTIONS */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold">Payment Options</h2>
            </div>

            <div className="flex-grow">
              {paymentOptions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded flex items-center justify-center text-blue-600">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.bank}</h3>
                      <p className="text-gray-500 text-sm tracking-wider">
                        {item.number}
                      </p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded">
                    Bank Transfer
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: PAYMENT STEPS & UPLOAD */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Payment Steps</h2>

              <ol className="space-y-4 text-sm text-gray-700 leading-relaxed mb-8">
                <li>
                  <span className="font-bold">1. </span>
                  Transfer the total amount of{" "}
                  <span className="font-bold text-orange-500">
                    {formatPrice(totalAmount)}
                  </span>{" "}
                  to your preferred bank account listed under 'Payment Options'
                  (BCA, Mandiri, or BTPN).
                </li>
                <li>
                  <span className="font-bold">2. </span>
                  After completing the transfer,{" "}
                  <span className="font-bold">keep the payment receipt</span> or
                  a screenshot of the transfer confirmation. This will be needed
                  for the next step.
                </li>
                <li>
                  <span className="font-bold">3. </span>
                  Upload the payment receipt/screenshot using the{" "}
                  <span className="font-bold">
                    'Upload Receipt & Confirm'
                  </span>{" "}
                  button below to validate your transaction.
                </li>
              </ol>

              {/* UPLOAD AREA */}
              <label htmlFor="upload-receipt" className="block">
                <div className="border-2 border-dashed border-red-200 bg-red-50/30 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-red-50/50 transition-colors">
                  <Upload className="text-orange-500 mb-3" size={32} />
                  <p className="text-gray-500 text-sm">
                    {paymentProof
                      ? `Selected: ${paymentProof.name}`
                      : "Upload Your Payment Receipt here"}
                  </p>
                </div>
              </label>
              <input
                type="file"
                className="hidden"
                id="upload-receipt"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* TOTAL & CONFIRM BUTTON */}
            <div className="mt-auto border-t border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg text-gray-800">Total</span>
                <span className="font-bold text-lg text-orange-500">
                  {formatPrice(totalAmount)}
                </span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!paymentProof || isSubmitting}
                className="w-full bg-[#1A1A1A] text-white py-4 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle size={20} />
                {isSubmitting ? "Processing..." : "Upload Receipt & Confirm"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
