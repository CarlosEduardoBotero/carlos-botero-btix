export type IGetCommentsIdResponse = IGetCommentsId[];

export interface IGetCommentsId {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
