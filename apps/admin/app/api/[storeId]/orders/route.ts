// app/api/orders/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ProductOrderInput {
  id: string;
  subcategory?: string;
  quantity: string;
}

interface OrderInput {
  products: ProductOrderInput[];
  userId: string;
  addressId: string;
}

// GET all orders
export async function GET(req: Request) {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        address: true,
        client: true
      }
    });

    return NextResponse.json({ orders: orders });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST new order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderData: OrderInput = body.orders;

    // Fetch all products in one query
    const productIds = orderData.products.map(product => product.id);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    });

    // Create a map for quick product lookup
    const productMap = new Map(products.map(product => [product.id, product]));

    // Calculate total amount and prepare products JSON
    let totalAmount = 0;
    const processedProducts = orderData.products.map(orderProduct => {
      const product = productMap.get(orderProduct.id);
      if (!product) {
        throw new Error(`Product not found: ${orderProduct.id}`);
      }

      const quantity = parseInt(orderProduct.quantity);
      const itemTotal = product.price * quantity;
      totalAmount += itemTotal;

      return {
        id: orderProduct.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        subtotal: itemTotal,
        subcategory: orderProduct.subcategory || null
      };
    });

    // Create the order
    const order = await prisma.orders.create({
      data: {
        amount: totalAmount,
        products: processedProducts,
        clientId: orderData.userId,
        addressId: orderData.addressId
      },
      include: {
        address: true,
        client: true
      }
    });

    return NextResponse.json({order: order.id}, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}