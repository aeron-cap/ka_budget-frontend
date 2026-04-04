ALTER TABLE `accounts` RENAME COLUMN "initialBalance" TO "initial_balance";--> statement-breakpoint
ALTER TABLE `accounts` RENAME COLUMN "currentBalance" TO "current_balance";--> statement-breakpoint
ALTER TABLE `savings` RENAME COLUMN "currentAmount" TO "current_amount";--> statement-breakpoint
ALTER TABLE `savings` RENAME COLUMN "goalAmount" TO "goal_amount";--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN "randId" TO "rand_id";