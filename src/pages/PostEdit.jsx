import { PostForm } from "../components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPost, updatedPost } from "../api/posts";
import { useNavigate } from "react-router-dom";

const PostEdit = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isError,
    isLoading,
    data: post,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id),
  });

  const updatedPostMotation = useMutation({
    mutationFn: updatedPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  const handleSubmit = (updatedPost) => {
    updatedPostMotation.mutate({ id, ...updatedPost });
  };

  if (isLoading) return "loading...";
  if (isError) return `unexpected error: ${error.message} `;

  return (
    <div>
      <PostForm onSubmit={handleSubmit} values={post} />
    </div>
  );
};

export default PostEdit;
