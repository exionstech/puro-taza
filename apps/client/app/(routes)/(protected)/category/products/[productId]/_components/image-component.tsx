import React, { useState } from 'react';
import Image from 'next/image';

interface ProductImage {
  url: string;
  id?: string;
  alt?: string;
}

interface ProductImageComponentProps {
  images?: ProductImage[];
  productName: string;
}

const ProductImageComponent: React.FC<ProductImageComponentProps> = ({ 
  images = [], 
  productName 
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const hasMultipleImages: boolean = images && images.length > 1;

  const handleDotClick = (index: number): void => {
    setSelectedIndex(index);
  };

  return (
    <div className="relative w-[500px]">
      <div className="aspect-[4/3] relative rounded-xl p-4">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={images?.[selectedIndex]?.url || "/placeholder.png"}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            fill
            className="object-contain p-2"
            sizes="(max-width: 500px) 100vw, 500px"
            priority
          />
        </div>
      </div>
      
      {hasMultipleImages && (
        <div className="absolute -bottom-8 left-0 right-0 flex justify-center items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                selectedIndex === index 
                  ? 'bg-violet w-4' 
                  : 'bg-violet/70 hover:bg-gray-600'
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageComponent;