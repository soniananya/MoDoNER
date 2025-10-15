import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDprAnalysis } from '../data/mockAnalysis';

// This component simulates the multi-stage backend processing
const DprProcessingSimulator = ({ fileName, onComplete }) => {
    const [status, setStatus] = useState('Starting...');
    const [step, setStep] = useState(0);

    const pipeline = [
        { name: "Uploading File", duration: 1000 },
        { name: "Running OCR Extraction", duration: 2000 },
        { name: "Extracting Entities (NLP)", duration: 3000 },
        { name: "Performing Risk Analysis (ML)", duration: 2500 },
    ];

    useEffect(() => {
        if (step < pipeline.length) {
            const currentStep = pipeline[step];
            setStatus(`${currentStep.name} ⏳`);
            const timer = setTimeout(() => {
                setStatus(`${currentStep.name} ✅`);
                setStep(step + 1);
            }, currentStep.duration);
            return () => clearTimeout(timer);
        } else if (step === pipeline.length) {
            setStatus('Analysis Complete! Redirecting...');
            const finalTimer = setTimeout(() => onComplete(mockDprAnalysis.id), 1500);
            return () => clearTimeout(finalTimer);
        }
    }, [step, onComplete]);

    return (
        <div className="processing-status">
            <h4>Processing: {fileName}</h4>
            <p>{status}</p>
            <div className="progress-bar">
                <div className="progress-bar-inner" style={{ width: `${(step / pipeline.length) * 100}%` }}></div>
            </div>
        </div>
    );
};

const DprUploader = () => {
    const [fileName, setFileName] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleAnalyze = () => {
        if (fileName) {
            setIsProcessing(true);
        }
    };

    const handleProcessingComplete = (dprId) => {
        navigate(`/report/${dprId}`);
    };

    if (isProcessing) {
        return (
            <div className="card">
                <DprProcessingSimulator fileName={fileName} onComplete={handleProcessingComplete} />
            </div>
        );
    }

    return (
        <div className="card uploader-card">
            <h3><i className="fas fa-upload"></i> Upload New DPR for Analysis</h3>
            <p>Select or drop a PDF document to begin the evaluation process.</p>
            <div className="uploader-box">
                <input type="file" id="dpr-upload" onChange={handleFileChange} accept=".pdf" />
                <label htmlFor="dpr-upload">
                    <i className="fas fa-file-pdf"></i>
                    <span>{fileName || "Click to browse or drag & drop"}</span>
                </label>
            </div>
            {fileName && (
                <button onClick={handleAnalyze} className="analyze-btn">
                    Analyze {fileName}
                </button>
            )}
        </div>
    );
};

export default DprUploader;