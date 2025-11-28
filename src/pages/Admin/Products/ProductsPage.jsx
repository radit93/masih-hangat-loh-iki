import { useEffect, useState } from "react";
import { Trash2, Pencil, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "./Product.api";


export default function ProductsPage() {
  const navigate = useNavigate();   // <— ini wajib
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getProducts();
      setProducts(result);
    } catch (err) {
      console.error("Gagal fetch produk:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Data Produk</h1>

        <button
          onClick={() => navigate("/admin/products/add")}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
          <Plus size={18} /> Tambah Produk
        </button>
      </div>

      <div className="grid grid-cols-9 font-semibold border-b py-3 text-sm">
        <div>Nama</div>
        <div>Brand</div>
        <div>Kategori</div>
        <div>Performance</div>
        <div>Stok</div>
        <div>Grade</div>
        <div>Gambar1</div>
        <div>Gambar2</div>
        <div className="text-center">Aksi</div>
      </div>

      {products.map((p) => (
        <div key={p.id} className="grid grid-cols-9 border-b py-3 text-sm">
          <div>{p.nama}</div>
          <div>{p.brand}</div>
          <div>{p.kategori}</div>
          <div>{p.performance}</div>
          <div>{p.stok}</div>
          <div>{p.grade}</div>
          <div>{p.gambar1}</div>
          <div>{p.gambar2}</div>

          <div className="flex justify-center gap-3">
            <Pencil size={18} className="text-blue-600" />
            <button onClick={() => handleDelete(p.id)}>
              <Trash2 size={18} className="text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
