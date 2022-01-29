-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);
