import { apiConfig } from "@portfolio/shared";

export const runtimeConfig = {
  adminPath:
    import.meta.env.VITE_ADMIN_PATH?.trim() || apiConfig.adminPath || "/studio-503"
};
