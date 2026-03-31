import { Pool } from "pg";
import {
  createMemoryBlogRepository,
  createMemoryContactRepository,
  createMemoryProjectRepository,
  createMemoryUserRepository
} from "../adapters/repositories/memory-repositories.js";
import {
  createPostgresBlogRepository,
  createPostgresContactRepository,
  createPostgresProjectRepository,
  createPostgresUserRepository
} from "../adapters/repositories/postgres-repositories.js";
import { mailService } from "../adapters/services/mail-service.js";
import { passwordHasher } from "../adapters/services/password-hasher.js";
import { tokenService } from "../adapters/services/jwt-token-service.js";

let pool = null;

const createPool = () => {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("localhost")
      ? false
      : { rejectUnauthorized: false }
  });
};

export const createContainer = () => {
  pool ??= createPool();

  if (pool) {
    return {
      projectRepository: createPostgresProjectRepository(pool),
      blogRepository: createPostgresBlogRepository(pool),
      contactRepository: createPostgresContactRepository(pool),
      userRepository: createPostgresUserRepository(pool),
      passwordHasher,
      tokenService,
      mailService
    };
  }

  return {
    projectRepository: createMemoryProjectRepository(),
    blogRepository: createMemoryBlogRepository(),
    contactRepository: createMemoryContactRepository(),
    userRepository: createMemoryUserRepository(),
    passwordHasher,
    tokenService,
    mailService
  };
};
