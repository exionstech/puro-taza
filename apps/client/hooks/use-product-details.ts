import { useEffect, useState } from 'react';
import { Product } from '@/types';

const useProductDetails = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        setIsLoading(true);
        setError(null);

        // Add console log to see the full URL being fetched
        const url = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/products/${productId}`;
        console.log('Fetching from URL:', url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

        const data = await response.json();
        console.log('Received data:', data); // Add this log
        setProduct(data.product);
      } catch (err) {
        console.error('Error details:', err); // Add detailed error logging
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, isLoading, error };
};

export default useProductDetails;