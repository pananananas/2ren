import {
  Dialog,
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

const CreateItem = () => {


  
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
              Material
            </Label>
            <Input
              name="dupp"
              id="name"
              // defaultValue="Enter your material type"
              placeholder="Enter your material type"
              className="text-grey-200 col-span-3"
            />
          </div>
          <div className="items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Price
            </Label>
            <Input
              name="dupp"
              id="price"
              // defaultValue="@peduarte"
              placeholder="Enter price"
              className="col-span-3"
            />
          </div>
          <div className="items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Description
            </Label>
            <Textarea placeholder="Description of your meterial" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="display-item" />
            <Label htmlFor="display-item">Display item in home page </Label>
          </div>
        </div>
        <DialogFooter className="">
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { CreateItem };
