import PostForm from "./PostForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";
import { v4 as uuid4 } from "uuid";

const AddPost = () => {
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleAddPost = (post) => {
    createPostMutation.mutate({
      id: uuid4(),
      ...post,
    });
  };

  return (
    <div>
      <h2>Add a new Post</h2>
      <PostForm onSubmit={handleAddPost} values={{}} />
    </div>
  );
};

export default AddPost;
