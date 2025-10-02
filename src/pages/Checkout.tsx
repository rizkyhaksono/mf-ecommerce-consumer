import { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShippingInfo, PaymentInfo } from '../types';
import Loading from '../components/Loading';

const CheckoutForm = lazy(() => import('paymentProvider/CheckoutForm'));

const Checkout = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCompleteOrder = (shippingInfo: ShippingInfo, paymentInfo: PaymentInfo) => {
    console.log('Order completed:', {
      items,
      shippingInfo,
      paymentInfo,
      timestamp: new Date().toISOString(),
    });

    // Clear cart and redirect to success page
    clearCart();
    navigate('/order-success');
  };

  const handleBack = () => {
    navigate('/cart');
  };

  const cartItems = items.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: item.quantity,
    stock: item.stock,
  }));

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-lg p-12">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products before checking out</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-xl transition-all"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Checkout
          </h1>
          <p className="text-gray-600 text-lg">
            Complete your order in a few simple steps
          </p>
        </div>

        <Suspense fallback={<Loading />}>
          <CheckoutForm
            items={cartItems}
            onComplete={handleCompleteOrder}
            onBack={handleBack}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Checkout;
