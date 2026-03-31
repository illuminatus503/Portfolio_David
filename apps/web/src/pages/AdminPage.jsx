import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api.js";
import { Badge, Banner, Button, Card, Input, Section, Textarea } from "../components/ui.jsx";

const tokenKey = "portfolio-admin-token";

const blankProject = {
  title: "",
  description: "",
  technologies: [],
  githubUrl: "",
  liveUrl: "",
  featured: false,
  status: "active"
};

const blankPost = {
  title: "",
  excerpt: "",
  content: "",
  tags: [],
  published: false
};

const mapDelimited = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const AdminPage = () => {
  const [token, setToken] = useState(localStorage.getItem(tokenKey) ?? "");
  const [login, setLogin] = useState({ username: "", password: "" });
  const [sessionChecked, setSessionChecked] = useState(false);
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projectForm, setProjectForm] = useState(blankProject);
  const [postForm, setPostForm] = useState(blankPost);
  const [editingProjectId, setEditingProjectId] = useState("");
  const [editingPostId, setEditingPostId] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const authenticated = Boolean(token);

  const load = async () => {
    const [projectList, postList] = await Promise.all([
      api.listProjects(),
      api.listPosts()
    ]);
    setProjects(projectList);
    setPosts(postList);
  };

  useEffect(() => {
    if (!authenticated) {
      setSessionChecked(true);
      return;
    }

    api
      .getSession(token)
      .then(() => load())
      .catch(() => {
        localStorage.removeItem(tokenKey);
        setToken("");
      })
      .finally(() => setSessionChecked(true));
  }, [authenticated, token]);

  const editingProject = useMemo(
    () => projects.find((item) => item.id === editingProjectId) ?? null,
    [projects, editingProjectId]
  );
  const editingPost = useMemo(
    () => posts.find((item) => item.id === editingPostId) ?? null,
    [posts, editingPostId]
  );

  useEffect(() => {
    if (editingProject) {
      setProjectForm(editingProject);
    } else {
      setProjectForm(blankProject);
    }
  }, [editingProject]);

  useEffect(() => {
    if (editingPost) {
      setPostForm(editingPost);
    } else {
      setPostForm(blankPost);
    }
  }, [editingPost]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await api.login(login);
      localStorage.setItem(tokenKey, result.token);
      setToken(result.token);
      setStatus({ type: "success", message: `Signed in as ${result.user.username}` });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    const saved = await api.saveProject(
      {
        ...projectForm,
        id: editingProjectId || undefined,
        technologies: Array.isArray(projectForm.technologies)
          ? projectForm.technologies
          : mapDelimited(projectForm.technologies)
      },
      token
    );
    setEditingProjectId("");
    setProjectForm(blankProject);
    setProjects((current) => {
      const filtered = current.filter((item) => item.id !== saved.id);
      return [saved, ...filtered];
    });
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    const saved = await api.savePost(
      {
        ...postForm,
        id: editingPostId || undefined,
        tags: Array.isArray(postForm.tags) ? postForm.tags : mapDelimited(postForm.tags)
      },
      token
    );
    setEditingPostId("");
    setPostForm(blankPost);
    setPosts((current) => {
      const filtered = current.filter((item) => item.id !== saved.id);
      return [saved, ...filtered];
    });
  };

  const handleDeleteProject = async (id) => {
    await api.deleteProject(id, token);
    setProjects((current) => current.filter((item) => item.id !== id));
  };

  const handleDeletePost = async (id) => {
    await api.deletePost(id, token);
    setPosts((current) => current.filter((item) => item.id !== id));
  };

  if (!sessionChecked) {
    return (
      <main className="page admin-page">
        <Section title="Private workspace" subtitle="Checking access.">
          <Card className="private-shell">
            <p>Verifying session...</p>
          </Card>
        </Section>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="page admin-page">
        <Section title="Private workspace" subtitle="Restricted access.">
          {status.message ? (
            <Banner tone={status.type === "error" ? "error" : "info"}>{status.message}</Banner>
          ) : null}
          <Card className="private-shell">
            <form className="form-grid" onSubmit={handleLogin}>
              <Input
                label="Identifier"
                name="username"
                value={login.username}
                onChange={(event) =>
                  setLogin((current) => ({ ...current, username: event.target.value }))
                }
              />
              <Input
                label="Passphrase"
                type="password"
                name="password"
                value={login.password}
                onChange={(event) =>
                  setLogin((current) => ({ ...current, password: event.target.value }))
                }
              />
              <Button type="submit">Continue</Button>
            </form>
          </Card>
        </Section>
      </main>
    );
  }

  return (
    <main className="page admin-page">
      {status.message ? (
        <Banner tone={status.type === "error" ? "error" : "info"}>{status.message}</Banner>
      ) : null}

      <Section
        title="Projects"
        subtitle="CRUD backed by the new API contracts."
        actions={
          <Button
            variant="secondary"
            onClick={() => {
              localStorage.removeItem(tokenKey);
              setToken("");
            }}
          >
            Log out
          </Button>
        }
      >
        <div className="grid grid-2">
          <Card>
            <form className="form-grid" onSubmit={handleProjectSubmit}>
              <Input
                label="Title"
                value={projectForm.title}
                onChange={(event) =>
                  setProjectForm((current) => ({ ...current, title: event.target.value }))
                }
              />
              <Textarea
                label="Description"
                rows="5"
                value={projectForm.description}
                onChange={(event) =>
                  setProjectForm((current) => ({
                    ...current,
                    description: event.target.value
                  }))
                }
              />
              <Input
                label="Technologies (comma separated)"
                value={Array.isArray(projectForm.technologies) ? projectForm.technologies.join(", ") : projectForm.technologies}
                onChange={(event) =>
                  setProjectForm((current) => ({
                    ...current,
                    technologies: event.target.value
                  }))
                }
              />
              <Input
                label="GitHub URL"
                value={projectForm.githubUrl}
                onChange={(event) =>
                  setProjectForm((current) => ({ ...current, githubUrl: event.target.value }))
                }
              />
              <Input
                label="Live URL"
                value={projectForm.liveUrl}
                onChange={(event) =>
                  setProjectForm((current) => ({ ...current, liveUrl: event.target.value }))
                }
              />
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={projectForm.featured}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      featured: event.target.checked
                    }))
                  }
                />
                <span>Featured</span>
              </label>
              <Button type="submit">{editingProjectId ? "Update project" : "Create project"}</Button>
            </form>
          </Card>
          <Card>
            <div className="stack">
              {projects.map((project) => (
                <div className="list-item" key={project.id}>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="badge-row">
                      {project.technologies.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="inline-actions">
                    <Button variant="secondary" onClick={() => setEditingProjectId(project.id)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteProject(project.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Blog" subtitle="Published and draft posts share the same admin workflow.">
        <div className="grid grid-2">
          <Card>
            <form className="form-grid" onSubmit={handlePostSubmit}>
              <Input
                label="Title"
                value={postForm.title}
                onChange={(event) =>
                  setPostForm((current) => ({ ...current, title: event.target.value }))
                }
              />
              <Textarea
                label="Excerpt"
                rows="3"
                value={postForm.excerpt}
                onChange={(event) =>
                  setPostForm((current) => ({ ...current, excerpt: event.target.value }))
                }
              />
              <Textarea
                label="Content"
                rows="7"
                value={postForm.content}
                onChange={(event) =>
                  setPostForm((current) => ({ ...current, content: event.target.value }))
                }
              />
              <Input
                label="Tags (comma separated)"
                value={Array.isArray(postForm.tags) ? postForm.tags.join(", ") : postForm.tags}
                onChange={(event) =>
                  setPostForm((current) => ({ ...current, tags: event.target.value }))
                }
              />
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={postForm.published}
                  onChange={(event) =>
                    setPostForm((current) => ({
                      ...current,
                      published: event.target.checked
                    }))
                  }
                />
                <span>Published</span>
              </label>
              <Button type="submit">{editingPostId ? "Update post" : "Create post"}</Button>
            </form>
          </Card>
          <Card>
            <div className="stack">
              {posts.map((post) => (
                <div className="list-item" key={post.id}>
                  <div>
                    <div className="card-header">
                      <h3>{post.title}</h3>
                      <Badge>{post.published ? "published" : "draft"}</Badge>
                    </div>
                    <p>{post.excerpt}</p>
                  </div>
                  <div className="inline-actions">
                    <Button variant="secondary" onClick={() => setEditingPostId(post.id)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeletePost(post.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </main>
  );
};
