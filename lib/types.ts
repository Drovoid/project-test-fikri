interface BlogData {
  map(arg0: (blog: BlogData) => React.JSX.Element): React.ReactNode;
  id: number;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  small_image: Image[];
  medium_image: Image[];
}

interface Links {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

interface Image {
  id: number;
  mime: string;
  file_name: string;
  url: string;
}
