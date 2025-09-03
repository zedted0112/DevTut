/**
 * User Model
 * 
 * Represents a user in the DevForge Learning Lab platform.
 * Handles user authentication, progress tracking, and learning analytics.
 */

class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.username = data.username || '';
    this.email = data.email || '';
    this.passwordHash = data.passwordHash || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.avatar = data.avatar || null;
    this.role = data.role || 'student'; // student, instructor, admin
    this.isActive = data.isActive !== false;
    this.emailVerified = data.emailVerified || false;
    this.lastLoginAt = data.lastLoginAt || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    
    // Learning Progress
    this.currentModule = data.currentModule || null;
    this.completedModules = data.completedModules || [];
    this.currentLesson = data.currentLesson || null;
    this.completedLessons = data.completedLessons || [];
    this.totalPoints = data.totalPoints || 0;
    this.level = data.level || 1;
    this.streak = data.streak || 0; // consecutive days of learning
    
    // Preferences
    this.preferences = {
      difficulty: data.preferences?.difficulty || 'beginner',
      learningStyle: data.preferences?.learningStyle || 'visual',
      notifications: data.preferences?.notifications || true,
      theme: data.preferences?.theme || 'light',
      language: data.preferences?.language || 'en'
    };
    
    // Analytics
    this.analytics = {
      totalTimeSpent: data.analytics?.totalTimeSpent || 0,
      averageSessionTime: data.analytics?.averageSessionTime || 0,
      totalSessions: data.analytics?.totalSessions || 0,
      lastSessionAt: data.analytics?.lastSessionAt || null,
      favoriteTopics: data.analytics?.favoriteTopics || [],
      weakAreas: data.analytics?.weakAreas || []
    };
  }

  /**
   * Get user's full name
   */
  getFullName() {
    return `${this.firstName} ${this.lastName}`.trim() || this.username;
  }

  /**
   * Check if user has completed a specific module
   */
  hasCompletedModule(moduleId) {
    return this.completedModules.includes(moduleId);
  }

  /**
   * Check if user has completed a specific lesson
   */
  hasCompletedLesson(lessonId) {
    return this.completedLessons.includes(lessonId);
  }

  /**
   * Get user's progress percentage
   */
  getProgressPercentage() {
    if (!this.completedModules || this.completedModules.length === 0) {
      return 0;
    }
    
    // This would be calculated based on total available modules
    const totalModules = 10; // This should come from the learning content
    return Math.round((this.completedModules.length / totalModules) * 100);
  }

  /**
   * Get user's current level based on points
   */
  calculateLevel() {
    const points = this.totalPoints;
    if (points < 100) return 1;
    if (points < 300) return 2;
    if (points < 600) return 3;
    if (points < 1000) return 4;
    if (points < 1500) return 5;
    if (points < 2100) return 6;
    if (points < 2800) return 7;
    if (points < 3600) return 8;
    if (points < 4500) return 9;
    return 10;
  }

  /**
   * Add points to user's total
   */
  addPoints(points) {
    this.totalPoints += points;
    this.level = this.calculateLevel();
    this.updatedAt = new Date();
  }

  /**
   * Mark lesson as completed
   */
  completeLesson(lessonId, points = 0) {
    if (!this.completedLessons.includes(lessonId)) {
      this.completedLessons.push(lessonId);
      this.addPoints(points);
    }
  }

  /**
   * Mark module as completed
   */
  completeModule(moduleId, points = 0) {
    if (!this.completedModules.includes(moduleId)) {
      this.completedModules.push(moduleId);
      this.addPoints(points);
    }
  }

  /**
   * Update user's learning preferences
   */
  updatePreferences(newPreferences) {
    this.preferences = { ...this.preferences, ...newPreferences };
    this.updatedAt = new Date();
  }

  /**
   * Update analytics data
   */
  updateAnalytics(sessionData) {
    this.analytics.totalTimeSpent += sessionData.duration || 0;
    this.analytics.totalSessions += 1;
    this.analytics.lastSessionAt = new Date();
    this.analytics.averageSessionTime = 
      this.analytics.totalTimeSpent / this.analytics.totalSessions;
    
    this.updatedAt = new Date();
  }

  /**
   * Get user's learning statistics
   */
  getLearningStats() {
    return {
      totalModules: this.completedModules.length,
      totalLessons: this.completedLessons.length,
      progressPercentage: this.getProgressPercentage(),
      currentLevel: this.level,
      totalPoints: this.totalPoints,
      streak: this.streak,
      totalTimeSpent: this.analytics.totalTimeSpent,
      averageSessionTime: this.analytics.averageSessionTime
    };
  }

  /**
   * Check if user can access a specific module/lesson
   */
  canAccess(moduleId, lessonId = null) {
    // Admin and instructors can access everything
    if (this.role === 'admin' || this.role === 'instructor') {
      return true;
    }
    
    // Students need to complete prerequisites
    if (lessonId) {
      // Check if user has completed the module containing this lesson
      return this.hasCompletedModule(moduleId);
    }
    
    // For modules, check if user meets prerequisites
    return true; // This would be more complex in real implementation
  }

  /**
   * Get user's public profile (without sensitive data)
   */
  getPublicProfile() {
    return {
      id: this.id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      avatar: this.avatar,
      role: this.role,
      level: this.level,
      totalPoints: this.totalPoints,
      progressPercentage: this.getProgressPercentage(),
      streak: this.streak,
      createdAt: this.createdAt
    };
  }

  /**
   * Validate user data
   */
  validate() {
    const errors = [];
    
    if (!this.username || this.username.length < 3) {
      errors.push('Username must be at least 3 characters long');
    }
    
    if (!this.email || !this.email.includes('@')) {
      errors.push('Valid email is required');
    }
    
    if (this.role && !['student', 'instructor', 'admin'].includes(this.role)) {
      errors.push('Invalid role specified');
    }
    
    return errors;
  }
}

module.exports = User;
