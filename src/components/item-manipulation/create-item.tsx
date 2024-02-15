import React from "react";
import { useState } from "react";
import { api } from "~/utils/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CreateItem = () => {
  const [name, setName] = useState("");
  const [material, setMaterial] = useState("");
  const [category] = useState("");
  const [description, setDescription] = useState("");
  const [display] = useState(false);
  const [price] = useState("");
  const [color] = useState("");
  const [currency] = useState("");
  const [amount] = useState("");
  const [image] = useState("");

  const ctx = api.useUtils();

  const { mutate } = api.items.create.useMutation({
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
    },
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
      image,
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
            {/* <Input
              name=""
              id="category"
              placeholder="Choose category"
              className="text-grey-200 col-span-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            /> */}
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Oryginał">Oryginał</SelectItem>
                <SelectItem value="Regranulat">Regranulat</SelectItem>
                <SelectItem value="Przemiał">Przemiał</SelectItem>
                <SelectItem value="Odpad">Odpad</SelectItem>
              </SelectContent>
            </Select>
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
              id="display-item" // not working TODO: fix
              // checked={display}
              // onChange={(e) => setDisplay(e.target.checked)}
            />
            <Label htmlFor="display-item">Display item on home page</Label>
          </div>
        </div>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSave}>
            Add item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { CreateItem };
