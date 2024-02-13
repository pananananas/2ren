import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { string } from "zod";
import { useState } from "react";
import { api } from "~/utils/api";

const CreateItem = () => {
  const [name, setName] = useState("");
  const [material, setMaterial] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [display, setDisplay] = useState(false);
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");

const ctx = api.useUtils();

  const { mutate, isLoading: isCreating } = api.items.create.useMutation({
    onSuccess: () => {
      void ctx.items.getAll.invalidate();
    //   setName("");
    //   setMaterial("");
    //   setCategory("");
    //   setDescription("");
    //   setDisplay(false);
    //   setPrice("");
    //   setColor("");
    //   setCurrency("");
    //   setAmount("");

    }
  });

  const handleSave = () => {
    mutate({
      name,
      material,
      category,
      description,
      display,
      price,
      color,
      currency,
      amount,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Item</Button>
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add new item</DialogTitle>
          <DialogDescription>You can add new items here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-1">
          <div className=" items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              name=""
              id="name"
              placeholder="Enter your title"
              className="text-grey-200 col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" items-center gap-4">
            <Label htmlFor="material" className="text-left">
              Material
            </Label>
            <Input
              name=""
              id="material"
              placeholder="Enter your material type"
              className="text-grey-200 col-span-3"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            />
          </div>
          <div className=" items-center gap-4">
            <Label htmlFor="category" className="text-left">
              Category
            </Label>
            <Input
              name=""
              id="category"
              placeholder="Choose category"
              className="text-grey-200 col-span-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Description
            </Label>
            <Textarea
              placeholder="Description of your material"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="display-item"     // not working TODO: fix
              // checked={display}
              // onChange={(e) => setDisplay(e.target.checked)}
            />
            <Label htmlFor="display-item">Display item on home page</Label>
          </div>
        </div>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { CreateItem };
