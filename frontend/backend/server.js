const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

mongoose.connect('mongodb://localhost:27017/csv_analysis', { useNewUrlParser: true, useUnifiedTopology: true });

// Define your MongoDB Schema here
const AnalysisSchema = new mongoose.Schema({
    data: Object,
    insights: String,
});
const Analysis = mongoose.model('Analysis', AnalysisSchema);

// API for file upload
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        const filePath = path.resolve(req.file.path);
        console.log(filePath)
        const response = await axios.post('http://localhost:5000/process', { filePath });
        console.log(response.data)
        // Save the processed data in MongoDB
        const analysis = new Analysis(response.data);
        await analysis.save();
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error processing file');
    }
});

// API for AI Q&A
app.post('/api/ask', async (req, res) => {
    const { question } = req.body;
    const response = await axios.post('http://localhost:5000/ask', { question });
    res.json(response.data);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
