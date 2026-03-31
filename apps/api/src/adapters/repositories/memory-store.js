import bcrypt from "bcryptjs";
import {
  adminSeedUser,
  apiConfig,
  seedPosts,
  seedProjects
} from "@portfolio/shared";

const passwordHash = bcrypt.hashSync(apiConfig.defaultAdminPassword, 10);

export const memoryStore = {
  projects: structuredClone(seedProjects),
  posts: structuredClone(seedPosts),
  contacts: [],
  users: [
    {
      ...adminSeedUser,
      passwordHash
    }
  ]
};
