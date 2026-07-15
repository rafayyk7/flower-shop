import OrderConfirmationContent from "@/components/checkout/OrderConfirmationContent";

export const metadata = {
  title: "Order Confirmed — Petal & Bloom",
  description: "Your order has been placed successfully.",
};

interface OrderConfirmationPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { orderId } = await params;
  return <OrderConfirmationContent orderId={orderId} />;
}
