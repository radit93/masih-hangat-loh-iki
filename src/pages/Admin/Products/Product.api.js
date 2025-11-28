import supabase from "../../../lib/supabaseClient";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function insertProduct(payload) {
  const { error } = await supabase
    .from("products")
    .insert(payload);

  if (error) throw error;
}

export async function updateProduct(id, payload) {
  const { error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id);

  if (error) throw error;
}