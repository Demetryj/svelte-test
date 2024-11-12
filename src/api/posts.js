const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getAllPosts() {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error("Error fetching all posts");
  }
  const posts = await response.json();

  const usersResponse = await fetch(`${API_BASE_URL}/users`);
  if (!usersResponse.ok) {
    throw new Error("Error fetching users");
  }
  const users = await usersResponse.json();

  return posts.map((post) => {
    const user = users.find((u) => u.id === post.userId);
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
      name: user.name,
      city: user.address.city,
    };
  });
}

export async function getUserPosts(userId) {
  const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
  if (!response.ok) {
    throw new Error(`Error fetching posts for user with id ${userId}`);
  }
  const posts = await response.json();

  const userResponse = await fetch(`${API_BASE_URL}/users/${userId}`);
  if (!userResponse.ok) {
    throw new Error("Error fetching user data");
  }
  const user = await userResponse.json();

  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    body: post.body,
    userId: post.userId,
    name: user.name,
    city: user.address.city,
  }));
}

export async function getPostComments(postId) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error(`Error fetching comments for post with id ${postId}`);
  }
  return await response.json();
}

export async function deleteComment(commentId) {
  const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error deleting comment with id ${commentId}`);
  }
  return true;
}

export async function addComment(postId, comment) {
  const response = await fetch(`${API_BASE_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId,
      ...comment,
    }),
  });
  if (!response.ok) {
    throw new Error("Error adding comment");
  }
  return await response.json();
}
