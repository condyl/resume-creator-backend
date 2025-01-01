# Resume Creator - Backend

The backend API service for the Resume Creator application, handling resume generation, PDF compilation, and data management.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- LaTeX distribution with pdflatex
- nodemon (optional, for development)

## LaTeX Installation

### macOS
```bash
# Install MacTeX (Full LaTeX distribution)
brew install --cask mactex

# OR for a smaller installation
brew install --cask mactex-no-gui

# After installation, ensure pdflatex is in your PATH
# You may need to restart your terminal
```

### Windows
1. Download and install MiKTeX from [MiKTeX downloads](https://miktex.org/download)
2. During installation, select "Install missing packages on the fly: Yes"
3. Ensure pdflatex is added to your system's PATH
4. You may need to restart your computer after installation

### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install texlive-full
```

## Setup Instructions

1. Clone the repository:
```bash
git clone <your-backend-repo-url>
cd <backend-directory>
```

2. Install dependencies:
```bash
npm install
# or
yarn install

# Optional: Install nodemon globally for development
npm install -g nodemon
# or
yarn global add nodemon
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your credentials:
# - SUPABASE_URL
# - SUPABASE_SERVICE_KEY
# - JWT_SECRET
# - PORT (optional, defaults to 3001)
```

4. Verify LaTeX installation:
```bash
# This should display the pdflatex version
pdflatex --version
```

5. Start the server:
```bash
# Using node
node index.js

# OR using nodemon for development (auto-reload on file changes)
nodemon index.js
```

The API will be available at `http://localhost:3001` (or your specified PORT).

## Environment Variables

Required environment variables:

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_KEY`: Your Supabase service role key (NOT the anon key)
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Port number for the server (optional, defaults to 3001)

## API Endpoints

- `/api/auth`: Authentication endpoints
- `/api/resume`: Resume CRUD operations
- `/api/pdf`: PDF generation endpoints

## Features

- User authentication and authorization
- Resume data management
- PDF generation with LaTeX templates
- File upload handling
- Secure API endpoints
- Integration with Supabase

## Tech Stack

- Node.js
- Express.js
- Supabase
- LaTeX (pdflatex) for PDF generation
- JWT for authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request