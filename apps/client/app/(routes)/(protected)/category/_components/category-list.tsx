import { useCategories } from "@/hooks/use-category";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryListProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId: string | null;
}

export function CategoryList({ onSelectCategory, selectedCategoryId }: CategoryListProps) {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* Mobile dropdown */}
      <div className="md:hidden w-full">
        <Select
          value={selectedCategoryId || ""}
          onValueChange={onSelectCategory}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 relative overflow-hidden rounded-lg">
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

      {/* Desktop list - unchanged */}
      <div className="w-full md:flex flex-col gap-5 hidden">
        {categories.map((category) => (
          <div 
            key={category.id} 
            onClick={() => onSelectCategory(category.id)} 
            className={`w-full border border-neutral-100 rounded-lg hover:bg-[#C7C7C745] flex h-[4rem] gap-5 px-1 py-1 items-center cursor-pointer ${
              selectedCategoryId === category.id ? 'bg-[#C7C7C745]' : ''
            }`}
          >
            <div className="overflow-y-hidden">
              <Image 
                src={category.image?.[0]?.url} 
                alt={category.name} 
                width={65} 
                height={65} 
                className="shrink-0 rounded-lg"
              />
            </div>
            <div className="text-start">
              <span className="text-lg font-semibold">{category.name}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}