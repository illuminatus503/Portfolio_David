import { z } from "zod";

const isoNow = () => new Date().toISOString();
const nonEmptyString = z.string().trim().min(1);
const optionalUrl = z
  .string()
  .trim()
  .url()
  .or(z.literal(""))
  .optional()
  .default("");

export const projectInputSchema = z.object({
  title: nonEmptyString,
  description: z.string().trim().min(1),
  technologies: z.array(nonEmptyString).default([]),
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  featured: z.boolean().default(false),
  status: z.enum(["active", "draft", "archived"]).default("active")
});

export const blogPostInputSchema = z.object({
  title: nonEmptyString,
  excerpt: z.string().trim().min(1),
  content: z.string().trim().min(1),
  tags: z.array(nonEmptyString).default([]),
  published: z.boolean().default(false)
});

export const contactInputSchema = z.object({
  name: nonEmptyString,
  email: z.string().trim().email(),
  subject: nonEmptyString,
  message: z.string().trim().min(10)
});

export const loginInputSchema = z.object({
  username: nonEmptyString,
  password: nonEmptyString
});

const mapProject = (project, input) => ({
  ...project,
  ...input,
  updatedAt: isoNow()
});

const mapPost = (post, input) => ({
  ...post,
  ...input,
  updatedAt: isoNow()
});

const toAppError = (code, message, details) => {
  const error = new Error(message);
  error.code = code;
  error.details = details;
  return error;
};

export const listProjects = async ({ projectRepository }) =>
  projectRepository.list();

export const createProject = async ({ projectRepository }, payload) => {
  const input = projectInputSchema.parse(payload);
  return projectRepository.create({
    id: crypto.randomUUID(),
    ...input,
    createdAt: isoNow(),
    updatedAt: isoNow()
  });
};

export const updateProject = async ({ projectRepository }, id, payload) => {
  const existing = await projectRepository.getById(id);
  if (!existing) {
    throw toAppError("PROJECT_NOT_FOUND", "Project not found");
  }
  const input = projectInputSchema.parse(payload);
  return projectRepository.update(id, mapProject(existing, input));
};

export const deleteProject = async ({ projectRepository }, id) => {
  const existing = await projectRepository.getById(id);
  if (!existing) {
    throw toAppError("PROJECT_NOT_FOUND", "Project not found");
  }
  await projectRepository.remove(id);
  return { success: true };
};

export const listPosts = async ({ blogRepository }, query = {}) =>
  blogRepository.list(query);

export const createPost = async ({ blogRepository }, payload) => {
  const input = blogPostInputSchema.parse(payload);
  return blogRepository.create({
    id: crypto.randomUUID(),
    ...input,
    createdAt: isoNow(),
    updatedAt: isoNow()
  });
};

export const updatePost = async ({ blogRepository }, id, payload) => {
  const existing = await blogRepository.getById(id);
  if (!existing) {
    throw toAppError("POST_NOT_FOUND", "Blog post not found");
  }
  const input = blogPostInputSchema.parse(payload);
  return blogRepository.update(id, mapPost(existing, input));
};

export const deletePost = async ({ blogRepository }, id) => {
  const existing = await blogRepository.getById(id);
  if (!existing) {
    throw toAppError("POST_NOT_FOUND", "Blog post not found");
  }
  await blogRepository.remove(id);
  return { success: true };
};

export const authenticateAdmin = async (
  { userRepository, passwordHasher, tokenService },
  payload
) => {
  const input = loginInputSchema.parse(payload);
  const user = await userRepository.getByUsername(input.username);

  if (!user) {
    throw toAppError("INVALID_CREDENTIALS", "Invalid credentials");
  }

  const valid = await passwordHasher.compare(input.password, user.passwordHash);
  if (!valid) {
    throw toAppError("INVALID_CREDENTIALS", "Invalid credentials");
  }

  const token = await tokenService.sign({
    sub: user.id,
    username: user.username,
    role: user.role
  });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  };
};

export const submitContactForm = async (
  { contactRepository, mailService },
  payload
) => {
  const input = contactInputSchema.parse(payload);
  const submission = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: isoNow(),
    status: "new"
  };
  await contactRepository.create(submission);
  await mailService.sendContactNotification(submission);
  return {
    success: true,
    message: "Message delivered successfully"
  };
};

export const verifyAdminToken = async ({ tokenService }, token) => {
  if (!token) {
    throw toAppError("AUTH_REQUIRED", "Authentication required");
  }

  try {
    return await tokenService.verify(token);
  } catch (error) {
    throw toAppError("INVALID_TOKEN", "Invalid or expired token");
  }
};
