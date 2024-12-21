import { useCategories } from "@/hooks/use-category";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MobileCategoryProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId: string | null;
}

export function MobileCategory({ onSelectCategory, selectedCategoryId }: MobileCategoryProps) {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) return <div className="md:hidden">Loading...</div>;
  if (error) return null;

  return (
      <div className="md:hidden w-full">
        <Select
          value={selectedCategoryId || ""}
          onValueChange={onSelectCategory}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" className="text-xl"/>
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 relative overflow-hidden rounded-lg">
                    <Image
                      src={category.image?.[0]?.url}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>{category.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
  );
}