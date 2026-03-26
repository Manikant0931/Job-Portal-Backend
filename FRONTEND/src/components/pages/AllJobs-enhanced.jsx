import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../JobCard";
import jobAPI from "../../services/jobAPI";
import "./AllJobs.css";

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("-createdAt");
  const [minSalary, setMinSalary] = useState("");

  useEffect(() => {
    fetchJobs();
  }, [sortBy]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobAPI.getAllJobs();
      setJobs(data || []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      alert("Failed to load jobs. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchJobs();
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/jobs/search/query?q=${searchTerm}`
      );
      setJobs(response.data.data || response.data);
    } catch {
      alert("Search failed");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSalary = minSalary ? job.salary >= parseInt(minSalary) : true;
    return matchesSalary;
  });

  const toggleFavorite = async (job) => {
    try {
      await jobAPI.toggleFavorite(job._id);
      setJobs(jobs.map((j) => (j._id === job._id ? { ...j, isFavorite: !j.isFavorite } : j)));
      alert(job.isFavorite ? "Removed from favorites" : "Added to favorites");
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      alert("Failed to update favorite status");
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await jobAPI.deleteJob(jobId);
      setJobs(jobs.filter((j) => j._id !== jobId));
      alert("Job deleted successfully");
    } catch {
      alert("Failed to delete job");
    }
  };

  return (
    <div className="container mt-4 all-jobs-container">
      <h2 className="text-danger text-center mb-4">All Jobs</h2>

      {/* Search and Filter Section */}
      <div className="search-filter-section mb-4">
        <form onSubmit={handleSearch} className="search-form">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Min Salary"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="-createdAt">Newest First</option>
                <option value="createdAt">Oldest First</option>
                <option value="-salary">High Salary</option>
                <option value="salary">Low Salary</option>
              </select>
            </div>
            <div className="col-md-3">
              <button type="submit" className="btn btn-primary w-100">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <p>Loading Jobs...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="alert alert-info text-center">
          {jobs.length === 0
            ? "No jobs available. Be the first to add one!"
            : "No jobs match your filters."}
        </div>
      ) : (
        <div className="row">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onFavorite={toggleFavorite}
              onDelete={deleteJob}
            />
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <small className="text-muted">Total Jobs: {filteredJobs.length}</small>
      </div>
    </div>
  );
}
