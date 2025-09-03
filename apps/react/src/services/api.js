// API service layer for DevTut React app
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Learning Modules
  async getModules() {
    return this.request('/modules');
  }

  async getModule(id) {
    return this.request(`/modules/${id}`);
  }

  async createModule(moduleData) {
    return this.request('/modules', {
      method: 'POST',
      body: JSON.stringify(moduleData),
    });
  }

  async updateModule(id, moduleData) {
    return this.request(`/modules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(moduleData),
    });
  }

  async deleteModule(id) {
    return this.request(`/modules/${id}`, {
      method: 'DELETE',
    });
  }

  // Lessons
  async getLessons(moduleId) {
    return this.request(`/modules/${moduleId}/lessons`);
  }

  async getLesson(moduleId, lessonId) {
    return this.request(`/modules/${moduleId}/lessons/${lessonId}`);
  }

  async createLesson(moduleId, lessonData) {
    return this.request(`/modules/${moduleId}/lessons`, {
      method: 'POST',
      body: JSON.stringify(lessonData),
    });
  }

  async updateLesson(moduleId, lessonId, lessonData) {
    return this.request(`/modules/${moduleId}/lessons/${lessonId}`, {
      method: 'PUT',
      body: JSON.stringify(lessonData),
    });
  }

  // Challenges
  async submitChallenge(moduleId, lessonId, challengeData) {
    return this.request(`/modules/${moduleId}/lessons/${lessonId}/challenge`, {
      method: 'POST',
      body: JSON.stringify(challengeData),
    });
  }

  async getChallengeSolution(moduleId, lessonId) {
    return this.request(`/modules/${moduleId}/lessons/${lessonId}/solution`);
  }

  // User Progress
  async getUserProgress() {
    return this.request('/progress');
  }

  async updateProgress(moduleId, lessonId, progressData) {
    return this.request(`/progress/${moduleId}/${lessonId}`, {
      method: 'PUT',
      body: JSON.stringify(progressData),
    });
  }

  // Authentication
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // File Upload
  async uploadFile(file, type = 'image') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.request('/upload', {
      method: 'POST',
      headers: {
        // Don't set Content-Type for FormData
      },
      body: formData,
    });
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
