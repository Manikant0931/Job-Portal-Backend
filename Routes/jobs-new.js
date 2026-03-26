const express = require("express");
const router = express.Router();
const Job = require("../model/Jobs");

router.post("/", async (req, res) => {
  try {
    const { title, company, location, salary, description, requirements } = req.body;

    if (!title || !company || !location || salary === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, company, location, and salary"
      });
    }

    const job = new Job({
      title,
      company,
      location,
      salary,
      description: description || "",
      requirements: requirements || []
    });

    const savedJob = await job.save();
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: savedJob
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error creating job"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const { sort = "-createdAt", limit = 50 } = req.query;
    
    const jobs = await Job.find()
      .sort(sort)
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching jobs"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching job"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.json({
      success: true,
      message: "Job updated successfully",
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error updating job"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.json({
      success: true,
      message: "Job deleted successfully",
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting job"
    });
  }
});

router.put("/favorite/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { isFavorite: !job.isFavorite },
      { new: true }
    );

    res.json({
      success: true,
      message: updatedJob.isFavorite ? "Added to favorites" : "Removed from favorites",
      data: updatedJob
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error toggling favorite"
    });
  }
});

router.get("/search/query", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query required"
      });
    }

    const jobs = await Job.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { company: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } }
      ]
    });

    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error searching jobs"
    });
  }
});

module.exports = router;
