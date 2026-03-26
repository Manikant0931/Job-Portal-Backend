const express = require("express");
const router = express.Router();
const Job = require("../model/Jobs");

router.get("/stats/overview", async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const favoriteJobs = await Job.countDocuments({ isFavorite: true });
    
    const avgSalary = await Job.aggregate([
      { $group: { _id: null, avg: { $avg: "$salary" } } }
    ]);

    const companies = await Job.distinct("company");
    const locations = await Job.distinct("location");

    res.json({
      success: true,
      data: {
        totalJobs,
        favoriteJobs,
        averageSalary: Math.round(avgSalary[0]?.avg || 0),
        totalCompanies: companies.length,
        totalLocations: locations.length,
        topCompanies: companies.slice(0, 5),
        topLocations: locations.slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, company, location, salary, description, requirements } = req.body;

    if (!title || !company || !location || !salary) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, company, location, salary"
      });
    }

    const job = new Job({
      title,
      company,
      location,
      salary,
      description: description || "",
      requirements: Array.isArray(requirements) ? requirements : []
    });

    const savedJob = await job.save();
    res.status(201).json({
      success: true,
      message: "Job created successfully!",
      data: savedJob
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { sort = "-createdAt", limit = 50, company, location, isFavorite } = req.query;
    
    let query = {};
    if (company) query.company = company;
    if (location) query.location = location;
    if (isFavorite === "true") query.isFavorite = true;
    if (isFavorite === "false") query.isFavorite = false;

    const jobs = await Job.find(query)
      .sort(sort)
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/filter/company/:company", async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.params.company });
    res.json({
      success: true,
      count: jobs.length,
      company: req.params.company,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/filter/location/:location", async (req, res) => {
  try {
    const jobs = await Job.find({ location: req.params.location });
    res.json({
      success: true,
      count: jobs.length,
      location: req.params.location,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/filter/salary/:minSalary/:maxSalary", async (req, res) => {
  try {
    const { minSalary, maxSalary } = req.params;
    const jobs = await Job.find({
      salary: { $gte: parseInt(minSalary), $lte: parseInt(maxSalary) }
    });

    res.json({
      success: true,
      count: jobs.length,
      salaryRange: `$${minSalary} - $${maxSalary}`,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
        { location: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ]
    });

    res.json({
      success: true,
      count: jobs.length,
      searchTerm: q,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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

    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
      message: "Job updated successfully!",
      data: job
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
      message: "Job deleted successfully!",
      data: job
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:id/favorite", async (req, res) => {
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
      message: updatedJob.isFavorite ? "Added to favorites!" : "Removed from favorites",
      data: updatedJob
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/favorited/list", async (req, res) => {
  try {
    const jobs = await Job.find({ isFavorite: true });

    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
