import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getLandingProducts } from "../../services/ProductService";
import { mapProducts } from "../../data/ProductMapper";

export default function ProductCarousel() {
  const PAGE_SIZE = 5;

  const [products, setProducts] = useState([]);
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const raw = await getLandingProducts();
        const clean = mapProducts(raw);
        setProducts(clean);
      } catch (e) {
        console.log("Gagal fetch:", e.message);
      }
    }
    load();
  }, []);

  const nextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const start = page * PAGE_SIZE;
  const visibleProducts = products.slice(start, start + PAGE_SIZE);

  return (
    <div className="relative w-full px-10 mb-12">

      {page > 0 && (
        <button
          onClick={prevPage}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
        >
          <ChevronLeft size={32} strokeWidth={2} />
        </button>
      )}

      <div className="flex justify-between transition-all duration-500">
        {visibleProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      {page < totalPages - 1 && (
        <button
          onClick={nextPage}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
        >
          <ChevronRight size={28} strokeWidth={2} />
        </button>
      )}

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <div
            key={idx}
            onClick={() => setPage(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              idx === page ? "bg-black" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
