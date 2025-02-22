"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import CartSheet from "../../components/cart-sheets";
import { CartContext } from "../../contexts/cart";

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
  const { toggleCart, addProduct } = useContext(CartContext);
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
  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity, //mesmo que quantity: quantity(state)
    });
    toggleCart();
  };
  return (
    <>
      {" "}
      <div className="relative-z 50 t-3xl mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded p-5">
        <div className="flex-auto overflow-hidden">
          {/* RESTAURANTE */}
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

          {/* PREÇO E QUANTIDADE */}
          <h2 className="mt-3 text-xl font-semibold">{product.name}</h2>

          <div className="mb-3 flex items-center justify-between">
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

          <ScrollArea className="max-h-[350px] overflow-y-auto">
            {/* SOBRE */}
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold">Sobre</h4>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* INGREDIENTES */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-1">
                <ChefHatIcon size={18} />
                <h4 className="font-semibold">Ingredientes</h4>
              </div>
              <ul className="text-muted-fo list-disc px-5 text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                  <li className="my-1" key={ingredient}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </div>
        <Button className="mt-4 w-full rounded-full" onClick={handleAddToCart}>
          Adicionar à sacola
        </Button>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetails;
