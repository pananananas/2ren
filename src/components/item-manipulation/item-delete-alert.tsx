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
          <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
