CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`account_type` text NOT NULL,
	`initialBalance` numeric DEFAULT '0' NOT NULL,
	`currentBalance` numeric DEFAULT '0',
	`account_category` text NOT NULL,
	`color` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `savings` (
	`id` text PRIMARY KEY NOT NULL,
	`color` text NOT NULL,
	`name` text NOT NULL,
	`account` text NOT NULL,
	`currentAmount` numeric NOT NULL,
	`goalAmount` numeric NOT NULL,
	`saving_category` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`datetime` integer DEFAULT strftime('%s', 'now') NOT NULL,
	`transaction_category` text NOT NULL,
	`amount` numeric NOT NULL,
	`note` text,
	`transaction_type` text NOT NULL,
	`transaction_account` text NOT NULL,
	`receiving_account` text,
	`saving_name` text,
	`fee` numeric DEFAULT '0'
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`randId` text NOT NULL,
	`name` text NOT NULL,
	`user_string` text NOT NULL
);
