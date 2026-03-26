require("dotenv").config();
const express = require("express"); 
const ConnectDB = require("./config/db"); 
const jobRoutes = require("./Routes/jobs")
const cors = require("cors");
const Job = require("./model/Jobs");


const app = express();

ConnectDB();

async function seedDatabaseOnStartup() {
  try {
    const jobCount = await Job.countDocuments();
    
    if (jobCount === 0) {
      console.log("Database is empty. Fetching jobs from API...");
      
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
          title: "Data Scientist",
          company: "AI Innovations",
          location: "Toronto, Canada",
          salary: 90000,
          description: "Work with machine learning and data analytics",
          requirements: ["Python", "TensorFlow", "SQL", "Data Analysis"]
        },
        {
          title: "UI/UX Designer",
          company: "Creative Hub",
          location: "Amsterdam, Netherlands",
          salary: 72000,
          description: "Design amazing user experiences",
          requirements: ["Figma", "UI Design", "Prototyping", "CSS"]
        }
      ];

      const result = await Job.insertMany(defaultJobs);
      console.log(`Successfully added ${result.length} jobs to database on startup!`);
    } else {
      console.log(`Database already has ${jobCount} jobs`);
    }
  } catch (error) {
    console.error("Error seeding database on startup:", error);
  }
}

seedDatabaseOnStartup();
 
app.get("/", (req, res) => {
  res.send("Server is running");
}); 

app.use(cors());
app.use(express.json()); 
app.use("/api/jobs", jobRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
