import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight line-clamp-3",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

interface CardBlogProps {
  href: string;
  src: string;
  alt: string;
  date: string;
  title: string;
}

export const CardBlog: React.FC<CardBlogProps> = ({
  href,
  src,
  alt,
  date,
  title,
}) => {
  return (
    <Link
      href={href}
      className="border bg-card text-card-foreground shadow-2xl mx-auto rounded-lg"
    >
      <div className="w-full">
        <AspectRatio ratio={4 / 3} className="">
          <Image
            width={384}
            height={300}
            src={src}
            alt={alt}
            loading="lazy"
            className="rounded-t-lg object-cover h-full"
          />
        </AspectRatio>
      </div>
      <CardHeader>
        <CardDescription>{date}</CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Link>
  );
};

export const CardLoading = () => {
  return (
    <Link
      href=""
      className="border bg-card text-card-foreground shadow-2xl mx-auto rounded-lg w-full"
    >
      <div className="w-full">
        <AspectRatio ratio={4 / 3} className="">
          <Skeleton className="rounded-t-lg object-cover h-full w-full" />
        </AspectRatio>
      </div>
      <CardHeader>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-28 w-full" />
      </CardHeader>
    </Link>
  );
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
