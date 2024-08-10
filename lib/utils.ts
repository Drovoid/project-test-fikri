import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "next/navigation";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateEndPage(totalPages: number, currentPage: number) {
  let visiblePages = 5;
  let endPage = totalPages;

  if (totalPages > visiblePages) {
    const half = Math.floor(visiblePages / 2);

    if (currentPage > half) {
      endPage = currentPage + half - 1;
      if (endPage > totalPages) {
        endPage = totalPages;
      }
    } else {
      endPage = visiblePages;
    }
  }

  return endPage;
}

export function getParamsFromUrl(url: string) {
  url = url.split("?")[1];
  const keyValuePairs = url.split("&");

  const params: { [key: string]: string } = {};
  keyValuePairs.forEach((pair) => {
    const [key, value] = pair.split("="); // Mendapatkan kunci dan nilainya
    params[key] = decodeURIComponent(value); // Menambahkan ke objek params
  });

  return params;
}

export function generateNewUrl(link: string, urlApi: string): string {
  const paramsString: string = link.split('?').pop() || ''; // Mengambil bagian setelah tanda '?'
  const keyValuePairs: string[] = paramsString.split('&'); // Memisahkan setiap pasangan kunci-nilai

  const params: { [key: string]: string } = {};
  keyValuePairs.forEach(pair => {
      const [key, value] = pair.split('='); // Mendapatkan kunci dan nilainya
      params[key] = decodeURIComponent(value); // Menambahkan ke objek params
  });

  // Modifikasi URL API dengan nilai-nilai dari link
  const urlSearchParams = new URLSearchParams(urlApi.split('?').pop() || '');
  for (const key in params) {
      if (params.hasOwnProperty(key)) {
          urlSearchParams.set(key, params[key]);
      }
  }

  const apiUrl: string = urlApi.split('?')[0]; // Ambil bagian sebelum tanda '?'
  const newUrl: string = `${apiUrl}?${urlSearchParams.toString()}`; // Gabungkan kembali URL dengan parameter baru

  return newUrl;
}
