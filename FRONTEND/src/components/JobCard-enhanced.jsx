import "./JobCard.css";

function JobCard({ job, onFavorite, onDelete }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card job-card h-100 shadow-sm">
        <div className="card-header job-card-header">
          <h5 className="card-title mb-0">{job.title}</h5>
          <span className={`badge ${job.isFavorite ? "bg-danger" : "bg-secondary"}`}>
            {job.isFavorite ? "Favorite" : "Not Favorite"}
          </span>
        </div>

        <div className="card-body d-flex flex-column">
          <p className="card-text mb-2">
            <strong>Company:</strong> {job.company}
          </p>
          <p className="card-text mb-2">
            <strong>Location:</strong> {job.location}
          </p>
          <p className="card-text mb-2">
            <strong>Salary:</strong> ${job.salary.toLocaleString()}
          </p>

          {job.description && (
            <p className="card-text mb-2 description">
              <strong>Description:</strong> {job.description}
            </p>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div className="mb-2">
              <strong>Requirements:</strong>
              <div className="requirements-tags">
                {job.requirements.map((req, idx) => (
                  <span key={idx} className="badge bg-info">
                    {req}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="card-footer-custom mt-auto pt-3">
            <button
              className={`btn btn-sm w-100 mb-2 ${
                job.isFavorite ? "btn-danger" : "btn-primary"
              }`}
              onClick={() => onFavorite(job)}
            >
              {job.isFavorite ? "Remove Favorite" : "Add Favorite"}
            </button>
            {onDelete && (
              <button
                className="btn btn-sm btn-outline-danger w-100"
                onClick={() => onDelete(job._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
