import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { insertProduct } from "./Product.api";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    brand: "",
    kategori: "",
    performance: "",
    stok: "",
    grade: "",
    gambar1: "",
    gambar2: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertProduct({
        ...form,
        stok: parseInt(form.stok, 10),
      });
      navigate("/admin/products");
    } catch (err) {
      console.log("Gagal menambahkan produk:", err.message);
    }
  };

  return (
    <div className="p-6">

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tambah Produk</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg border text-sm hover:bg-black hover:text-white transition"
        >
          Kembali
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 max-w-3xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <FormInput label="Nama Produk" name="nama" form={form} handle={handleChange} />
          <FormInput label="Brand" name="brand" form={form} handle={handleChange} />
          <FormInput label="Kategori" name="kategori" form={form} handle={handleChange} />
          <FormInput label="Performance" name="performance" form={form} handle={handleChange} />

          <FormInput
            label="Stok"
            name="stok"
            type="number"
            form={form}
            handle={handleChange}
          />

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Grade (BNIB, VNDS, 2ND)
            </label>
            <select
              name="grade"
              value={form.grade}
              onChange={handleChange}
              required
              className="w-full bg-[#FAF7F0] border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Pilih Grade</option>
              <option value="BNIB">BNIB</option>
              <option value="VNDS">VNDS</option>
              <option value="2ND">2ND</option>
            </select>
          </div>

          <FormInput label="URL Gambar 1" name="gambar1" form={form} handle={handleChange} />
          <FormInput label="URL Gambar 2" name="gambar2" form={form} handle={handleChange} />

        </div>

        <button
          type="submit"
          className="bg-black text-white w-full py-3 rounded-xl font-semibold hover:bg-black/80 transition"
        >
          Simpan Produk
        </button>
      </form>
    </div>
  );
}

function FormInput({ label, name, type = "text", form, handle }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-600">{label}</label>
      <input
        name={name}
        type={type}
        value={form[name]}
        onChange={handle}
        required
        className="w-full bg-[#FAF7F0] border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
