CREATE TABLE `vault_comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`mediaId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `vault_comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vault_media` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fetish` varchar(64) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`fileUrl` text NOT NULL,
	`fileType` varchar(32) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `vault_media_id` PRIMARY KEY(`id`)
);
