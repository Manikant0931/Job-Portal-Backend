const axios = require("axios");

const externalJobAPIs = {
  mockJobs: async () => {
    return [
      {
        title: "Senior React Developer",
        company: "TechStartup",
        location: "San Francisco, USA",
        salary: 120000,
        description: "Build scalable React applications for millions of users",
        requirements: ["React", "TypeScript", "REST APIs", "Redux", "Testing"]
      },
      {
        title: "Backend Engineer",
        company: "CloudServices Inc",
        location: "Remote",
        salary: 110000,
        description: "Design and implement backend microservices",
        requirements: ["Node.js", "Python", "Kubernetes", "AWS", "PostgreSQL"]
      },
      {
        title: "Full Stack Engineer",
        company: "WebPlatform Co",
        location: "Austin, USA",
        salary: 105000,
        description: "Work on full MERN stack applications",
        requirements: ["React", "Express", "MongoDB", "Node.js", "AWS"]
      },
      {
        title: "DevOps Engineer",
        company: "Infrastructure Systems",
        location: "Berlin, Germany",
        salary: 115000,
        description: "Manage cloud infrastructure and CI/CD pipelines",
        requirements: ["Docker", "Kubernetes", "Jenkins", "AWS", "Terraform"]
      },
      {
        title: "Frontend Developer",
        company: "DesignStudio",
        location: "New York, USA",
        salary: 95000,
        description: "Create beautiful and responsive web interfaces",
        requirements: ["React", "Vue.js", "CSS", "JavaScript", "Figma"]
      }
    ];
  },

  githubJobs: async () => {
    try {
      const response = await axios.get("https://api.github.com/jobs", {
        params: { description: "javascript", page: 1 }
      });
      return response.data.map(job => ({
        title: job.title,
        company: job.company,
        location: job.location,
        salary: Math.floor(Math.random() * 50000 + 50000),
        description: job.description,
        requirements: ["JavaScript", "GitHub", "Development"]
      }));
    } catch (error) {
      console.error("Error fetching from GitHub Jobs API:", error.message);
      return [];
    }
  },

  customPublicAPI: async () => {
    try {
      const response = await axios.get("https://api.example.com/jobs", {
        timeout: 5000
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching from custom API:", error.message);
      return [];
    }
  },

  formatJobData: (externalJob) => {
    return {
      title: externalJob.title || "Job Title",
      company: externalJob.company || "Company Name",
      location: externalJob.location || "Location",
      salary: externalJob.salary || Math.floor(Math.random() * 50000 + 50000),
      description: externalJob.description || "Job description",
      requirements: Array.isArray(externalJob.requirements) 
        ? externalJob.requirements 
        : ["Skill 1", "Skill 2", "Skill 3"]
    };
  }
};

module.exports = externalJobAPIs;
