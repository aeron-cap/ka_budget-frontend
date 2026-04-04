ALTER TABLE `accounts` ADD `user_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `savings` ADD `user_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` ADD `user_id` text NOT NULL;