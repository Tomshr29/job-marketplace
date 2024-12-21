export interface Property {
  id: number;
  title: string;
  description: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  status: "AVAILABLE" | "SOLD" | "RENTED";
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    fullName: string;
  };
  avatarProperty: string;
}
