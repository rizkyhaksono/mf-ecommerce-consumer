declare module 'paymentProvider/PaymentButton' {
  import React from 'react';

  interface PaymentButtonProps {
    amount: number;
    currency?: string;
    onPayment?: (amount: number) => void;
  }

  const PaymentButton: React.FC<PaymentButtonProps>;
  export default PaymentButton;
}

declare module 'productProvider/ProductCard' {
  import React from 'react';

  interface ProductCardProps {
    name: string;
    price: number;
    image?: string;
    description?: string;
    onAddToCart?: (product: { name: string; price: number }) => void;
  }

  const ProductCard: React.FC<ProductCardProps>;
  export default ProductCard;
}

declare module 'paymentProvider/PaymentComponent' {
  import React from 'react';
  const PaymentComponent: React.FC;
  export default PaymentComponent;
}

declare module 'productProvider/ProductComponent' {
  import React from 'react';
  const ProductComponent: React.FC;
  export default ProductComponent;
}
