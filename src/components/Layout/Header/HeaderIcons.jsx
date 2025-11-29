// src/components/Header/HeaderIcons.jsx
import { Heart, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeaderIcons({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">

      <button className="bg-transparent border-none outline-none p-0 hover:bg-transparent" 
        onClick={() => navigate("/cart")}>
        <ShoppingCart strokeWidth={1.5} size={24} className="text-black" />
      </button>

      <button className="bg-transparent border-none outline-none p-0 hover:bg-transparent" 
        onClick={() => navigate("/wishlist")}>
        <Heart strokeWidth={1.5} size={24} className="text-black" />
      </button>

      {user ? (
        <button className="bg-transparent border-none outline-none p-0 hover:bg-transparent" 
          onClick={() => navigate("/dashboard")}>
          <User size={24} className="text-black" />
        </button>
      ) : (
        <button className="bg-transparent border-none outline-none p-0 hover:bg-transparent" 
          onClick={() => navigate("/login")}>
          <span className="text-black text-sm font-medium">Login</span>
        </button>
      )}
    </div>
  );
}
