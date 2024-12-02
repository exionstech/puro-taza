import React, { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/utils";
import { ClientUploadedFileData } from "uploadthing/types";
import { toast } from "sonner";
import { LucideLoader, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { deleteUploadthingFiles } from "@/lib/server/uploadthing";
import { usePathname } from "next/navigation";
import { useCategories } from "@/hooks/use-categories";
import { useSubCategories } from "@/hooks/use-subcategories";
export const ProductsSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().min(1),
  stock: z.number().min(1),
  discount: z.number().min(0),
  categoryId: z.string(),
  subcategoryId: z.string(),
  image: z.object({
    url: z.string(),
    key: z.string(),
  }),
});

export interface InitialDataType {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number | null;
  categoryId: string;
  subcategoryId: string;
  createdAt: Date;
  updatedAt: Date;
  image: {
    id: string;
    url: string;
    key: string;
  }[];
}

interface Props {
  mode?: "create" | "edit";
  initialData?: InitialDataType;
  setOpen: (open: boolean) => void;
}

const ProductsForm = ({ mode = "create", initialData, setOpen }: Props) => {
  const [uploadedImage, setUploadedImage] = useState<{
    url: string;
    key: string;
  } | null>(initialData?.image[0] || null);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const { categories } = useCategories(pathname.split("/")[1]);
  const { subcategories, createCategory, updateCategory } = useSubCategories(
    pathname.split("/")[1]
  );

  const form = useForm<z.infer<typeof ProductsSchema>>({
    resolver: zodResolver(ProductsSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          price: initialData.price,
          stock: initialData.stock,
          discount: initialData.discount || 0,
          categoryId: initialData.categoryId,
          subcategoryId: initialData.subcategoryId,
          image: {
            url: initialData.image[0].url,
            key: initialData.image[0].key,
          },
        }
      : {
          name: "",
          description: "",
          price: 0,
          stock: 0,
          discount: 0,
          categoryId: "",
          subcategoryId: "",
          image: { url: "", key: "" },
        },
  });

  const handleImageUpload = async (res: ClientUploadedFileData<any>[]) => {
    console.log("Files: ", res);
    const image = res[0];

    setUploadedImage({
      url: image.appUrl,
      key: image.key,
    });
    form.setValue("image", {
      url: image.appUrl,
      key: image.key,
    });

    toast.success("Upload Completed");
  };

  const handleImageDelete = async () => {
    setLoading(true);
    try {
      await deleteUploadthingFiles([uploadedImage?.key as string]);
      setUploadedImage(null);
      form.setValue("image", { url: "", key: "" });
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (body: z.infer<typeof ProductsSchema>) => {
    //TODO: Implement the submit logic
    //Create API for products
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        {/* Image Upload */}
        <div className="flex flex-col w-full gap-2">
          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={handleImageUpload}
                    onUploadError={(error: Error) => {
                      console.log("Error: ", error);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {uploadedImage && (
            <div className="relative w-32 object-cover rounded-md group">
              <img
                src={uploadedImage.url}
                alt="Product Image"
                className="rounded-md"
              />
              {!loading ? (
                <button
                  type="button"
                  onClick={handleImageDelete}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <X size={16} />
                </button>
              ) : (
                <div className="absolute top-1 right-1 bg-primary p-1 text-white rounded-full">
                  <LucideLoader size={16} className="animate-spin" />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-row gap-10 w-full">
          <div className="w-full">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Price Field */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter price"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            {/* Stock Field */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter stock quantity"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Discount Field */}
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter discount percentage"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Subcategory Selection */}
            <FormField
              control={form.control}
              name="subcategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subcategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subcategories.map((subcategory) => (
                        <SelectItem value={subcategory.id} key={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-row">
          <Button type="submit" className="flex">
            Submit Product
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductsForm;
