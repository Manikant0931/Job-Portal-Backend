import { Link } from "react-router-dom";
import jobAPI from "../../services/jobAPI";

function Navbar() {
  const handleRefreshData = async () => {
    try {
      const response = await jobAPI.refreshJobs();
      alert(`Jobs refreshed successfully! ${response.count} jobs loaded.`);
      window.location.reload();
    } catch (error) {
      alert("Failed to refresh jobs. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Job Portal
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            All Jobs
          </Link>

          <Link className="nav-link" to="/favorites">
            Favorite Jobs
          </Link>
         
          <Link className="nav-link" to="/about">
            About Me
          </Link>

          <button 
            className="nav-link btn btn-sm btn-primary ms-2"
            onClick={handleRefreshData}
          >
            Refresh Data
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;