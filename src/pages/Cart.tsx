import { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';

const ShoppingCart = lazy(() => import('paymentProvider/ShoppingCart'));

const Cart = () => {
  const { items, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout');
    }
  };

  const cartItems = items.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: item.quantity,
    stock: item.stock,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Your Shopping Cart
          </h1>
          <p className="text-gray-600 text-lg">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<Loading />}>
            <ShoppingCart
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onCheckout={handleCheckout}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Cart;
