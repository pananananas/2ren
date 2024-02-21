"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadDropzone } from "~/utils/uploadthing";
import { useMediaQuery } from "usehooks-ts";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { api } from "~/utils/api";
import { z } from "zod";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";

import React, { useEffect } from "react";

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
    }),
  ),
});

export function ItemCreateForm() {
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
      images: [],
    },
  });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1, maximum-scale=1";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

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
  if (isDesktop) {
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
                <div className="w-1/2 ">
                  <UploadDropzone
                    className="ut-label:text-m p-3  ut-button:bg-gray-900 ut-label:text-gray-900 ut-allowed-content:ut-uploading:text-red-400"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      res.forEach((file) => {
                        form.setValue("images", [
                          ...form.getValues("images"),
                          {
                            imageUrl: file.url,
                            key: file.key,
                          },
                        ]);
                      });
                      alert("Image uploaded successfully!");
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                    config={{ mode: "auto" }}
                  />
                </div>
                <div className="w-full space-y-2">
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
                            <SelectItem value="Regranulat">
                              Regranulat
                            </SelectItem>
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

  // MOBILE
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Item</Button>
      </DrawerTrigger>

      <DrawerContent>
        <DialogHeader>
          <DialogTitle className="pt-2">Add new item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-2 px-3">
            {/* <DrawerTitle className="px-3 py-1">Add new item</DrawerTitle> */}
            <div className="flex w-full gap-4">
              <div className="w-2/3">
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
              </div>
              <div className="w-1/3">
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
                      className="min-h-[40px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <UploadDropzone
              className="ut-label:text-m p-3 py-1 ut-button:bg-gray-900 ut-label:text-gray-900 ut-allowed-content:ut-uploading:text-red-400"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                res.forEach((file) => {
                  form.setValue("images", [
                    ...form.getValues("images"),
                    {
                      imageUrl: file.url,
                      key: file.key,
                    },
                  ]);
                });
                alert("Image uploaded successfully!");
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              config={{ mode: "auto" }}
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
            <DrawerFooter className="flex w-full flex-row gap-2 ">
              <DrawerClose asChild>
                <Button type="button" variant="secondary" className="w-1/2">
                  Close
                </Button>
              </DrawerClose>
              <Button type="submit" className="w-1/2">
                Add item
              </Button>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
