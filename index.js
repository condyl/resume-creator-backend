const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { OpenAI } = require("openai");
const multer = require("multer");
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json")));

const openai = new OpenAI({
    apiKey: config.openaiApiKey,
});

const app = express();
const PORT = config.port;

app.use(cors());
app.use(express.json());

const { storage, ensureUploadsDir } = require("./src/storage");
const { generateResume } = require("./src/resumeGenerator");
const { improveText } = require("./src/improveTextHandler");

const upload = multer({ storage });

ensureUploadsDir();

app.post("/api/generate-resume", generateResume);
app.post("/api/improve-text", improveText);
app.get('/', (req, res)=>{ return res.status(200).json({ ok : true, message : "OK", status : 200 }) });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
