import "dotenv/config";
import { createApp } from "./http/app.js";
import { apiConfig } from "@portfolio/shared";

const port = Number(process.env.API_PORT || apiConfig.apiPort);
const app = createApp();

app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`);
});
