import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiConfig, profile, skills } from "@portfolio/shared";
import { api } from "../lib/api.js";
import { Badge, Banner, Button, Card, Input, Section, Textarea } from "../components/ui.jsx";

const emptyContact = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [contact, setContact] = useState(emptyContact);

  useEffect(() => {
    const load = async () => {
      const [projectList, postList] = await Promise.all([
        api.listProjects(),
        api.listPosts(true)
      ]);
      setProjects(projectList);
      setPosts(postList);
    };

    load().catch((error) => {
      setStatus({ type: "error", message: error.message });
    });
  }, []);

  const featuredProjects = useMemo(
    () => projects.filter((item) => item.featured),
    [projects]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });

    try {
      const result = await api.submitContact(contact);
      setStatus({ type: "success", message: result.message });
      setContact(emptyContact);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Critical systems, backend and product engineering</p>
        <h1>{profile.name}</h1>
        <p className="hero-copy">
          {profile.summary} Based in {profile.location}, building software that
          has to be understandable, operable and resilient.
        </p>
        <div className="hero-actions">
          <a className="button primary" href={`mailto:${profile.contactEmail}`}>
            Contact me
          </a>
          <a className="button secondary" href={profile.social.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </section>

      {status.message ? <Banner tone={status.type === "error" ? "error" : "info"}>{status.message}</Banner> : null}

      <Section title="About" subtitle="A portfolio should expose technical depth and product judgment, not just static cards.">
        <Card>
          <p>
            This rebuild separates domain logic from infrastructure, replaces
            client-side Babel runtime usage, and keeps frontend and backend
            aligned through stable API contracts.
          </p>
        </Card>
      </Section>

      <Section title="Skills" subtitle="Reusable, product-facing strengths">
        <div className="grid grid-3">
          {skills.map((skill) => (
            <Card key={skill.id}>
              <h3>{skill.name}</h3>
              <Badge>{skill.level}</Badge>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Featured projects" subtitle="Live content served by the API">
        <div className="grid grid-2">
          {featuredProjects.map((project) => (
            <Card key={project.id}>
              <div className="card-header">
                <h3>{project.title}</h3>
                <Badge>{project.status}</Badge>
              </div>
              <p>{project.description}</p>
              <div className="badge-row">
                {project.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Blog" subtitle="Published posts only">
        <div className="grid grid-2">
          {posts.map((post) => (
            <Card key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="badge-row">
                {post.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Contact" subtitle="Server-backed contact workflow with validation and rate limiting">
        <Card>
          <form className="form-grid" onSubmit={handleSubmit}>
            <Input label="Name" name="name" value={contact.name} onChange={handleChange} required />
            <Input label="Email" name="email" type="email" value={contact.email} onChange={handleChange} required />
            <Input label="Subject" name="subject" value={contact.subject} onChange={handleChange} required />
            <Textarea label="Message" name="message" rows="6" value={contact.message} onChange={handleChange} required />
            <Button type="submit">Send message</Button>
          </form>
        </Card>
      </Section>

      <footer className="site-footer">
        <span>Operationally calm, intentionally low-profile.</span>
        <Link className="admin-ghost-link" to={apiConfig.adminPath} aria-label="Private studio access">
          .
        </Link>
      </footer>
    </main>
  );
};
