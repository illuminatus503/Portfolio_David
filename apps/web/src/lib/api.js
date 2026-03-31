const readJson = async (response) => {
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error?.message ?? "Request failed");
  }
  return payload.data;
};

export const api = {
  async login(credentials) {
    return readJson(
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      })
    );
  },
  async getSession(token) {
    return readJson(
      await fetch("/api/auth/session", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    );
  },
  async listProjects() {
    return readJson(await fetch("/api/projects"));
  },
  async saveProject(project, token) {
    return readJson(
      await fetch(project.id ? `/api/projects/${project.id}` : "/api/projects", {
        method: project.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(project)
      })
    );
  },
  async deleteProject(id, token) {
    return readJson(
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
    );
  },
  async listPosts(published) {
    const suffix =
      typeof published === "boolean" ? `?published=${published}` : "";
    return readJson(await fetch(`/api/blog${suffix}`));
  },
  async savePost(post, token) {
    return readJson(
      await fetch(post.id ? `/api/blog/${post.id}` : "/api/blog", {
        method: post.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(post)
      })
    );
  },
  async deletePost(id, token) {
    return readJson(
      await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
    );
  },
  async submitContact(payload) {
    return readJson(
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
    );
  }
};
