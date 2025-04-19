import { User } from "../type/types";

export const users: User[] = [
  {
    id: 1,
    name: "Alice",
    data: [
      {
        sector: "Retail",
        category: "Juice",
        spend: 200,
        percentChange: 5,
        absoluteChange: 10,
        date: "2023-10-01",
      },
      {
        sector: "Food",
        category: "Snacks",
        spend: 150,
        percentChange: -2,
        absoluteChange: -3,
        date: "2023-10-05",
      },
    ],
  },
  {
    id: 2,
    name: "Bob",
    data: [
      {
        sector: "Industrial",
        category: "Tools",
        spend: 300,
        percentChange: 10,
        absoluteChange: 30,
        date: "2023-10-03",
      },
      {
        sector: "Retail",
        category: "Juice",
        spend: 180,
        percentChange: 3,
        absoluteChange: 5,
        date: "2023-10-08",
      },
    ],
  },
];
