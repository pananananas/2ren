"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { z } from "zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
    mutate(values);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="material"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material</FormLabel>
              <FormControl>
                <Input placeholder="wood" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
