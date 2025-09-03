/**
 * Learning Module Model
 * 
 * Represents a learning module in the DevForge Learning Lab platform.
 * Each module contains multiple lessons and focuses on a specific topic.
 */

class LearningModule {
  constructor(data = {}) {
    this.id = data.id || null;
    this.title = data.title || '';
    this.description = data.description || '';
    this.shortDescription = data.shortDescription || '';
    this.slug = data.slug || '';
    this.difficulty = data.difficulty || 'beginner'; // beginner, intermediate, advanced
    this.category = data.category || 'general'; // general, frontend, backend, devops, etc.
    this.tags = data.tags || [];
    this.estimatedDuration = data.estimatedDuration || 0; // in minutes
    this.points = data.points || 0; // points earned for completing
    this.prerequisites = data.prerequisites || []; // module IDs that must be completed first
    this.order = data.order || 0; // display order
    
    // Content
    this.lessons = data.lessons || [];
    this.totalLessons = this.lessons.length;
    this.requiredLessons = data.requiredLessons || []; // lesson IDs that must be completed
    
    // Metadata
    this.isPublished = data.isPublished !== false;
    this.isActive = data.isActive !== false;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.createdBy = data.createdBy || null; // user ID
    this.lastModifiedBy = data.lastModifiedBy || null;
    
    // Statistics
    this.stats = {
      totalEnrollments: data.stats?.totalEnrollments || 0,
      totalCompletions: data.stats?.totalCompletions || 0,
      averageRating: data.stats?.averageRating || 0,
      totalRatings: data.stats?.totalRatings || 0,
      averageCompletionTime: data.stats?.averageCompletionTime || 0,
      difficultyRating: data.stats?.difficultyRating || 0
    };
    
    // Resources
    this.resources = {
      videoUrl: data.resources?.videoUrl || null,
      documentationUrl: data.resources?.documentationUrl || null,
      githubUrl: data.resources?.githubUrl || null,
      externalLinks: data.resources?.externalLinks || [],
      attachments: data.resources?.attachments || []
    };
    
    // Settings
    this.settings = {
      allowRetakes: data.settings?.allowRetakes !== false,
      maxRetakes: data.settings?.maxRetakes || 3,
      requireSequential: data.settings?.requireSequential !== false,
      showProgress: data.settings?.showProgress !== false,
      enableDiscussion: data.settings?.enableDiscussion !== false,
      enableNotes: data.settings?.enableNotes !== false
    };
  }

  /**
   * Add a lesson to this module
   */
  addLesson(lesson) {
    if (!this.lessons.find(l => l.id === lesson.id)) {
      this.lessons.push(lesson);
      this.totalLessons = this.lessons.length;
      this.updatedAt = new Date();
    }
  }

  /**
   * Remove a lesson from this module
   */
  removeLesson(lessonId) {
    this.lessons = this.lessons.filter(l => l.id !== lessonId);
    this.totalLessons = this.lessons.length;
    this.updatedAt = new Date();
  }

  /**
   * Get lesson by ID
   */
  getLesson(lessonId) {
    return this.lessons.find(l => l.id === lessonId);
  }

  /**
   * Get lesson by order
   */
  getLessonByOrder(order) {
    return this.lessons.find(l => l.order === order);
  }

  /**
   * Get next lesson after current one
   */
  getNextLesson(currentLessonId) {
    const currentLesson = this.getLesson(currentLessonId);
    if (!currentLesson) return null;
    
    const nextOrder = currentLesson.order + 1;
    return this.getLessonByOrder(nextOrder);
  }

  /**
   * Get previous lesson before current one
   */
  getPreviousLesson(currentLessonId) {
    const currentLesson = this.getLesson(currentLessonId);
    if (!currentLesson) return null;
    
    const prevOrder = currentLesson.order - 1;
    return this.getLessonByOrder(prevOrder);
  }

  /**
   * Check if user can access this module
   */
  canAccess(user, completedModules = []) {
    // Check if module is published and active
    if (!this.isPublished || !this.isActive) {
      return false;
    }
    
    // Check prerequisites
    if (this.prerequisites.length > 0) {
      const hasPrerequisites = this.prerequisites.every(prereqId => 
        completedModules.includes(prereqId)
      );
      if (!hasPrerequisites) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Calculate completion percentage
   */
  getCompletionPercentage(completedLessons = []) {
    if (this.totalLessons === 0) return 0;
    
    const completedCount = this.lessons.filter(lesson => 
      completedLessons.includes(lesson.id)
    ).length;
    
    return Math.round((completedCount / this.totalLessons) * 100);
  }

  /**
   * Get module overview for display
   */
  getOverview() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      shortDescription: this.shortDescription,
      difficulty: this.difficulty,
      category: this.category,
      tags: this.tags,
      estimatedDuration: this.estimatedDuration,
      points: this.points,
      totalLessons: this.totalLessons,
      order: this.order,
      stats: this.stats,
      resources: this.resources,
      settings: this.settings
    };
  }

  /**
   * Get module for learning (with lessons)
   */
  getForLearning() {
    return {
      ...this.getOverview(),
      lessons: this.lessons.map(lesson => lesson.getForLearning()),
      prerequisites: this.prerequisites
    };
  }

  /**
   * Update module statistics
   */
  updateStats(statType, value) {
    if (this.stats.hasOwnProperty(statType)) {
      this.stats[statType] = value;
      this.updatedAt = new Date();
    }
  }

  /**
   * Increment module statistics
   */
  incrementStats(statType, amount = 1) {
    if (this.stats.hasOwnProperty(statType)) {
      this.stats[statType] += amount;
      this.updatedAt = new Date();
    }
  }

  /**
   * Calculate difficulty rating based on user feedback
   */
  calculateDifficultyRating(userRatings) {
    if (!userRatings || userRatings.length === 0) {
      return 0;
    }
    
    const totalRating = userRatings.reduce((sum, rating) => sum + rating.difficulty, 0);
    this.stats.difficultyRating = Math.round(totalRating / userRatings.length);
    this.updatedAt = new Date();
    
    return this.stats.difficultyRating;
  }

  /**
   * Validate module data
   */
  validate() {
    const errors = [];
    
    if (!this.title || this.title.trim().length === 0) {
      errors.push('Module title is required');
    }
    
    if (!this.description || this.description.trim().length === 0) {
      errors.push('Module description is required');
    }
    
    if (!['beginner', 'intermediate', 'advanced'].includes(this.difficulty)) {
      errors.push('Invalid difficulty level');
    }
    
    if (this.estimatedDuration < 0) {
      errors.push('Estimated duration cannot be negative');
    }
    
    if (this.points < 0) {
      errors.push('Points cannot be negative');
    }
    
    if (this.order < 0) {
      errors.push('Order cannot be negative');
    }
    
    return errors;
  }

  /**
   * Check if module is complete (has all required content)
   */
  isComplete() {
    return this.lessons.length > 0 && 
           this.isPublished && 
           this.validate().length === 0;
  }

  /**
   * Get module difficulty color class
   */
  getDifficultyColor() {
    switch (this.difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'danger';
      default: return 'secondary';
    }
  }

  /**
   * Get estimated duration in human readable format
   */
  getDurationText() {
    if (this.estimatedDuration < 60) {
      return `${this.estimatedDuration} minutes`;
    }
    
    const hours = Math.floor(this.estimatedDuration / 60);
    const minutes = this.estimatedDuration % 60;
    
    if (minutes === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
}

module.exports = LearningModule;
