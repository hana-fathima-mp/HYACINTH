function AnalysisResult({ result }) {
    if (!result) return null;

    return (
        <div className="analysis-result">
            <div className="score-container">
                <div className="score-circle">
                    <span className="score-value">{result.score}</span>
                    <span className="score-label">Score</span>
                </div>
            </div>

            <div className="section summary">
                <h3>Summary</h3>
                <p>{result.summary}</p>
            </div>

            <div className="section skills">
                <h3>Key Skills</h3>
                <div className="skills-list">
                    {result.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="section suggestions">
                <h3>Suggestions</h3>
                <ul>
                    {result.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AnalysisResult;
