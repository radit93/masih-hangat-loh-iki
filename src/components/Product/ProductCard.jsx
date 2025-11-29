import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(product.images[0]);

  return (
    <div
      className="cursor-pointer flex flex-col items-center text-center"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="w-[180px] h-[180px] flex items-center justify-center">
        <img
          src={activeImage}
          alt={product.name}
          className="object-contain max-h-[180px]"
          onMouseEnter={() =>
            product.images[1] && setActiveImage(product.images[1])
          }
          onMouseLeave={() => setActiveImage(product.images[0])}
        />
      </div>

      <h3 className="mt-4 text-[13px] font-semibold text-gray-900 leading-tight max-w-[180px]">
        {product.name}
      </h3>

      <div className="flex items-center justify-center gap-2 mt-2">
        {product.oldPrice && (
          <p className="text-xs line-through text-gray-400">
            Rp {product.oldPrice}
          </p>
        )}
        <p className="text-sm font-semibold text-gray-900">
          Rp {product.price}
        </p>
      </div>
    </div>
  );
}
