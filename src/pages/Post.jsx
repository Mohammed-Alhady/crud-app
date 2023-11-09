import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost } from "../api/posts";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    isError,
    isLoading,
    data: post,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id),
  });

  if (isLoading) return "loading...";
  if (isError) return `unexpected error: ${error.message} `;

  return (
    <div>
      {post.title && <h1>{post.title}</h1>}
      {post.body && <p>{post.body}</p>}
      <button onClick={() => navigate("/")}>back to home</button>
    </div>
  );
};

export default Post;
