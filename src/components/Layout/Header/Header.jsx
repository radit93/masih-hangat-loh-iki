// src/components/Header/Header.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/authContext";

import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import HeaderIcons from "./HeaderIcons";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Mencari:", query);
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-md bg-[#FAF7F0]">
      <div className="flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <div
          className="font-bold text-xl cursor-pointer relative -top-1"
          onClick={() => navigate("/")}
        >
          Kavva
        </div>

        {/* Navigation */}
        <HeaderNav />

        {/* Search + Icons */}
        <div className="flex items-center gap-4">
          <HeaderSearch
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
          />

          <HeaderIcons user={user} />
        </div>
      </div>
    </header>
  );
}
