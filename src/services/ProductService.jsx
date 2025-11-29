import supabase from "../lib/supabaseClient";

export async function getLandingProducts() {
  const { data, error } = await supabase
    .from("product")
    .select(`
      id,
      name,
      price,
      product_image ( order, image_url )
    `)
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}
