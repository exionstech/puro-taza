// app/api/[storeId]/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET Products
export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);

    // Pagination and filtering parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Optional filters
    const categoryId = searchParams.get("categoryId");
    const subcategoryId = searchParams.get("subcategoryId");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // Construct where clause
    const where: any = {};

    if (categoryId) where.categoryId = categoryId;
    if (subcategoryId) where.subcategoryId = subcategoryId;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Fetch products
    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
      include: {
        category: true,
        image: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Count total products for pagination
    const total = await prisma.product.count({ where });
    const afterDiscount = products.map((product) => ({
      ...product,
      discounted_price: product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price,
    }));

    return NextResponse.json({
      products: afterDiscount,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
      },
    });
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// POST Create Product
export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    // Get the request body
    const body = await req.json();

    // Destructure and validate required fields
    const {
      name,
      description,
      price,
      categoryId,
      stock,
      image,
      discount,
      subcategories,
    } = body;

    // Validate required fields
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
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

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock: stock || 0,
        discount: discount || 0,
        categoryId,
        subcategories: addSubcategories,
      },
      include: {
        image: true,
        category: true,
      },
    });

    // Create images if provided
    if (image && Array.isArray(image)) {
      await Promise.all(
        image
          .filter((img: { url: string; key: string }) => img.url && img.key)
          .map(async (img: { url: string; key: string }) => {
            await prisma.image.create({
              data: {
                url: img.url,
                key: img.key,
                productId: product.id,
              },
            });
          })
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
