import { memoryStore } from "./memory-store.js";

const clone = (value) => structuredClone(value);

export const createMemoryProjectRepository = () => ({
  async list() {
    return clone(memoryStore.projects);
  },
  async getById(id) {
    return clone(memoryStore.projects.find((item) => item.id === id) ?? null);
  },
  async create(project) {
    memoryStore.projects.unshift(project);
    return clone(project);
  },
  async update(id, project) {
    const index = memoryStore.projects.findIndex((item) => item.id === id);
    memoryStore.projects[index] = project;
    return clone(project);
  },
  async remove(id) {
    memoryStore.projects = memoryStore.projects.filter((item) => item.id !== id);
  }
});

export const createMemoryBlogRepository = () => ({
  async list({ published } = {}) {
    const posts =
      typeof published === "boolean"
        ? memoryStore.posts.filter((post) => post.published === published)
        : memoryStore.posts;
    return clone(posts);
  },
  async getById(id) {
    return clone(memoryStore.posts.find((item) => item.id === id) ?? null);
  },
  async create(post) {
    memoryStore.posts.unshift(post);
    return clone(post);
  },
  async update(id, post) {
    const index = memoryStore.posts.findIndex((item) => item.id === id);
    memoryStore.posts[index] = post;
    return clone(post);
  },
  async remove(id) {
    memoryStore.posts = memoryStore.posts.filter((item) => item.id !== id);
  }
});

export const createMemoryContactRepository = () => ({
  async create(submission) {
    memoryStore.contacts.unshift(submission);
    return clone(submission);
  },
  async list() {
    return clone(memoryStore.contacts);
  }
});

export const createMemoryUserRepository = () => ({
  async getByUsername(username) {
    return clone(memoryStore.users.find((item) => item.username === username) ?? null);
  }
});
