export interface Product {
  product_name: string;
  brand: string;
  size: string;
  color: string;
  price: number | string;
  quantity: number;
  style_code: string | null;
  brand_key?: string;
  product_url: string;
  editor_note?: string;
  currency?: string | null;
  variant_id?: string;
  image_url: string;
  product_description: string;
  product_type: string;
  fabric?: string;
  fit?: string;
}
