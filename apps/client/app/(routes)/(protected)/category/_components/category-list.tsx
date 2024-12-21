import { useCategories } from "@/hooks/use-category";
import Image from "next/image";

interface CategoryListProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId: string | null;
}

export function CategoryList({ onSelectCategory, selectedCategoryId }: CategoryListProps) {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex flex-col gap-5">
      {categories.map((category) => (
        <div 
          key={category.id} 
          onClick={() => onSelectCategory(category.id)} 
          className={`w-full shadow-sm rounded-lg hover:bg-[#C7C7C745] flex h-[4rem] gap-5 px-1 py-1 items-center cursor-pointer ${
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
  );
}