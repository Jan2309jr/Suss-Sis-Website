import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { InsertOrder, Order } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "./use-cart";

export function useOrders() {
  const { toast } = useToast();
  const { clearCart } = useCart();
  const queryClient = useQueryClient();

  const createOrder = useMutation({
    mutationFn: async (order: InsertOrder) => {
      const res = await fetch(api.orders.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to place order");
      return await res.json() as Order;
    },
    onSuccess: () => {
      clearCart();
      toast({ title: "Order Placed!", description: "We've received your delicious order." });
      queryClient.invalidateQueries({ queryKey: [api.orders.list.path] });
    },
    onError: (err) => {
      toast({ title: "Error", description: "Could not place order. Please try again.", variant: "destructive" });
    }
  });

  const { data: orders, isLoading } = useQuery({
    queryKey: [api.orders.list.path],
    queryFn: async () => {
      const res = await fetch(api.orders.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch orders");
      return await res.json() as Order[];
    }
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const url = buildUrl(api.orders.updateStatus.path, { id });
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update status");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.orders.list.path] });
      toast({ title: "Updated", description: "Order status updated" });
    }
  });

  return { createOrder, orders, isLoading, updateStatus };
}
