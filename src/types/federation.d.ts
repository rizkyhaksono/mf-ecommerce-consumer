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

declare module 'paymentProvider/ShoppingCart' {
  import React from 'react';

  interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
  }

  interface ShoppingCartProps {
    items: CartItem[];
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemoveItem: (id: string) => void;
    onCheckout: () => void;
  }

  const ShoppingCart: React.FC<ShoppingCartProps>;
  export default ShoppingCart;
}

declare module 'paymentProvider/CheckoutForm' {
  import React from 'react';

  interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
  }

  interface ShippingInfo {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }

  interface PaymentInfo {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  }

  interface CheckoutFormProps {
    items: CartItem[];
    onComplete: (shippingInfo: ShippingInfo, paymentInfo: PaymentInfo) => void;
    onBack: () => void;
  }

  const CheckoutForm: React.FC<CheckoutFormProps>;
  export default CheckoutForm;
}

declare module 'productProvider/ProductCard' {
  import React from 'react';

  interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    rating: number;
    stock: number;
    featured?: boolean;
  }

  interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onViewDetails?: (product: Product) => void;
  }

  const ProductCard: React.FC<ProductCardProps>;
  export default ProductCard;
}

declare module 'productProvider/ProductGrid' {
  import React from 'react';

  interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    rating: number;
    stock: number;
    featured?: boolean;
  }

  interface ProductGridProps {
    products: Product[];
    onAddToCart: (product: Product, quantity?: number) => void;
    onViewDetails?: (product: Product) => void;
  }

  const ProductGrid: React.FC<ProductGridProps>;
  export default ProductGrid;
}

declare module 'productProvider/ProductDetails' {
  import React from 'react';

  interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    rating: number;
    stock: number;
    featured?: boolean;
  }

  interface ProductDetailsProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
    onClose: () => void;
  }

  const ProductDetails: React.FC<ProductDetailsProps>;
  export default ProductDetails;
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
