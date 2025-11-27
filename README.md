# Portfolio & Blog API

A RESTful API built with Node.js, Express, and MongoDB for managing a personal portfolio and blog.

## Live URLs

- **API URL**: https://portfolio-api-steel.vercel.app
- **Frontend URL**: https://portfolio-frontend-one-mu.vercel.app

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

### Root
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info and available endpoints |

### Users
| Method | Endpoint | Description | Access | Request Body |
|--------|----------|-------------|--------|--------------|
| POST | `/api/users/register` | Register new user | Public | `{ username, email, password }` |
| POST | `/api/users/login` | Login user | Public | `{ email, password }` |
| GET | `/api/users/me` | Get current user | Private | - |

### Projects
| Method | Endpoint | Description | Access | Request Body |
|--------|----------|-------------|--------|--------------|
| GET | `/api/projects` | Get all projects | Public | - |
| GET | `/api/projects/:id` | Get single project | Public | - |
| POST | `/api/projects` | Create project | Private | `{ title, description, imageUrl, repoUrl, liveUrl, technologies }` |
| PUT | `/api/projects/:id` | Update project | Private | `{ title, description, imageUrl, repoUrl, liveUrl, technologies }` |
| DELETE | `/api/projects/:id` | Delete project | Private | - |

### Blog Posts
| Method | Endpoint | Description | Access | Request Body |
|--------|----------|-------------|--------|--------------|
| GET | `/api/blog` | Get all posts | Public | - |
| GET | `/api/blog/:id` | Get single post with comments | Public | - |
| POST | `/api/blog` | Create post | Private | `{ title, content, tags }` |
| PUT | `/api/blog/:id` | Update post (author only) | Private | `{ title, content, tags }` |
| DELETE | `/api/blog/:id` | Delete post (author only) | Private | - |

### Comments
| Method | Endpoint | Description | Access | Request Body |
|--------|----------|-------------|--------|--------------|
| GET | `/api/blog/:postId/comments` | Get comments for post | Public | - |
| POST | `/api/blog/:postId/comments` | Create comment | Private | `{ content }` |

### Contact
| Method | Endpoint | Description | Access | Request Body |
|--------|----------|-------------|--------|--------------|
| POST | `/api/contact` | Send contact message | Public | `{ name, email, message }` |
| GET | `/api/contact` | Get all messages | Private | - |
| PUT | `/api/contact/:id/read` | Mark as read | Private | - |
| DELETE | `/api/contact/:id` | Delete message | Private | - |

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database (local or MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ChenYiqi-17/portfolio-api.git
   cd portfolio-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with:
   ```env
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
```http
POST /api/users/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Create Project (Protected)
```http
POST /api/projects
Content-Type: application/json
Authorization: Bearer <token>

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
```http
POST /api/blog
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "tags": ["javascript", "web development"]
}
```

### Send Contact Message
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello, I would like to connect!"
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

Obtain a token by logging in via `/api/users/login`.

## Error Handling

The API returns consistent error responses:
```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## License

MIT
