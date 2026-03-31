import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { loginInputSchema } from "@portfolio/shared";
import { api } from "../lib/api.js";
import {
  Badge,
  Banner,
  Button,
  Card,
  FieldError,
  Input,
  Section,
  Textarea
} from "../components/ui.jsx";

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
  const queryClient = useQueryClient();
  const [token, setToken] = useState(localStorage.getItem(tokenKey) ?? "");
  const [projectForm, setProjectForm] = useState(blankProject);
  const [postForm, setPostForm] = useState(blankPost);
  const [editingProjectId, setEditingProjectId] = useState("");
  const [editingPostId, setEditingPostId] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const loginForm = useForm({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const authenticated = Boolean(token);
  const sessionQuery = useQuery({
    queryKey: ["admin-session", token],
    queryFn: () => api.getSession(token),
    enabled: authenticated,
    retry: false
  });
  const workspaceQuery = useQuery({
    queryKey: ["admin-workspace"],
    queryFn: async () => {
      const [projects, posts] = await Promise.all([
        api.listProjects(),
        api.listPosts()
      ]);

      return { projects, posts };
    },
    enabled: authenticated && sessionQuery.isSuccess
  });
  useEffect(() => {
    if (authenticated && sessionQuery.isError) {
      localStorage.removeItem(tokenKey);
      queryClient.removeQueries({ queryKey: ["admin-session"] });
      queryClient.removeQueries({ queryKey: ["admin-workspace"] });
      setToken("");
    }
  }, [authenticated, queryClient, sessionQuery.isError]);

  const editingProject = useMemo(
    () => (workspaceQuery.data?.projects ?? []).find((item) => item.id === editingProjectId) ?? null,
    [workspaceQuery.data?.projects, editingProjectId]
  );
  const editingPost = useMemo(
    () => (workspaceQuery.data?.posts ?? []).find((item) => item.id === editingPostId) ?? null,
    [workspaceQuery.data?.posts, editingPostId]
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

  const handleLogin = loginForm.handleSubmit(async (values) => {
    try {
      const result = await api.login(values);
      localStorage.setItem(tokenKey, result.token);
      setToken(result.token);
      loginForm.reset();
      setStatus({ type: "success", message: `Signed in as ${result.user.username}` });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  });

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    await api.saveProject(
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
    await queryClient.invalidateQueries({ queryKey: ["admin-workspace"] });
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    await api.savePost(
      {
        ...postForm,
        id: editingPostId || undefined,
        tags: Array.isArray(postForm.tags) ? postForm.tags : mapDelimited(postForm.tags)
      },
      token
    );
    setEditingPostId("");
    setPostForm(blankPost);
    await queryClient.invalidateQueries({ queryKey: ["admin-workspace"] });
  };

  const handleDeleteProject = async (id) => {
    await api.deleteProject(id, token);
    await queryClient.invalidateQueries({ queryKey: ["admin-workspace"] });
  };

  const handleDeletePost = async (id) => {
    await api.deletePost(id, token);
    await queryClient.invalidateQueries({ queryKey: ["admin-workspace"] });
  };

  if (authenticated && sessionQuery.isPending) {
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
              <div>
                <Input label="Identifier" {...loginForm.register("username")} />
                <FieldError message={loginForm.formState.errors.username?.message} />
              </div>
              <div>
                <Input
                  label="Passphrase"
                  type="password"
                  {...loginForm.register("password")}
                />
                <FieldError message={loginForm.formState.errors.password?.message} />
              </div>
              <Button type="submit" disabled={loginForm.formState.isSubmitting}>
                {loginForm.formState.isSubmitting ? "Checking..." : "Continue"}
              </Button>
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
      {workspaceQuery.isError ? (
        <Banner tone="error">{workspaceQuery.error.message}</Banner>
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
              queryClient.removeQueries({ queryKey: ["admin-session"] });
              queryClient.removeQueries({ queryKey: ["admin-workspace"] });
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
              {workspaceQuery.isLoading ? <p>Loading projects...</p> : null}
              {(workspaceQuery.data?.projects ?? []).map((project) => (
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
              {workspaceQuery.isLoading ? <p>Loading posts...</p> : null}
              {(workspaceQuery.data?.posts ?? []).map((post) => (
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
