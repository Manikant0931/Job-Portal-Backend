import { useState } from "react";
import jobAPI from "../../services/jobAPI";
import "./CreateJobForm.css";

export default function CreateJobForm({ onJobCreated, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    requirements: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.company || !formData.location || !formData.salary) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const jobData = {
        ...formData,
        salary: parseInt(formData.salary),
        requirements: formData.requirements
          .split(",")
          .map((req) => req.trim())
          .filter((req) => req)
      };

      await jobAPI.createJob(jobData);
      alert("Job created successfully!");
      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        requirements: ""
      });
      onJobCreated();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-job-modal">
      <div className="modal-overlay" onClick={onCancel}></div>
      <div className="create-job-form-container">
        <div className="form-header">
          <h3>Create New Job</h3>
          <button className="btn-close" onClick={onCancel}>&times;</button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Job Title *</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., React Developer"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Company Name *</label>
              <input
                type="text"
                className="form-control"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Tech Corp"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Location *</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., New York, USA"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Salary (Annual) *</label>
              <input
                type="number"
                className="form-control"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., 75000"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Job description..."
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Requirements (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="e.g., React, Node.js, MongoDB, AWS"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
