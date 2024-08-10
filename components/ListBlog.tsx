"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardBlog, CardLoading } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
} from "@/components/ui/pagination";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Blog, PaginationState } from "@/types";

const ListBlog = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [{ pageNumber, pageSize, sort, append }, setPagination] =
    useState<PaginationState>({
      pageNumber: 1,
      pageSize: 10,
      sort: "-published_at",
      append: "small_image",
    });
  const [paginationItems, setPaginationItems] = useState<number[]>([
    1, 2, 3, 4, 5,
  ]);
  const [request, setRequest] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const checkImage = () => {
    const isImageAppend =
      searchParams.get("append[]") == "small_image" ? true : false;
    return isImageAppend;
  };

  const apiUrl = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${pageNumber}&page[size]=${pageSize}&append[]=${append}&sort=${sort}`;
  const { data, refetch } = useQuery({
    queryFn: async () => {
      const response = await axios
        .get(apiUrl, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          timeout: 10000,
        })
        .then((res) => {
          setRequest(res.data.data);
          return res.data;
        });

      return response as unknown as any;
    },
    queryKey: ["blog"],
  });

  const totalBlogs: number = data?.meta.total || 0;
  const totalPages: number = Math.ceil(totalBlogs / pageSize);

  useEffect(() => {
    setPagination({
      pageNumber: pageNumber,
      pageSize: pageSize,
      sort: sort,
      append: append,
    });
    setIsLoading(true);
    refetch();
    setIsLoading(false);

    if (totalPages <= 5) {
      setPaginationItems(
        Array.from(Array(totalPages).keys()).map((n) => n + 1)
      );
    } else if (pageNumber === 1) {
      setPaginationItems([1, 2, 3, 4, 5]);
    } else if (pageNumber === 2) {
      setPaginationItems([1, 2, 3, 4, 5]);
    } else if (pageNumber === totalPages - 1) {
      setPaginationItems([
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]);
    } else if (pageNumber === totalPages) {
      setPaginationItems([
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]);
    } else {
      setPaginationItems([
        pageNumber - 2,
        pageNumber - 1,
        pageNumber,
        pageNumber + 1,
        pageNumber + 2,
      ]);
    }
  }, [pageNumber, pageSize, sort, append, refetch, totalPages]);

  return (
    <div className="mx-36 mt-20">
      <div className="flex flex-row justify-between">
        <div className="">
          Showing {(pageNumber - 1) * pageSize + 1}-
          {Math.min(pageNumber * pageSize, totalBlogs)} of {totalBlogs}
        </div>
        <div className="flex space-x-5">
          <div className="flex align-middle">
            <div className="mr-4 my-auto">Sorts per page</div>
            <Select
              onValueChange={(e) => {
                setPagination({
                  pageNumber: pageNumber,
                  pageSize: parseInt(e),
                  sort: sort,
                  append: append,
                });
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex align-middle">
            <div className="mr-4 my-auto">Sorts by</div>
            <Select
              onValueChange={(e) => {
                setPagination({
                  pageNumber: pageNumber,
                  pageSize: pageSize,
                  sort: e,
                  append: append,
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={sort == "published_at" ? "Oldest" : "Newest"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-published_at">Newest</SelectItem>
                <SelectItem value="published_at">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 mt-10 gap-8">
        {isLoading
          ? Array.from({ length: 10 }, (_, index) => (
              <CardLoading key={index} />
            ))
          : request.map((blog: Blog) => (
              <CardBlog
                key={blog.id}
                href={blog.slug}
                src={blog.small_image[0]?.url || ""}
                alt={blog.small_image[0]?.file_name || ""}
                date={blog.created_at.split(" ")[0]}
                title={blog.title}
              />
            ))}
      </div>
      <div className="my-20">
        {isLoading ? (
          <div> </div>
        ) : (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst
                  href={"#"}
                  onClick={(e) => {
                    e.preventDefault();
                    setPagination({
                      pageNumber: 1,
                      pageSize: pageSize,
                      sort: sort,
                      append: append,
                    });
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  href={"#"}
                  onClick={(e) => {
                    e.preventDefault();
                    if (pageNumber <= 1) {
                      return;
                    }
                    setPagination({
                      pageNumber: pageNumber - 1,
                      pageSize: pageSize,
                      sort: sort,
                      append: append,
                    });
                  }}
                />
              </PaginationItem>
              {paginationItems.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={"#"}
                    onClick={(e) => {
                      e.preventDefault();
                      setPagination({
                        pageNumber: page,
                        pageSize: pageSize,
                        sort: sort,
                        append: append,
                      });
                    }}
                    isActive={page === pageNumber}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href={"#"}
                  onClick={(e) => {
                    e.preventDefault();
                    if (pageNumber >= totalPages) {
                      return;
                    }
                    setPagination({
                      pageNumber: pageNumber + 1,
                      pageSize: pageSize,
                      sort: sort,
                      append: append,
                    });
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  href={"#"}
                  onClick={(e) => {
                    e.preventDefault();
                    setPagination({
                      pageNumber: totalPages,
                      pageSize: pageSize,
                      sort: sort,
                      append: append,
                    });
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default ListBlog;
