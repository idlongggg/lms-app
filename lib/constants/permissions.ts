export const PERMISSIONS = {
  // System / Tenant
  TENANT_CREATE: "tenant:create",
  TENANT_READ: "tenant:read",
  TENANT_UPDATE: "tenant:update",
  TENANT_DELETE: "tenant:delete",
  TENANT_SUSPEND: "tenant:suspend",

  // User Management
  USER_CREATE: "user:create",
  USER_READ: "user:read",
  USER_UPDATE: "user:update",
  USER_DELETE: "user:delete",
  USER_IMPORT: "user:import",
  USER_IMPERSONATE: "user:impersonate",
  ROLE_ASSIGN: "role:assign",

  // Content Management (Subject -> Topic -> Lesson -> Question)
  SUBJECT_CREATE: "subject:create",
  SUBJECT_READ: "subject:read",
  SUBJECT_UPDATE: "subject:update",
  SUBJECT_DELETE: "subject:delete",

  TOPIC_CREATE: "topic:create",
  TOPIC_READ: "topic:read",
  TOPIC_UPDATE: "topic:update",
  TOPIC_DELETE: "topic:delete",

  LESSON_CREATE: "lesson:create",
  LESSON_READ: "lesson:read",
  LESSON_UPDATE: "lesson:update",
  LESSON_DELETE: "lesson:delete",
  LESSON_PUBLISH: "lesson:publish",

  QUESTION_CREATE: "question:create",
  QUESTION_READ: "question:read",
  QUESTION_UPDATE: "question:update",
  QUESTION_DELETE: "question:delete",
  QUESTION_IMPORT: "question:import",

  MEDIA_UPLOAD: "media:upload",
  MEDIA_DELETE: "media:delete",

  // Learning & Progress
  LEARNING_PATH_READ: "learning_path:read",
  PROGRESS_READ: "progress:read", // Read any progress
  PROGRESS_READ_OWN: "progress:read_own",
  PROGRESS_READ_CHILD: "progress:read_child",
  EXERCISE_SUBMIT: "exercise:submit",

  // Tournament
  TOURNAMENT_CREATE: "tournament:create",
  TOURNAMENT_READ: "tournament:read",
  TOURNAMENT_UPDATE: "tournament:update",
  TOURNAMENT_DELETE: "tournament:delete",
  TOURNAMENT_JOIN: "tournament:join",
  TOURNAMENT_SUBMIT: "tournament:submit",

  // Gamification (Leaderboard, Rewards, Badges)
  LEADERBOARD_READ: "leaderboard:read",
  REWARD_REDEEM: "reward:redeem",
  BADGE_READ: "badge:read",

  // Analytics & Reports
  ANALYTICS_DASHBOARD: "analytics:dashboard",
  REPORT_READ: "report:read",
  REPORT_READ_OWN: "report:read_own",
  REPORT_EXPORT: "report:export",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
