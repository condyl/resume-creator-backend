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
# - SUPABASE_URL (from Supabase Project Settings > API > Project URL)
# - SUPABASE_SERVICE_KEY (from Supabase Project Settings > API > service_role key)
# - PORT (optional, defaults to 3001)
```

4. Create your config file:
```bash
# Copy the sample config file
cp config-sample.json config.json

# Edit config.json with your settings:
# - port: Your desired port number
# - openaiApiKey: Your OpenAI API key
```

5. Verify LaTeX installation:
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

## API Endpoints

* `GET /`: Health check endpoint
  - Returns: `{ ok: true, message: "OK", status: 200 }`

* `POST /api/generate-resume`: Generate a resume PDF
  - Body: Resume data object
  - Returns: Generated PDF file

* `POST /api/improve-text`: Improve text using AI
  - Body: Text to improve
  - Returns: Improved text suggestions

## Features

* Resume PDF generation with LaTeX templates
* AI-powered text improvement
* Health check endpoint
* File upload handling
* Integration with OpenAI API

## Tech Stack

* Node.js
* Express.js
* LaTeX (pdflatex) for PDF generation
* OpenAI API for text improvements
* Multer for file handling

##