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
import { deleteUploadthingFiles } from "@/lib/server/uploadthing";
import { useCategories } from "@/hooks/use-categories";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useSubCategories } from "@/hooks/use-subcategories";
import { Image, Product } from "@prisma/client";

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
  const { refetch, createCategory, updateCategory } = useSubCategories(
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
    setLoading(true);
    let updatedBody;
    if (mode !== "create" && initialData) {
      updatedBody = {
        ...body,
        imageId: initialData.image[0].id,
      };
    }
    console.log(updatedBody);
    try {
      mode === "create"
        ? createCategory(body)
        : initialData && updateCategory(initialData.id, updatedBody!);
      refetch();

      toast.success("Category created successfully");
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
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
                alt="Category Image"
                className="rounded-md"
              />
              {!loading ? (
                <button
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
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem value={cat.id} className="capitalize">
                      <div className="flex gap-2 items-center">
                        <img
                          src={cat.image[0].url}
                          alt={cat.image[0].key}
                          className="w-8 h-8 rounded-md"
                        />
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit">{mode === "create" ? "Create" : "Edit"}</Button>
      </form>
    </Form>
  );
};

export default ProductsForm;
