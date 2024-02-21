import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

export function ClearUntrackedUptFiles() {
  const { mutate: clearUntrackedUptFiles } =
    api.itemImages.clearUntrackedUptFiles.useMutation({
      onSuccess: (data) => {
        if (data.deletedCount === 0) {
          toast("No untracked files to clear.");
          return;
        }

        toast(`Deleted ${data.deletedCount} untracked files.`, {
          description: "The untracked files have been successfully cleared.",
        });
      },
      onError: (error) => {
        toast("Failed to clear untracked files.", {
          description: error.message,
        });
      },
    });

  return (
    <Button
      variant="outline"
      onClick={() => {
        clearUntrackedUptFiles();
      }}
    >
      Clear Untracked Images
    </Button>
  );
}
