import { useEffect, useState } from "react";
import JobCard from "../JobCard";
import jobAPI from "../../services/jobAPI";

export default function FavoriteJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavoriteJobs();
  }, []);

  const loadFavoriteJobs = async () => {
    try {
      setLoading(true);
      const data = await jobAPI.getFavoriteJobs();
      setJobs(data || []);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to load favorite jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (jobId) => {
    try {
      await jobAPI.toggleFavorite(jobId);
      setJobs(jobs.filter(j => j._id !== jobId));
      alert("Removed from favorites");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to remove favorite");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading favorites...</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info text-center">
          <h4>No favorite jobs yet</h4>
          <p>Mark jobs as favorites to see them here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="alljobs-page">
      <div className="container mt-4">
        <h2 className="text-center mb-2">Saved Jobs</h2>
        <p className="text-center text-muted mb-4">Total: {jobs.length} saved jobs</p>

        <div className="jobs-grid">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onFavorite={handleRemoveFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
