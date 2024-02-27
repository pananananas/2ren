import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

export function ItemDeleteAlert({ itemId }: { itemId: number }) {
  const ctx = api.useUtils();

  const { mutate: deleteItem } = api.items.delete.useMutation({
    onSuccess: () => {
      void ctx.items.getAll.invalidate();
      toast("Item deleted.", {
        description: "The item has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast("Failed to delete item.", {
        description: error.message,
      });
    },
  });

  const handleDelete = () => {
    deleteItem(itemId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-red-500 hover:text-red-500">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this item
            and all of its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import { useState } from "react";

export function ItemDeleteAlertIcon({ itemId }: { itemId: number }) {
  const ctx = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteItem } = api.items.delete.useMutation({
    onSuccess: () => {
      void ctx.items.getAll.invalidate();
      toast("Item deleted.", {
        description: "The item has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast("Failed to delete item.", {
        description: error.message,
      });
    },
  });

  const handleDelete = () => {
    deleteItem(itemId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} className="aspect-square p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 stroke-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this item
            and all of its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ItemsDeleteAlert({ itemIds, resetSelection }: { itemIds: number[], resetSelection: () => void }) {
  const ctx = api.useUtils();

  const { mutate: deleteItem } = api.items.deleteMultiple.useMutation({
    onSuccess: () => {
      void ctx.items.getAll.invalidate();
      toast("Item deleted.", {
        description: "The item has been successfully deleted.",
      });
      resetSelection();
    },
    onError: (error) => {
      toast("Failed to delete item.", {
        description: error.message,
      });
    },
  });

  const handleDelete = () => {
    deleteItem(itemIds);
  };

  const numberOfItems = itemIds.length;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-red-500 hover:text-red-500">
          Delete selected
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you want to delete {numberOfItems} items?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this item
            and all of its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
