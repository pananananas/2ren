import * as React from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "~/components/ui/button";
import { type ItemCardProps } from "~/types/itemCardProps";
import { ItemDisplayContents } from "./item-display-contents";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";

export function ItemDisplay({
  item,
  itemImages,
  selectedItemId,
}: ItemCardProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const openItemDisplay = (itemId: number) => {
    void router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, itemId: itemId },
      },
      undefined,
      { shallow: true },
    );
  };
  const closeItemDisplay = () => {
    void router.push(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { shallow: true },
    );
  };

  const handleOpenChange = (newOpenState: boolean) => {
    setOpen(newOpenState);
    if (!newOpenState) {
      closeItemDisplay();
    }
  };
  React.useEffect(() => {
    if (selectedItemId === item.id) setOpen(true);
  }, [item.id, selectedItemId]);

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={handleOpenChange}
      >
        <DialogTrigger asChild>
          <Button
            className="w-full"
            size={"xsm"}
            onClick={() => openItemDisplay(item.id)}
          >
            More info
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <ItemDisplayContents
            key={item.id}
            item={item}
            itemImages={itemImages}
            selectedItemId={selectedItemId}
            isDesktop={isDesktop}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      onClose={() => closeItemDisplay()}
      preventScrollRestoration={true}

    >
      <DrawerTrigger asChild>
        <Button
          className="w-full"
          size={"xsm"}
          onClick={() => openItemDisplay(item.id)}
        >
          More info
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <ItemDisplayContents
          key={item.id}
          item={item}
          itemImages={itemImages}
          selectedItemId={selectedItemId}
          isDesktop={isDesktop}
        />
      </DrawerContent>
    </Drawer>
  );
}
