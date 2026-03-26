import { useEffect, useState } from "react";
import JobCard from "../JobCard";
import jobAPI from "../../services/jobAPI";
import "./AllJobs.css";

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const data = await jobAPI.getAllJobs();
      setJobs(data || []);
    } catch (error) {
      console.error("Error loading jobs:", error);
      alert("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (job) => {
    try {
      const updated = await jobAPI.toggleFavorite(job._id);
      setJobs(jobs.map(j => j._id === job._id ? updated : j));
      const message = updated.isFavorite ? "Added to favorites" : "Removed from favorites";
      alert(message);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update favorite");
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await jobAPI.deleteJob(jobId);
        setJobs(jobs.filter(j => j._id !== jobId));
        alert("Job deleted successfully");
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to delete job");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading jobs...</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info text-center">
          <h4>No jobs found</h4>
          <p>Start by adding a job listing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="alljobs-page">
      <div className="container mt-4">
        <h2 className="text-center mb-2">All Job Listings</h2>
        <p className="text-center text-muted mb-4">Total: {jobs.length} jobs</p>

        <div className="jobs-grid">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onFavorite={handleFavorite}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
