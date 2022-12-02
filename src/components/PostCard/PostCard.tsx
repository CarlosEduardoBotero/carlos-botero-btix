import { forwardRef, useState } from "react";
import { IpostCard } from "./PostCard.interface";
import { Link } from "react-router-dom";
import CommentsContainer from "../CommentsContainer/CommentsContainer";

const PostCard = forwardRef<HTMLDivElement | null, IpostCard>((props, ref) => {
  const [showComments, setShowComments] = useState<boolean>(false);

  const handleShowComments = () => setShowComments(true);

  const handlePress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      handleShowComments();
    }
  };

  return (
    <div
      className="w-full flex flex-col shadow-lg gap-4 p-6 bg-white rounded-md"
      ref={ref ? ref : null}
    >
      <Link to={`/${props.username}/${props.userId}`}>
        <p>{props.name}</p>
        <p className="text-gray-500">{props.username}</p>
      </Link>
      <div className="flex flex-col gap-2">
        <h6>{props.title}</h6>
        <div>{props.body}</div>
      </div>
      {showComments ? (
        <CommentsContainer id={props.id} />
      ) : (
        <button
          tabIndex={0}
          role="button"
          className="self-end text-gray-900 cursor-pointer"
          onClick={handleShowComments}
          onKeyDown={handlePress}
        >
          Mostrar Comentarios
        </button>
      )}
    </div>
  );
});

export default PostCard;
