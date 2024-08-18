
import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  onlineStatus: boolean("online_status").default(false),
});

export const chat = pgTable("chat", {
  id: serial("id").primaryKey(),
  members: text("members")
    .array()
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").references(() => users.id),
  receiverId: integer("receiver_id").references(() => users.id),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
  read: boolean("read").default(false),
});

export const uploads = pgTable("uploads", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id").references(() => messages.id),
  fileType: varchar("file_type", { length: 255 }),
  fileUrl: text("file_url"),
});
