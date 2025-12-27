import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { MenuItem, InsertMenuItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useMenu(category?: string) {
  return useQuery({
    queryKey: [api.menu.list.path, category],
    queryFn: async () => {
      const url = category 
        ? `${api.menu.list.path}?category=${category}` 
        : api.menu.list.path;
        
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch menu");
      return await res.json() as MenuItem[];
    },
  });
}

export function useAdminMenu() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createItem = useMutation({
    mutationFn: async (item: InsertMenuItem) => {
      const res = await fetch(api.menu.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create item");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.menu.list.path] });
      toast({ title: "Success", description: "Menu item created" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create item", variant: "destructive" });
    }
  });

  const deleteItem = useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.menu.delete.path, { id });
      const res = await fetch(url, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete item");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.menu.list.path] });
      toast({ title: "Deleted", description: "Menu item removed" });
    }
  });

  return { createItem, deleteItem };
}
