CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('reply','upvote','chat','mention','system') NOT NULL,
	`title` varchar(256) NOT NULL,
	`message` text NOT NULL,
	`link` varchar(512),
	`isRead` boolean NOT NULL DEFAULT false,
	`actorName` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
