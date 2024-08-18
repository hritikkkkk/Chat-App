CREATE TABLE IF NOT EXISTS "chat" (
	"id" serial PRIMARY KEY NOT NULL,
	"members" text[] NOT NULL,
	"created_at" timestamp DEFAULT now()
);
