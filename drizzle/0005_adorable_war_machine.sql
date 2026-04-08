PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_savings` (
	`id` text PRIMARY KEY NOT NULL,
	`color` text NOT NULL,
	`name` text NOT NULL,
	`account` text NOT NULL,
	`initial_amount` numeric DEFAULT '0' NOT NULL,
	`current_amount` numeric DEFAULT '0' NOT NULL,
	`goal_amount` numeric NOT NULL,
	`saving_category` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer NOT NULL,
	`user_id` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_savings`("id", "color", "name", "account", "initial_amount", "current_amount", "goal_amount", "saving_category", "created_at", "updated_at", "user_id") SELECT "id", "color", "name", "account", "initial_amount", "current_amount", "goal_amount", "saving_category", "created_at", "updated_at", "user_id" FROM `savings`;--> statement-breakpoint
DROP TABLE `savings`;--> statement-breakpoint
ALTER TABLE `__new_savings` RENAME TO `savings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;