import { Button } from '@/components/ui/button';
import { CartItem } from '@/types';

interface OrderSummaryProps {
  items: CartItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const shipping = subtotal * 0.05;
  const total = subtotal + tax + shipping;

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Order Summary</h2>
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Estimated Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Estimated Shipping & Handling</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button className="mt-4">Checkout</Button>
    </div>
  );
};

export default OrderSummary;