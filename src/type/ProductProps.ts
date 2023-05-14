export type ProductProps = {
    addToCart(props: ProductProps): void;
    id: number;
    name: string;
    price: number;
    color: string;
    imgUrl: string;
    view?: number;
    sold?: number;
};