export interface PaginationState {
  pageNumber: number;
  pageSize: number;
  sort: string;
  append: string;
}

export interface Blog {
  id: number;
  slug: string;
  title: string;
  content: string;
  published_at;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  small_image: Images[];
}

export interface Images{
  id: number;
  mime: number;
  file_name: string;
  url: string;
}
