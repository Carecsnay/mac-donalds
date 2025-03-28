"use client";

import { OrderStatus, Prisma } from "@prisma/client";
import clsx from "clsx";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";
import { dataFormat } from "@/helpers/format-date";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}

const getStatusLabel = (status: OrderStatus) => {
  if (status === "FINISHED") return "Finalizado";
  if (status === "IN_PREPARATION") return "Em preparo";
  if (status === "PENDING") return "Pendente";
  if (status === "PAYMENT_CONFIRMED") return "Pagamento confirmado";
  if (status === "PAYMENT_FAILED") return "Pagamento cancelado";
  else return "";
};

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();
  return (
    <div className="space-y-6 p-6">
      <Button
        size={"icon"}
        variant={"secondary"}
        className="rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus pedidos</h2>
      </div>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              {/* renderização condicional */}
              <div
                className={clsx(
                  "w-fit rounded-full px-2 py-1 text-xs font-semibold",
                  {
                    "bg-green-400 text-white":
                      order.status === OrderStatus.FINISHED ||
                      order.status === OrderStatus.PAYMENT_CONFIRMED,
                    "bg-red-400 text-white":
                      order.status === OrderStatus.PENDING ||
                      order.status === OrderStatus.PAYMENT_FAILED,
                    "bg-yellow-400 text-white":
                      order.status === OrderStatus.IN_PREPARATION,
                  },
                )}
              >
                {getStatusLabel(order.status)}
              </div>

              <p className="text-[12px] font-semibold">
                Pedido criado em: {dataFormat(order.createdAt)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  fill
                  className="rounded-sm"
                />
              </div>
              <p className="text-sm font-semibold">{order.restaurant.name}</p>
            </div>

            <Separator />
            <div className="space-y-2">
              {order.orderProducts.map((orderProduct) => (
                <div key={orderProduct.id} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                    {orderProduct.quantity}
                  </div>
                  <p className="text-sm">{orderProduct.product.name}</p>
                </div>
              ))}
            </div>
            <Separator />
            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
