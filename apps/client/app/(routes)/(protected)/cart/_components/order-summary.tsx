import { Button } from '@/components/ui/button';
import { Product } from '@/types';

interface OrderSummaryProps {
  items: (Product & { qty: number })[];
  orderSummary: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderSummary }) => {
  const { subtotal, tax, shipping, total } = orderSummary;

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Order Summary</h2>
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Estimated Tax</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Estimated Shipping & Handling</span>
        <span>₹{shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;