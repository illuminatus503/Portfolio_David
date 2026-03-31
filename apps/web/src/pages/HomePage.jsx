import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { contactInputSchema, profile, skills } from "@portfolio/shared";
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

export const HomePage = () => {
  const [contactStatus, setContactStatus] = useState({ type: "idle", message: "" });
  const contactForm = useForm({
    resolver: zodResolver(contactInputSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const contentQuery = useQuery({
    queryKey: ["home-content"],
    queryFn: async () => {
      const [projects, posts] = await Promise.all([
        api.listProjects(),
        api.listPosts(true)
      ]);

      return { projects, posts };
    }
  });

  const featuredProjects = useMemo(
    () => (contentQuery.data?.projects ?? []).filter((item) => item.featured),
    [contentQuery.data?.projects]
  );

  const handleSubmit = contactForm.handleSubmit(async (values) => {
    setContactStatus({ type: "loading", message: "Sending message..." });

    try {
      const result = await api.submitContact(values);
      setContactStatus({ type: "success", message: result.message });
      contactForm.reset();
    } catch (error) {
      setContactStatus({ type: "error", message: error.message });
    }
  });

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

      {contentQuery.isError ? (
        <Banner tone="error">{contentQuery.error.message}</Banner>
      ) : null}
      {contactStatus.message ? (
        <Banner tone={contactStatus.type === "error" ? "error" : "info"}>
          {contactStatus.message}
        </Banner>
      ) : null}

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
        {contentQuery.isLoading ? (
          <Card>
            <p>Loading featured projects...</p>
          </Card>
        ) : (
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
        )}
      </Section>

      <Section title="Blog" subtitle="Published posts only">
        {contentQuery.isLoading ? (
          <Card>
            <p>Loading published posts...</p>
          </Card>
        ) : (
          <div className="grid grid-2">
            {(contentQuery.data?.posts ?? []).map((post) => (
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
        )}
      </Section>

      <Section title="Contact" subtitle="Server-backed contact workflow with validation and rate limiting">
        <Card>
          <form className="form-grid" onSubmit={handleSubmit}>
            <div>
              <Input label="Name" {...contactForm.register("name")} />
              <FieldError message={contactForm.formState.errors.name?.message} />
            </div>
            <div>
              <Input label="Email" type="email" {...contactForm.register("email")} />
              <FieldError message={contactForm.formState.errors.email?.message} />
            </div>
            <div>
              <Input label="Subject" {...contactForm.register("subject")} />
              <FieldError message={contactForm.formState.errors.subject?.message} />
            </div>
            <div>
              <Textarea label="Message" rows="6" {...contactForm.register("message")} />
              <FieldError message={contactForm.formState.errors.message?.message} />
            </div>
            <Button type="submit" disabled={contactForm.formState.isSubmitting}>
              {contactForm.formState.isSubmitting ? "Sending..." : "Send message"}
            </Button>
          </form>
        </Card>
      </Section>
    </main>
  );
};
