export interface Collection {
  id: string;
  name: string;
  slug: string;
  season: string | null;
  description_en: string | null;
  description_sq: string | null;
  cover_image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CollectionInput {
  name: string;
  slug: string;
  season?: string | null;
  description_en?: string | null;
  description_sq?: string | null;
  cover_image_url?: string | null;
  is_published?: boolean;
}

export interface DressImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
}

export interface Dress {
  id: string;
  collection_id: string | null;
  name: string;
  slug: string;
  description_en: string | null;
  description_sq: string | null;
  fabric: string | null;
  sizes: string[] | null;
  price: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  images: DressImage[];
  collection: Collection | null;
}

export interface DressInput {
  collection_id?: string | null;
  name: string;
  slug: string;
  description_en?: string | null;
  description_sq?: string | null;
  fabric?: string | null;
  sizes?: string[] | null;
  price?: number | null;
  is_featured?: boolean;
  is_published?: boolean;
}

export interface InquiryInput {
  dress_id?: string | null;
  customer_name: string;
  email: string;
  message?: string | null;
}

export interface Inquiry {
  id: string;
  dress_id: string | null;
  customer_name: string;
  email: string;
  message: string | null;
  is_read: boolean;
  created_at: string;
}
