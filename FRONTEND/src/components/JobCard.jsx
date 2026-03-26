import "./JobCard.css";

function JobCard({ job, onFavorite, onDelete }) {
  return (
    <div className="job-card">
      {/* Job Header */}
      <div className="card-header">
        <div className="header-top">
          <h3 className="job-title">{job.title}</h3>
          <button 
            className={`favorite-btn ${job.isFavorite ? "active" : ""}`}
            onClick={() => onFavorite(job)}
            title={job.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {job.isFavorite ? "SAVED" : "SAVE"}
          </button>
        </div>
        <p className="company-name">{job.company}</p>
      </div>

      {/* Job Details */}
      <div className="card-body">
        <div className="detail-item">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{job.location}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Salary:</span>
          <span className="detail-value">${job.salary?.toLocaleString() || job.salary}/year</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Type:</span>
          <span className="detail-value">{job.jobType || "Not specified"}</span>
        </div>

        {job.description && (
          <div className="description">
            <p>{job.description.substring(0, 120)}{job.description.length > 120 ? "..." : ""}</p>
          </div>
        )}

        {job.requirements && job.requirements.length > 0 && (
          <div className="skills-section">
            <span className="detail-label">Required Skills:</span>
            <div className="skills-list">
              {job.requirements.slice(0, 4).map((skill, idx) => (
                <span key={idx} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="card-footer">
        <button
          className={`action-btn favorite-action ${job.isFavorite ? "saved" : ""}`}
          onClick={() => onFavorite(job)}
        >
          {job.isFavorite ? "Saved" : "Save Job"}
        </button>
        {onDelete && (
          <button 
            className="action-btn delete-action" 
            onClick={() => onDelete(job._id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default JobCard;