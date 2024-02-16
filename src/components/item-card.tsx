import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

export default function ItemCard() {
  const { data, isLoading } = api.items.getAll.useQuery();
  const { data: imagesData, isLoading: imagesLoading } =
    api.itemImages.getAll.useQuery();

  if (isLoading) return <LoadingPage />;
  if (!data) return <div>No data</div>;
  if (imagesLoading) return <LoadingPage />;
  if (!imagesData) return <div>No images data</div>;

  return (
    <div className="flex">
      {/* {data.map(({ item, author }) => (
        <div key={item.id} className="">
          {item.name}
          {item.price}
          {item.amount}
          {item.display} {item.description}
          {author?.firstName}
          {author?.lastName}
        </div>
      ))} */}
      {data.map(({ item }) => (
        <div key={item.id} className="">
          <Card className="w-[170px]">
            {imagesData[9] && (
                console.log("imagesData", imagesData),
                <Image
                  src={imagesData[9].imageUrl}
                  alt=""
                  width={170}
                  height={130}
                />

            )}

            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
