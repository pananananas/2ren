export interface ItemCardProps {
    item: {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      color: string;
      price: string;
      currency: string;
      amount: string;
      category: string;
      material: string;
      description: string;
      authorID: string;
      display: boolean;
    };
    itemImages: {
      id: number;
      key: string;
      imageUrl: string;
      itemId: number;
    }[];
    selectedItemId: number | null;
  }