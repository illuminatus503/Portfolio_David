import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App.jsx";

beforeEach(() => {
  vi.restoreAllMocks();
  vi.stubGlobal(
    "fetch",
    vi.fn((input) => {
      const url = String(input);

      if (url.includes("/api/projects")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            data: [
              {
                id: "p1",
                title: "Project one",
                description: "Desc",
                technologies: ["React"],
                featured: true,
                status: "active"
              }
            ]
          })
        });
      }

      if (url.includes("/api/blog")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            data: [
              {
                id: "b1",
                title: "Post one",
                excerpt: "Excerpt",
                tags: ["tag"],
                published: true
              }
            ]
          })
        });
      }

      if (url.includes("/api/contact")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            data: {
              success: true,
              message: "Message delivered successfully"
            }
          })
        });
      }

      return Promise.resolve({
        ok: true,
        json: async () => ({ data: {} })
      });
    })
  );
});

describe("App routes", () => {
  it("renders the public home content", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("David Fernandez-Cuenca Marcos")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Featured projects")).toBeInTheDocument();
      expect(screen.getByText("Project one")).toBeInTheDocument();
    });
  });

  it("renders the private workspace shell on the private route", () => {
    render(
      <MemoryRouter initialEntries={["/studio-503"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Private workspace")).toBeInTheDocument();
    expect(screen.getByLabelText("Identifier")).toBeInTheDocument();
  });
});
