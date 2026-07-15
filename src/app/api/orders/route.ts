import { NextResponse } from "next/server";
import type { Order } from "@/types/order";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, shippingAddress, paymentDetails } = body;

    // Validate required fields
    if (!items || !items.length) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { error: "Shipping address is required" },
        { status: 400 }
      );
    }

    if (!paymentDetails) {
      return NextResponse.json(
        { error: "Payment details are required" },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => 
        sum + item.price * item.quantity,
      0
    );
    const shipping = subtotal >= 100 ? 0 : 12.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // Generate order number
    const orderNumber = `PB-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    // In production, you would:
    // 1. Process payment with Stripe/PayPal
    // 2. Save order to database
    // 3. Send confirmation email
    // 4. Update inventory

    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber,
      items,
      shippingAddress,
      subtotal,
      shipping,
      tax,
      total,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    };

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}
