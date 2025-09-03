// Data models for DevTut React app - matching legacy app structure

export class LearningModule {
  constructor(data = {}) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.difficulty = data.difficulty || 'Beginner';
    this.duration = data.duration || '';
    this.topics = data.topics || [];
    this.lessons = data.lessons || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static fromLegacy(legacyData) {
    return new LearningModule({
      id: legacyData.id,
      title: legacyData.title,
      description: legacyData.description,
      difficulty: legacyData.difficulty,
      duration: legacyData.duration,
      topics: legacyData.topics || [],
      lessons: legacyData.lessons?.map(lesson => Lesson.fromLegacy(lesson)) || [],
      createdAt: legacyData.createdAt,
      updatedAt: legacyData.updatedAt,
    });
  }

  toLegacy() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      difficulty: this.difficulty,
      duration: this.duration,
      topics: this.topics,
      lessons: this.lessons.map(lesson => lesson.toLegacy()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class Lesson {
  constructor(data = {}) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.type = data.type || 'theory';
    this.content = data.content || '';
    this.codeExample = data.codeExample || '';
    this.challenge = data.challenge ? new Challenge(data.challenge) : null;
    this.order = data.order || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static fromLegacy(legacyData) {
    return new Lesson({
      id: legacyData.id,
      title: legacyData.title,
      type: legacyData.type,
      content: legacyData.content,
      codeExample: legacyData.codeExample,
      challenge: legacyData.challenge ? Challenge.fromLegacy(legacyData.challenge) : null,
      order: legacyData.order,
      createdAt: legacyData.createdAt,
      updatedAt: legacyData.updatedAt,
    });
  }

  toLegacy() {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      content: this.content,
      codeExample: this.codeExample,
      challenge: this.challenge?.toLegacy(),
      order: this.order,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class Challenge {
  constructor(data = {}) {
    this.type = data.type || 'code';
    this.description = data.description || '';
    this.starterCode = data.starterCode || '';
    this.solution = data.solution || '';
    this.tests = data.tests || [];
    this.hints = data.hints || [];
    this.difficulty = data.difficulty || 'Beginner';
    this.timeLimit = data.timeLimit || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static fromLegacy(legacyData) {
    return new Challenge({
      type: legacyData.type,
      description: legacyData.description,
      starterCode: legacyData.starterCode,
      solution: legacyData.solution,
      tests: legacyData.tests || [],
      hints: legacyData.hints || [],
      difficulty: legacyData.difficulty,
      timeLimit: legacyData.timeLimit,
      createdAt: legacyData.createdAt,
      updatedAt: legacyData.updatedAt,
    });
  }

  toLegacy() {
    return {
      type: this.type,
      description: this.description,
      starterCode: this.starterCode,
      solution: this.solution,
      tests: this.tests,
      hints: this.hints,
      difficulty: this.difficulty,
      timeLimit: this.timeLimit,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class Test {
  constructor(data = {}) {
    this.description = data.description || '';
    this.test = data.test || null;
    this.expected = data.expected || '';
    this.passed = data.passed || false;
    this.error = data.error || null;
    this.executionTime = data.executionTime || 0;
  }

  static fromLegacy(legacyData) {
    return new Test({
      description: legacyData.description,
      test: legacyData.test,
      expected: legacyData.expected,
      passed: legacyData.passed || false,
      error: legacyData.error,
      executionTime: legacyData.executionTime,
    });
  }

  toLegacy() {
    return {
      description: this.description,
      test: this.test,
      expected: this.expected,
      passed: this.passed,
      error: this.error,
      executionTime: this.executionTime,
    };
  }
}

export class UserProgress {
  constructor(data = {}) {
    this.userId = data.userId || '';
    this.moduleId = data.moduleId || '';
    this.lessonId = data.lessonId || '';
    this.completed = data.completed || false;
    this.score = data.score || 0;
    this.attempts = data.attempts || 0;
    this.lastAttempted = data.lastAttempted || null;
    this.completedAt = data.completedAt || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static fromLegacy(legacyData) {
    return new UserProgress({
      userId: legacyData.userId,
      moduleId: legacyData.moduleId,
      lessonId: legacyData.lessonId,
      completed: legacyData.completed,
      score: legacyData.score,
      attempts: legacyData.attempts,
      lastAttempted: legacyData.lastAttempted,
      completedAt: legacyData.completedAt,
      createdAt: legacyData.createdAt,
      updatedAt: legacyData.updatedAt,
    });
  }

  toLegacy() {
    return {
      userId: this.userId,
      moduleId: this.moduleId,
      lessonId: this.lessonId,
      completed: this.completed,
      score: this.score,
      attempts: this.attempts,
      lastAttempted: this.lastAttempted,
      completedAt: this.completedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

// Utility functions for data transformation
export const transformLegacyData = (legacyData) => {
  if (Array.isArray(legacyData)) {
    return legacyData.map(item => LearningModule.fromLegacy(item));
  }
  return LearningModule.fromLegacy(legacyData);
};

export const transformToLegacyFormat = (reactData) => {
  if (Array.isArray(reactData)) {
    return reactData.map(item => item.toLegacy());
  }
  return reactData.toLegacy();
};
