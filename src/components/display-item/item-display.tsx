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

  console.log("setOpen", setOpen);  

  const openItemDisplay = (itemId: number) => {
    // Update the current URL without navigating away
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

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
        // onCloseChange={() => closeItemDisplay()}
        // onClose={() => closeItemDisplay()}
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
        <DialogContent className="sm:max-w-[425px]">
          <ItemDisplayContents
            key={item.id}
            item={item}
            itemImages={itemImages}
            selectedItemId={selectedItemId}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      shouldScaleBackground={true}
      onClose={() => closeItemDisplay()}
      preventScrollRestoration={true}
      closeThreshold={20}
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
        />
      </DrawerContent>
    </Drawer>
  );
}
