import { AddPost } from "../components/index";
import { deletePost, fetchPosts } from "../api/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const PostLists = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isError,
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = (id) => {
    deletePostMutation.mutate(id);
  };

  if (isLoading) return "loading...";
  if (isError) return `unexpected error: ${error.message} `;

  return (
    <div>
      <AddPost />
      {posts.map((post) => (
        <div key={post.id} style={{ background: "#777" }}>
          <h4
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`posts/${post.id}`)}
          >
            {post.title}
          </h4>
          <button onClick={() => navigate(`posts/${post.id}/edit`)}>
            Edit
          </button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostLists;
