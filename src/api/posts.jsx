const Link = "http://localhost:3000/posts";

export async function fetchPosts() {
  const response = await fetch(Link);
  return response.json();
}

export async function fetchPost(id) {
  const response = await fetch(`${Link}/${id}`);
  return response.json();
}

export async function createPost(newPost) {
  const response = await fetch(Link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });
  return response.json();
}

export async function updatedPost(updatedPost) {
  const response = await fetch(`${Link}/${updatedPost.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  });
  return response.json();
}

export async function deletePost(id) {
  const response = await fetch(`${Link}/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
