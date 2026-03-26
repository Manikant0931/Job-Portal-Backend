const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters"]
  },
  company: {
    type: String,
    required: [true, "Company name is required"],
    trim: true
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
    min: [0, "Salary cannot be negative"]
  },
  description: {
    type: String,
    trim: true,
    default: ""
  },
  requirements: {
    type: [String],
    default: []
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);