import {
  boolean,
  check,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const accountStatus = pgEnum("account_status", ["active", "paused", "banned"]);
export const photoReviewStatus = pgEnum("photo_review_status", ["pending", "approved", "rejected"]);
export const swipeAction = pgEnum("swipe_action", ["like", "pass"]);
export const matchStatus = pgEnum("match_status", ["active", "ended"]);
export const reportStatus = pgEnum("report_status", ["open", "reviewing", "resolved", "dismissed"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  authSubject: text("auth_subject").unique(),
  status: accountStatus("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const profiles = pgTable("profiles", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  displayName: text("display_name").notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: text("gender"),
  bio: text("bio").notNull().default(""),
  city: text("city").notNull(),
  countryCode: text("country_code").notNull().default("NG"),
  datingIntent: text("dating_intent"),
  isVisible: boolean("is_visible").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const profilePhotos = pgTable(
  "profile_photos",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.userId, { onDelete: "cascade" }),
    objectKey: text("object_key").notNull(),
    sortOrder: integer("sort_order").notNull(),
    reviewStatus: photoReviewStatus("review_status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    unique().on(table.userId, table.sortOrder),
    index("profile_photos_user_review_idx").on(table.userId, table.reviewStatus),
  ]
);

export const preferences = pgTable("preferences", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => profiles.userId, { onDelete: "cascade" }),
  minAge: integer("min_age").notNull().default(18),
  maxAge: integer("max_age").notNull().default(99),
  maxDistanceKm: integer("max_distance_km").notNull().default(25),
  interestedIn: text("interested_in").array().notNull().default(sql`'{}'::text[]`),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  check("preferences_age_range_check", sql`${table.minAge} >= 18 AND ${table.maxAge} >= ${table.minAge}`),
  check("preferences_distance_check", sql`${table.maxDistanceKm} > 0`),
]);

export const swipes = pgTable(
  "swipes",
  {
    senderId: uuid("sender_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    recipientId: uuid("recipient_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    action: swipeAction("action").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.senderId, table.recipientId] }),
    index("swipes_recipient_action_idx").on(table.recipientId, table.action),
    check("swipes_no_self_swipe_check", sql`${table.senderId} <> ${table.recipientId}`),
  ]
);

export const matches = pgTable(
  "matches",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userAId: uuid("user_a_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    userBId: uuid("user_b_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: matchStatus("status").notNull().default("active"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    endedAt: timestamp("ended_at", { withTimezone: true }),
  },
  (table) => [
    unique().on(table.userAId, table.userBId),
    index("matches_user_a_status_idx").on(table.userAId, table.status),
    index("matches_user_b_status_idx").on(table.userBId, table.status),
    check("matches_distinct_users_check", sql`${table.userAId} <> ${table.userBId}`),
  ]
);

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    matchId: uuid("match_id")
      .notNull()
      .references(() => matches.id, { onDelete: "cascade" }),
    senderId: uuid("sender_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    readAt: timestamp("read_at", { withTimezone: true }),
  },
  (table) => [index("messages_match_created_idx").on(table.matchId, table.createdAt)]
);

export const userBlocks = pgTable(
  "user_blocks",
  {
    blockerId: uuid("blocker_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    blockedId: uuid("blocked_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.blockerId, table.blockedId] }),
    check("user_blocks_distinct_users_check", sql`${table.blockerId} <> ${table.blockedId}`),
  ]
);

export const reports = pgTable(
  "reports",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reporterId: uuid("reporter_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    reportedId: uuid("reported_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    category: text("category").notNull(),
    details: text("details"),
    status: reportStatus("status").notNull().default("open"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("reports_status_created_idx").on(table.status, table.createdAt),
    check("reports_distinct_users_check", sql`${table.reporterId} <> ${table.reportedId}`),
  ]
);