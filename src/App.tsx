import React, { Suspense } from 'react';

// Import components from providers
const PaymentButton = React.lazy(() => import('paymentProvider/PaymentButton'));
const ProductCard = React.lazy(() => import('productProvider/ProductCard'));

const App = () => {
  const handlePayment = (amount: number) => {
    console.log(`Payment processed for $${amount}`);
  };

  const handleAddToCart = (product: { name: string; price: number }) => {
    console.log('Added to cart:', product);
  };

  return (
    <div>
      <h1>E-Commerce Consumer App</h1>

      <div style={{ padding: '20px' }}>
        <h2>Products from Product Provider</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <Suspense fallback={<div>Loading Product Card...</div>}>
            <ProductCard
              name="Wireless Headphones"
              price={99.99}
              description="High-quality wireless headphones with noise cancellation"
              onAddToCart={handleAddToCart}
            />
          </Suspense>

          <Suspense fallback={<div>Loading Product Card...</div>}>
            <ProductCard
              name="Smartphone"
              price={699.99}
              description="Latest smartphone with advanced features"
              onAddToCart={handleAddToCart}
            />
          </Suspense>
        </div>

        <h2>Payment from Payment Provider</h2>
        <div style={{ marginTop: '20px' }}>
          <Suspense fallback={<div>Loading Payment Button...</div>}>
            <PaymentButton
              amount={99.99}
              currency="USD"
              onPayment={handlePayment}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;
