import { IProduct } from "interface/product.interface";
import { useCallback, useRef, useState } from "react";

// useInfiniteScroll.ts
export interface UseInfiniteScroll {
  isLoading: boolean;
  loadMoreCallback: (el: HTMLDivElement) => void;
  hasDynamicProducts: boolean;
  dynamicProducts: IProduct[];
  isLastPage: boolean;
}

export const useInfiniteScroll = (products: IProduct[]): UseInfiniteScroll => {
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(1);
  const [hasDynamicProducts, setHasDynamicProducts] = useState(false);
  const [dynamicProducts, setDynamicProducts] = useState<IProduct[]>(products);
  const [isLastPage, setIsLastPage] = useState(false);
  const observerRef = useRef<IntersectionObserver>();
  const loadMoreTimeout: NodeJS.Timeout = setTimeout(() => null, 500);
  const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(loadMoreTimeout);

  const handleObserver = useCallback(
    (entries: any[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setIsLoading(true);
        clearTimeout(loadMoreTimeoutRef.current);

        // this timeout debounces the intersection events
        loadMoreTimeoutRef.current = setTimeout(() => {
          /* 
            axios.get(`/api/products/${skip}`).then((resp) => {
              setSkip(skip + 10);
              const newProducts = resp?.data["posts"];
    
              if (newProducts?.length) {
                const newDynamicProducts = [...dynamicProducts, ...newProducts];
                setDynamicProducts(newDynamicProducts);
                setIsLastPage(newDynamicProducts?.length === resp?.data["total"]);
                setHasDynamicProducts(true);
                setIsLoading(false);
              }
            }); */
        }, 500);
      }
    },
    [loadMoreTimeoutRef, setIsLoading, skip, dynamicProducts]
  );

  const loadMoreCallback = useCallback(
    (el: HTMLDivElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      const option: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };
      observerRef.current = new IntersectionObserver(handleObserver, option);

      if (el) observerRef.current.observe(el);
    },
    [handleObserver, isLoading]
  );

  return {
    isLoading,
    loadMoreCallback,
    hasDynamicProducts: hasDynamicProducts,
    dynamicProducts: dynamicProducts,
    isLastPage,
  };
};
