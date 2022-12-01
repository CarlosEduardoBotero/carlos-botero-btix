import React from "react";
import { ICommentsCard } from "./CommentsCard.interface";

const CommentsCard: React.FC<ICommentsCard> = ({ email, body, name }) => {
  return (
    <article
      className="flex flex-col gap-4 bg-gray-200 p-4 rounded-lg"
      data-testid="commentsCard"
    >
      <div>
        <p className="truncate">{name}</p>
        <p className="text-gray-700">{email}</p>
      </div>
      <p>{body}</p>
    </article>
  );
};

export default CommentsCard;
