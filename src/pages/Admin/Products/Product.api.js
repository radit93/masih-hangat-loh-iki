import supabase from "../../../lib/supabaseClient";

//
// GET PRODUCT (ambil produk lengkap)
//
export async function getProducts() {
  const { data, error } = await supabase
    .from("product")
    .select(`
      id,
      name,
      price,
      brand_id,
      grades,
      description,
      brands(name),
      product_categories(
        category_id,
        categories(name)
      ),
      product_image(order, image_url),
      stock_variants(size, stock)
    `)
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

//
// INSERT PRODUCT
//
export async function insertProduct(form, img1, img2, brandId, categoryIds) {
  // 1. Insert produk utama
  const { data: product, error: err1 } = await supabase
    .from("product")
    .insert([
      {
        name: form.nama,
        price: form.harga,
        brand_id: brandId,
        description: form.deskripsi,
        grades: form.grade
      }
    ])
    .select()
    .single();

  if (err1) throw err1;

  const productId = product.id;

  // 2. Insert gambar
  await supabase.from("product_image").insert([
    { product_id: productId, image_url: img1, order: 1 },
    { product_id: productId, image_url: img2, order: 2 }
  ]);

  // 3. Insert multi kategori
  if (categoryIds.length > 0) {
    const mapping = categoryIds.map((cat) => ({
      product_id: productId,
      category_id: cat
    }));

    await supabase.from("product_categories").insert(mapping);
  }

  // 4. Insert size + stok
  await supabase.from("stock_variants").insert([
    {
      product_id: productId,
      size: form.size,
      stock: form.stok
    }
  ]);

  return product;
}

//
// DELETE PRODUCT
//
export async function deleteProduct(id) {
  await supabase.from("product_image").delete().eq("product_id", id);
  await supabase.from("product_categories").delete().eq("product_id", id);
  await supabase.from("stock_variants").delete().eq("product_id", id);

  const { error } = await supabase.from("product").delete().eq("id", id);
  if (error) throw error;
}
