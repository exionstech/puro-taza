import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET Single Product
export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    // Fetch single product
    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        category: true,
        image: true,
      },
    });

    // Check if product exists
    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }
    const afterDiscount = {
      ...product,
      discounted_price: product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price,
    };

    return NextResponse.json(afterDiscount);
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// PATCH Update Product
export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    // Get the request body
    const body = await req.json();

    // Destructure fields
    const {
      name,
      description,
      discount,
      price,
      stock,
      categoryId,
      subcategories,
      image,
    } = body;

    // Validate product exists
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    if (!existingProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const subdata = await prisma.subcategory.findMany({
      include: {
        image: true,
      },
    });

    const addSubcategories = subcategories?.map(
      (subcategoryId: string) =>
        subdata.find((sub) => sub.id === subcategoryId) || {}
    );

    // Update product
    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
        discount,
        subcategories: addSubcategories,
        image: image && {
          deleteMany: {},
          createMany: {
            data: image.map((image: { url: string; key: string }) => image),
          },
        },
      },
      include: {
        image: true,
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// DELETE Product
export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    // Validate product exists
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    if (!existingProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // Delete product
    const product = await prisma.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
