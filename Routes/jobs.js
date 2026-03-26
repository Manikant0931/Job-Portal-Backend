const express = require("express");
const router = express.Router();
const Job = require("../model/Jobs");

router.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.json(savedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id/favorite", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { isFavorite: !job.isFavorite },
      { new: true }
    );
    
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/refresh/seed", async (req, res) => {
  try {
    await Job.deleteMany({});
    
    const defaultJobs = [
      {
        title: "React Developer",
        company: "Tech Corp",
        location: "New York, USA",
        salary: 75000,
        description: "Looking for an experienced React developer to join our team",
        requirements: ["React", "JavaScript", "CSS", "REST APIs"]
      },
      {
        title: "Node.js Backend Developer",
        company: "StartUp Inc",
        location: "San Francisco, USA",
        salary: 85000,
        description: "Build scalable backend services with Node.js",
        requirements: ["Node.js", "Express", "MongoDB", "Docker"]
      },
      {
        title: "Full Stack Developer",
        company: "WebSolutions Ltd",
        location: "London, UK",
        salary: 70000,
        description: "Full MERN stack developer for exciting projects",
        requirements: ["React", "Node.js", "MongoDB", "AWS"]
      },
      {
        title: "Frontend Engineer",
        company: "Digital Agency",
        location: "Remote",
        salary: 65000,
        description: "Create beautiful and responsive user interfaces",
        requirements: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
      },
      {
        title: "MERN Stack Developer",
        company: "Manikant Tech Solutions",
        location: "Mathura, India",
        salary: 50000,
        description: "Work on MERN stack projects with modern tech",
        requirements: ["MongoDB", "Express", "React", "Node.js"]
      },
      {
        title: "Database Administrator",
        company: "DataFlow Systems",
        location: "Bangalore, India",
        salary: 60000,
        description: "Manage and optimize MongoDB databases",
        requirements: ["MongoDB", "SQL", "Database Design", "Performance Tuning"]
      },
      {
        title: "DevOps Engineer",
        company: "CloudTech Solutions",
        location: "Berlin, Germany",
        salary: 95000,
        description: "Deploy and manage cloud infrastructure",
        requirements: ["Docker", "Kubernetes", "AWS", "Linux"]
      },
      {
        title: "Mobile App Developer",
        company: "AppWorks Studios",
        location: "Sydney, Australia",
        salary: 80000,
        description: "Develop native mobile applications",
        requirements: ["React Native", "JavaScript", "Firebase", "Git"]
      },
      {
        title: "UI/UX Designer",
        company: "Creative Studios",
        location: "Toronto, Canada",
        salary: 72000,
        description: "Design intuitive and beautiful user experiences",
        requirements: ["Figma", "UI Design", "CSS", "Prototyping"]
      },
      {
        title: "Senior JavaScript Developer",
        company: "Tech Innovations",
        location: "Amsterdam, Netherlands",
        salary: 95000,
        description: "Lead development team with advanced JavaScript expertise",
        requirements: ["JavaScript", "Node.js", "React", "System Design"]
      }
    ];

    const result = await Job.insertMany(defaultJobs);
    res.json({
      success: true,
      message: `Successfully refreshed ${result.length} jobs from database`,
      count: result.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;