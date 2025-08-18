-- Database Schema for David Fernández-Cuenca Portfolio
-- PostgreSQL Database Setup

-- Enable UUID extension (optional, for UUID primary keys)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Hashed with bcrypt
    role VARCHAR(50) DEFAULT 'admin',
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table for portfolio projects
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies TEXT[], -- Array of technology names
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    github_id BIGINT, -- GitHub repository ID for syncing
    github_metadata JSONB, -- Additional GitHub data
    order_index INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active', -- active, archived, draft
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE, -- URL-friendly version of title
    content TEXT NOT NULL,
    excerpt TEXT,
    tags TEXT[], -- Array of tags
    published BOOLEAN DEFAULT false,
    author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    reading_time INTEGER, -- Estimated reading time in minutes
    language VARCHAR(10) DEFAULT 'es', -- Post language
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    language VARCHAR(10) DEFAULT 'es',
    ip_address INET,
    user_agent TEXT,
    status VARCHAR(50) DEFAULT 'new', -- new, read, replied, archived
    replied_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table (optional, for custom analytics)
CREATE TABLE IF NOT EXISTS analytics_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL, -- page_view, form_submit, etc.
    event_data JSONB,
    user_agent TEXT,
    ip_address INET,
    referrer VARCHAR(500),
    session_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table (optional, for dynamic skills management)
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- frontend, backend, tools, other
    description TEXT,
    icon VARCHAR(50), -- Emoji or icon class
    proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 5), -- 1-5 skill level
    years_experience INTEGER,
    is_featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_language ON blog_posts(language);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);

CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);

CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_featured ON skills(is_featured);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data insertion (uncomment to use)
/*
-- Insert default admin user (password: 'admin123' - CHANGE THIS!)
INSERT INTO users (username, email, password, first_name, last_name) VALUES
('admin', 'david.fdezcuenca@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'David', 'Fernández-Cuenca');

-- Insert sample skills
INSERT INTO skills (name, category, description, icon, proficiency, years_experience, is_featured, order_index) VALUES
('Node.js', 'backend', 'Backend development with Express and REST APIs', '🚀', 5, 8, true, 1),
('Python', 'backend', 'Backend development and AI/ML', '🐍', 5, 10, true, 2),
('React', 'frontend', 'Modern frontend development', '⚛️', 4, 5, true, 3),
('PostgreSQL', 'backend', 'Database design and optimization', '🗄️', 4, 8, true, 4),
('Docker', 'tools', 'Containerization and deployment', '🐳', 4, 6, true, 5),
('AWS', 'tools', 'Cloud infrastructure and services', '☁️', 3, 4, false, 6);

-- Insert sample project
INSERT INTO projects (title, description, technologies, github_url, featured) VALUES
('Portfolio Website', 'Personal portfolio built with React and Node.js', ARRAY['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'], 'https://github.com/illuminatus503/portfolio', true);
*/

-- View for published blog posts
CREATE OR REPLACE VIEW published_blog_posts AS
SELECT 
    id, title, slug, content, excerpt, tags, author_id, image_url, 
    view_count, reading_time, language, created_at, updated_at, published_at
FROM blog_posts 
WHERE published = true
ORDER BY published_at DESC;

-- View for featured projects
CREATE OR REPLACE VIEW featured_projects AS
SELECT 
    id, title, description, technologies, github_url, live_url, image_url,
    github_metadata, order_index, created_at, updated_at
FROM projects 
WHERE featured = true AND status = 'active'
ORDER BY order_index ASC, created_at DESC;

-- Function to generate blog post slug
CREATE OR REPLACE FUNCTION generate_slug(title TEXT) 
RETURNS TEXT AS $$
BEGIN
    RETURN LOWER(
        REGEXP_REPLACE(
            REGEXP_REPLACE(
                UNACCENT(title), 
                '[^a-zA-Z0-9\s-]', '', 'g'
            ), 
            '\s+', '-', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate slug for blog posts
CREATE OR REPLACE FUNCTION set_blog_post_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = generate_slug(NEW.title);
        
        -- Ensure slug uniqueness
        WHILE EXISTS (SELECT 1 FROM blog_posts WHERE slug = NEW.slug AND id != COALESCE(NEW.id, 0)) LOOP
            NEW.slug = NEW.slug || '-' || EXTRACT(EPOCH FROM NOW())::INTEGER;
        END LOOP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_blog_post_slug_trigger 
    BEFORE INSERT OR UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION set_blog_post_slug();

-- Function to set published_at when post is published
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.published = true AND (OLD.published = false OR OLD.published IS NULL) THEN
        NEW.published_at = CURRENT_TIMESTAMP;
    ELSIF NEW.published = false THEN
        NEW.published_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_published_at_trigger 
    BEFORE INSERT OR UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION set_published_at();

-- Grant permissions (adjust as needed for your database setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;
-- GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO your_app_user;
