"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return (prev = 1);
      } else {
        return prev - 1;
      }
    });
  };
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="relative-z 50 t-3xl mt-[-1.5rem] flex flex-auto flex-col rounded p-5">
      <div className="flex-auto">
        {/* restaurante */}
        <div className="flex items-center gap-1.5">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            height={16}
            width={16}
            className="rounded-full"
          />
          <p className="gap-2 text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>

        {/* preço e quantidade */}
        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {formatCurrency(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant={"outline"}
              className="h8 w-8 rounded-xl"
              onClick={decreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-5">{quantity}</p>
            <Button
              variant={"destructive"}
              className="h8 w-8 rounded-xl"
              onClick={increaseQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* Sobre */}
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Sobre</h4>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        {/* Ingredientes */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-1">
            <ChefHatIcon size={18} />
            <h4 className="font-semibold">Ingredientes</h4>
          </div>
          <p className="text-sm text-muted-foreground">{product.ingredients}</p>
        </div>
      </div>
      <Button className="mt-6 w-full rounded-full">Adicionar à sacola</Button>
    </div>
  );
};

export default ProductDetails;
