# Portfolio & Blog API

A RESTful API built with Node.js, Express, and MongoDB for managing a personal portfolio and blog.

## Live URLs

- **API URL**: [Your deployed API URL]
- **Frontend URL**: [Your deployed frontend URL]

## Features

- User authentication with JWT
- Project management (CRUD)
- Blog posts with comments
- Contact form messages
- Secure password hashing with bcrypt

## Tech Stack

- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing
- Helmet for security headers

## API Endpoints

### Users
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/register` | Register new user | Public |
| POST | `/api/users/login` | Login user | Public |
| GET | `/api/users/me` | Get current user | Private |

### Projects
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create project | Private |
| PUT | `/api/projects/:id` | Update project | Private |
| DELETE | `/api/projects/:id` | Delete project | Private |

### Blog Posts
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog` | Get all posts | Public |
| GET | `/api/blog/:id` | Get single post with comments | Public |
| POST | `/api/blog` | Create post | Private |
| PUT | `/api/blog/:id` | Update post (author only) | Private |
| DELETE | `/api/blog/:id` | Delete post (author only) | Private |

### Comments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog/:postId/comments` | Get comments for post | Public |
| POST | `/api/blog/:postId/comments` | Create comment | Private |

### Contact
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Send contact message | Public |
| GET | `/api/contact` | Get all messages | Private |
| PUT | `/api/contact/:id/read` | Mark as read | Private |
| DELETE | `/api/contact/:id` | Delete message | Private |

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
4. Run the server:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## Request Examples

### Register User
```json
POST /api/users/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```json
POST /api/users/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Project (Protected)
```json
POST /api/projects
Headers: { "Authorization": "Bearer <token>" }
{
  "title": "My Awesome Project",
  "description": "A cool project I built",
  "imageUrl": "https://example.com/image.jpg",
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://myproject.com",
  "technologies": ["React", "Node.js", "MongoDB"]
}
```

### Create Blog Post (Protected)
```json
POST /api/blog
Headers: { "Authorization": "Bearer <token>" }
{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "tags": ["javascript", "web development"]
}
```

### Send Contact Message
```json
POST /api/contact
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello, I would like to connect!"
}
```

## License

MIT
