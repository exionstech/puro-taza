// app/api/orders/[orderId]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ParamsType {
    params: {
        orderId: string;
    }
}

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

// GET single order
export async function GET(req: Request, { params }: ParamsType) {
    try {
        const order = await prisma.orders.findUnique({
            where: {
                id: params.orderId
            },
            include: {
                address: true,
                client: true
            }
        });

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error('Failed to fetch order:', error);
        return NextResponse.json(
            { error: 'Failed to fetch order' },
            { status: 500 }
        );
    }
}

// PATCH update order
export async function PATCH(req: Request, { params }: ParamsType) {
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

        // Update the order
        const order = await prisma.orders.update({
            where: {
                id: params.orderId
            },
            data: {
                amount: totalAmount,
                products: processedProducts,
                addressId: orderData.addressId
            },
            include: {
                address: true,
                client: true
            }
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error('Failed to update order:', error);
        return NextResponse.json(
            { error: 'Failed to update order' },
            { status: 500 }
        );
    }
}

// DELETE order
export async function DELETE(req: Request, { params }: ParamsType) {
    try {
        await prisma.orders.delete({
            where: {
                id: params.orderId
            }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('Failed to delete order:', error);
        return NextResponse.json(
            { error: 'Failed to delete order' },
            { status: 500 }
        );
    }
}