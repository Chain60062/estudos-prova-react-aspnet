import Category from "./Category";

export default interface ToDo {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  category?: Category;
  categoryId: number;
}

export interface ICreateToDo {
  title: string;
  description: string;
  categoryId: number;
}
