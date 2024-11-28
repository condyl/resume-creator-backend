# Resume Generator

This project is a resume generator that uses LaTeX to create professional resumes. It includes features for uploading resumes, improving text, and generating feedback using OpenAI's GPT models.

## Lost?

This repository only includes the backend for this project.  If you would like to see the frontend code, you can find it [here](https://github.com/condyl/resume-creator-frontend).

## Features

- **Resume Generation**: Generate resumes in PDF format using LaTeX templates.
- **Text Improvement**: Improve resume text using OpenAI's GPT-3.5-turbo model.
- **Feedback Generation**: Generate feedback for resumes using OpenAI's text-davinci-003 model.
- **File Upload**: Upload and parse PDF resumes.


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/condyl/resume-creator-backend.git
    cd resume-creator-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Copy `config-sample.json` to `config.json` and add your OpenAI API key:
    ```sh
    cp config-sample.json config.json
    ```

4. Ensure the `uploads` directory exists:
    ```sh
    mkdir uploads
    ```

## Usage

1. Start the server:
    ```sh
    node index.js
    OR 
    nodemon index.js
    ```

2. The server will run on `http://localhost:5000`.

### Endpoints

- **POST /api/uploads**: Upload a resume PDF.
- **POST /api/generate-resume**: Generate a resume PDF.
- **POST /api/improve-text**: Improve resume text.

## Contributions

Contributions are welcome! Please open an issue or submit a pull request for any changes.