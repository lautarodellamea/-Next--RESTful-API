import { ProductCard } from "@/products/components/ProductCard";
import { products } from "@/products/data/products";

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">

      {
        products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))
      }

    </div>
  );
}