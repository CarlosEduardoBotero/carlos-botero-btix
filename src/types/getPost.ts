export type IPostResponse = IPost[];

export interface IPost {
  body: string;
  id: number;
  title: string;
  userId: number;
}
