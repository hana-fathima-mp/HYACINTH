import { useState } from 'react'
import './App.css'
import { extractTextFromPDF } from './utils/pdfUtils'
import { analyzeResume } from './utils/aiService'
import AnalysisResult from './components/AnalysisResult'

const JOB_ROLES = [
  "Cyber security",
  "SOC analyst",
  "Data analyst",
  "Software engineer",
  "Full-stack developer",
  "Mobile app developer",
  "Web developer",
  "Cloud engineer",
  "AI engineer",
  "Data scientist",
];

function HYACINTH() {
  const [step, setStep] = useState(1); // 1: Upload, 2: Select Job, 3: Analysis
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [pdfText, setPdfText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0]
    setError('')
    setPdfText('')
    setFile(null)
    setAnalysisResult(null)

    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file.')
        return
      }

      if (selectedFile.size > 100 * 1024) { // 100kb limit
        setError('File size must be under 100kb.')
        return
      }

      setFile(selectedFile)
      setIsLoading(true)

      try {
        const text = await extractTextFromPDF(selectedFile)
        setPdfText(text)
      } catch (err) {
        setError('Failed to read PDF file.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleNextToJobs = () => {
    if (file && pdfText) {
      setStep(2);
    }
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  const handleAnalyze = async () => {
    if (!pdfText || !selectedJob) return;

    setStep(3);
    setIsAnalyzing(true);
    try {
      const result = await analyzeResume(pdfText, selectedJob);
      setAnalysisResult(result);
    } catch (err) {
      setError('Analysis failed. Please try again.');
      setStep(2); // Go back if failed
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setFile(null);
    setPdfText('');
    setSelectedJob(null);
    setAnalysisResult(null);
    setError('');
  };

  return (
    <div className="container">
      <h1 className="title">HYACINTH</h1>

      {/* STEP 1: UPLOAD */}
      {step === 1 && (
        <div className="upload-section">
          <label htmlFor="resume-upload" className="upload-label">
            Upload Resume (PDF under 100kb)
          </label>
          <input
            type="file"
            id="resume-upload"
            accept=".pdf"
            onChange={handleFileChange}
            className="file-input"
            disabled={isLoading}
          />
          {isLoading && <p className="loading-message">Reading PDF...</p>}
          {error && <p className="error-message">{error}</p>}
          {file && !isLoading && !error && (
            <div className="file-actions">
              <p className="success-message">File loaded: {file.name}</p>
              <button
                className="primary-button"
                onClick={handleNextToJobs}
              >
                Next: Select Job Role
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: JOB SELECTION */}
      {step === 2 && (
        <div className="job-selection-section">
          <h2>Select Target Job Role</h2>
          <div className="job-grid">
            {JOB_ROLES.map((job) => (
              <button
                key={job}
                className={`job-card ${selectedJob === job ? 'selected' : ''}`}
                onClick={() => handleJobSelect(job)}
              >
                {job}
              </button>
            ))}
          </div>
          <div className="action-buttons">
            <button className="secondary-button" onClick={() => setStep(1)}>Back</button>
            <button
              className="primary-button"
              onClick={handleAnalyze}
              disabled={!selectedJob}
            >
              Analyze Resume
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ANALYSIS RESULT */}
      {step === 3 && (
        <div className="analysis-section">
          {isAnalyzing && (
            <div className="analyzing-state">
              <p>Analyzing resume for <strong>{selectedJob}</strong> role...</p>
              <div className="spinner"></div>
            </div>
          )}

          {!isAnalyzing && analysisResult && (
            <>
              <div className="result-header">
                <p>Analysis for: <strong>{selectedJob}</strong></p>
                <button className="secondary-button small" onClick={handleReset}>Start Over</button>
              </div>
              <AnalysisResult result={analysisResult} />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default HYACINTH
