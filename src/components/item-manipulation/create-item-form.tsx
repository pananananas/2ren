"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
import ImageDropzone from "./image-dropzone";

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  material: z.string(),
  category: z.string().min(2, { message: "Choose category." }),
  description: z.string(),
  display: z.boolean(),
  price: z.string(),
  color: z.string(),
  currency: z.string(),
  amount: z.string(),
  images: z.array(
    z.object({
      imageUrl: z.string().max(1000),
      key: z.string().max(1000),
    })
  ),
});

export function CreateItemForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      material: "",
      category: "",
      description: "",
      display: false,
      price: "",
      color: "",
      currency: "zł",
      amount: "",
      images: [
        {
          imageUrl: "testUrl1",
          key: "testKey1",
        },
        {
          imageUrl: "testUrl2",
          key: "testKey2",
        },
        {
          imageUrl: "testUrl3",
          key: "testKey3",
        },
      ],
    },
  });

  const ctx = api.useUtils();
  const { mutate } = api.items.create.useMutation({
    onSuccess: () => {
      void ctx.items.getAll.invalidate();
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    // This function will only be called if the form is valid
    console.log("Form values", values);
    mutate(values);
  });

  // const handleFileUpload = (file: File) => {
  //   // form.setValue("images");
  // };

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
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-2">
            <div className="flex w-full gap-4">
              <div className="w-1/2">
                <ImageDropzone />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter material type" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Oryginał">Oryginał</SelectItem>
                          <SelectItem value="Regranulat">Regranulat</SelectItem>
                          <SelectItem value="Przemiał">Przemiał</SelectItem>
                          <SelectItem value="Odpad">Odpad</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full gap-4">
              <div className="w-2/3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="zł" // Add default value "zł"
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="zł">zł</SelectItem>
                          <SelectItem value="euro">Euro</SelectItem>
                          <SelectItem value="usd">USD</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full gap-4">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="Amount in kg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose color" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FFFFFF">Biały</SelectItem>
                          <SelectItem value="000000">Czarny</SelectItem>
                          <SelectItem value="333333">Szary</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description of your material"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="display"
              render={({ field }) => (
                <FormItem>
                  <FormControl></FormControl>
                  <div className="flex items-center gap-4 py-1">
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      // disabled
                      aria-readonly
                    />

                    <Label htmlFor="display-item">
                      Display item on home page
                    </Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Add item</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
