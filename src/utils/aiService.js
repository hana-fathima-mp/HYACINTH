export const analyzeResume = async (text, jobRole) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock Response
    // In a real app, this would be a POST request to Gemini API
    return {
        score: 85,
        summary:
            `A strong resume with a good focus on skills relevant to **${jobRole}**. The candidate demonstrates solid experience with React and modern JavaScript workflows.`,
        skills: ["React", "JavaScript", "HTML/CSS", "Node.js", "Git"],
        suggestions: [
            `Add more keywords related to **${jobRole}**.`,
            "Consider quantifying achievements (e.g., 'Improved performance by 20%').",
            "Add a dedicated 'Projects' section if not already present.",
            "Ensure contact information is clearly visible at the top.",
        ],
    };
};
