import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const jobAPI = {
  getAllJobs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs`);
      return response.data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  },

  getJob: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching job:", error);
      throw error;
    }
  },

  createJob: async (jobData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/jobs`, jobData);
      return response.data;
    } catch (error) {
      console.error("Error creating job:", error);
      throw error;
    }
  },

  updateJob: async (id, jobData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      console.error("Error updating job:", error);
      throw error;
    }
  },

  deleteJob: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting job:", error);
      throw error;
    }
  },

  toggleFavorite: async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/jobs/${id}/favorite`);
      return response.data;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  },

  getFavoriteJobs: async () => {
    try {
      const allJobs = await jobAPI.getAllJobs();
      const favoriteJobs = allJobs.filter(job => job.isFavorite === true);
      return favoriteJobs;
    } catch (error) {
      console.error("Error fetching favorite jobs:", error);
      throw error;
    }
  },

  refreshJobs: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/jobs/refresh/seed`);
      return response.data;
    } catch (error) {
      console.error("Error refreshing jobs:", error);
      throw error;
    }
  }
};

export default jobAPI;
