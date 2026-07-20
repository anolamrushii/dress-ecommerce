import type {
  Collection,
  CollectionInput,
  Dress,
  DressImage,
  DressInput,
  Inquiry,
  InquiryInput,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string | null;
  isFormData?: boolean;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, token, isFormData = false } = options;

  const headers: HeadersInit = {};
  if (!isFormData && body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : isFormData ? (body as FormData) : JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const data = await res.json();
      detail = data.detail ?? detail;
    } catch {
      // response had no JSON body
    }
    throw new ApiError(detail, res.status);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

// ---------------------------------------------------------------------------
// Public: collections
// ---------------------------------------------------------------------------
export function getCollections(token?: string | null): Promise<Collection[]> {
  return request<Collection[]>("/collections", { token });
}

export function getCollection(slug: string, token?: string | null): Promise<Collection> {
  return request<Collection>(`/collections/${slug}`, { token });
}

// ---------------------------------------------------------------------------
// Admin: collections
// ---------------------------------------------------------------------------
export function createCollection(data: CollectionInput, token: string): Promise<Collection> {
  return request<Collection>("/collections", { method: "POST", body: data, token });
}

export function updateCollection(
  id: string,
  data: Partial<CollectionInput>,
  token: string,
): Promise<Collection> {
  return request<Collection>(`/collections/${id}`, { method: "PUT", body: data, token });
}

export function deleteCollection(id: string, token: string): Promise<void> {
  return request<void>(`/collections/${id}`, { method: "DELETE", token });
}

// ---------------------------------------------------------------------------
// Public: dresses
// ---------------------------------------------------------------------------
export function getDresses(token?: string | null): Promise<Dress[]> {
  return request<Dress[]>("/dresses", { token });
}

export function getDress(slug: string, token?: string | null): Promise<Dress> {
  return request<Dress>(`/dresses/${slug}`, { token });
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
export function login(email: string, password: string): Promise<{ access_token: string; token_type: string }> {
  return request("/auth/login", { method: "POST", body: { email, password } });
}

// ---------------------------------------------------------------------------
// Admin: dresses
// ---------------------------------------------------------------------------
export function createDress(data: DressInput, token: string): Promise<Dress> {
  return request<Dress>("/dresses", { method: "POST", body: data, token });
}

export function updateDress(id: string, data: Partial<DressInput>, token: string): Promise<Dress> {
  return request<Dress>(`/dresses/${id}`, { method: "PUT", body: data, token });
}

export function deleteDress(id: string, token: string): Promise<void> {
  return request<void>(`/dresses/${id}`, { method: "DELETE", token });
}

export function uploadDressImage(dressId: string, file: File, token: string): Promise<DressImage> {
  const formData = new FormData();
  formData.append("file", file);
  return request<DressImage>(`/dresses/${dressId}/images`, {
    method: "POST",
    body: formData,
    token,
    isFormData: true,
  });
}

// ---------------------------------------------------------------------------
// Public: inquiries
// ---------------------------------------------------------------------------
export function submitInquiry(data: InquiryInput): Promise<Inquiry> {
  return request<Inquiry>("/inquiries", { method: "POST", body: data });
}
