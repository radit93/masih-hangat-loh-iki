export function mapProducts(raw) {
  return raw.map((p) => {
    const sorted = p.product_image?.sort((a, b) => a.order - b.order) || [];

    return {
      id: p.id,
      name: p.name,
      price: Number(p.price).toLocaleString("id-ID"),
      images: sorted.map(img => img.image_url)
    };
  });
}
