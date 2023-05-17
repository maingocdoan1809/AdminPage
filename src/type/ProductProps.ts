
export type ProductProps = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  variants: {
    color: string;
    sizes: { size: string; quantity: number }[];
  }[];
  selectedVariant?: {
    color: string;
    size: string | { size: string; quantity: number }[];
  };
  imgUrl: string;
  view?: number;
  sold?: number;

  onAddToCart?: (product: ProductProps) => void;
};