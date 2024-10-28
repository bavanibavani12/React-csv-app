import React, { useState } from 'react';
import FileUpload from './components/fileupload';
import Dashboard from './components/Dashboard';

const App = () => {
    const [analysisData, setAnalysisData] = useState(null);
    const [aiResponses, setAiResponses] = useState([]);

    const handleUploadComplete = (data) => {
        setAnalysisData(data.analysis.Year);
        setAiResponses(data.aiResponses);
        console.log(data.aiResponses)
        console.log(data.analysis)
    };

    return (
        <div>
            <FileUpload onUploadComplete={handleUploadComplete} />
            {analysisData && <Dashboard analysisData={analysisData} aiResponses={aiResponses} />}
        </div>
    );
};

export default App;
