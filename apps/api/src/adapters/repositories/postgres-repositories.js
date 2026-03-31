const toCamelProject = (row) => ({
  id: String(row.id),
  title: row.title,
  description: row.description,
  technologies: row.technologies ?? [],
  githubUrl: row.github_url ?? "",
  liveUrl: row.live_url ?? "",
  featured: row.featured,
  status: row.status ?? "active",
  createdAt: row.created_at?.toISOString?.() ?? new Date(row.created_at).toISOString(),
  updatedAt: row.updated_at?.toISOString?.() ?? new Date(row.updated_at).toISOString()
});

const toCamelPost = (row) => ({
  id: String(row.id),
  title: row.title,
  excerpt: row.excerpt,
  content: row.content,
  tags: row.tags ?? [],
  published: row.published,
  createdAt: row.created_at?.toISOString?.() ?? new Date(row.created_at).toISOString(),
  updatedAt: row.updated_at?.toISOString?.() ?? new Date(row.updated_at).toISOString()
});

export const createPostgresProjectRepository = (pool) => ({
  async list() {
    const result = await pool.query(
      "select * from projects order by featured desc, updated_at desc"
    );
    return result.rows.map(toCamelProject);
  },
  async getById(id) {
    const result = await pool.query("select * from projects where id = $1", [id]);
    return result.rows[0] ? toCamelProject(result.rows[0]) : null;
  },
  async create(project) {
    const result = await pool.query(
      `insert into projects (title, description, technologies, github_url, live_url, featured, status)
       values ($1, $2, $3, $4, $5, $6, $7)
       returning *`,
      [
        project.title,
        project.description,
        project.technologies,
        project.githubUrl,
        project.liveUrl,
        project.featured,
        project.status
      ]
    );
    return toCamelProject(result.rows[0]);
  },
  async update(id, project) {
    const result = await pool.query(
      `update projects
       set title = $2, description = $3, technologies = $4, github_url = $5, live_url = $6, featured = $7, status = $8, updated_at = now()
       where id = $1
       returning *`,
      [
        id,
        project.title,
        project.description,
        project.technologies,
        project.githubUrl,
        project.liveUrl,
        project.featured,
        project.status
      ]
    );
    return toCamelProject(result.rows[0]);
  },
  async remove(id) {
    await pool.query("delete from projects where id = $1", [id]);
  }
});

export const createPostgresBlogRepository = (pool) => ({
  async list({ published } = {}) {
    const hasPublished = typeof published === "boolean";
    const result = hasPublished
      ? await pool.query(
          "select * from blog_posts where published = $1 order by updated_at desc",
          [published]
        )
      : await pool.query("select * from blog_posts order by updated_at desc");
    return result.rows.map(toCamelPost);
  },
  async getById(id) {
    const result = await pool.query("select * from blog_posts where id = $1", [id]);
    return result.rows[0] ? toCamelPost(result.rows[0]) : null;
  },
  async create(post) {
    const result = await pool.query(
      `insert into blog_posts (title, excerpt, content, tags, published)
       values ($1, $2, $3, $4, $5)
       returning *`,
      [post.title, post.excerpt, post.content, post.tags, post.published]
    );
    return toCamelPost(result.rows[0]);
  },
  async update(id, post) {
    const result = await pool.query(
      `update blog_posts
       set title = $2, excerpt = $3, content = $4, tags = $5, published = $6, updated_at = now()
       where id = $1
       returning *`,
      [id, post.title, post.excerpt, post.content, post.tags, post.published]
    );
    return toCamelPost(result.rows[0]);
  },
  async remove(id) {
    await pool.query("delete from blog_posts where id = $1", [id]);
  }
});

export const createPostgresContactRepository = (pool) => ({
  async create(submission) {
    await pool.query(
      `insert into contact_submissions (name, email, subject, message, status)
       values ($1, $2, $3, $4, $5)`,
      [
        submission.name,
        submission.email,
        submission.subject,
        submission.message,
        submission.status
      ]
    );
    return submission;
  }
});

export const createPostgresUserRepository = (pool) => ({
  async getByUsername(username) {
    const result = await pool.query("select * from users where username = $1", [username]);
    if (!result.rows[0]) {
      return null;
    }
    const row = result.rows[0];
    return {
      id: String(row.id),
      username: row.username,
      email: row.email,
      role: row.role,
      passwordHash: row.password
    };
  }
});
