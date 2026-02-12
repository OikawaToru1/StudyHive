/*
  Warnings:

  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupMembers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserFriends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Group" DROP CONSTRAINT "Group_adminId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_GroupMembers" DROP CONSTRAINT "_GroupMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_GroupMembers" DROP CONSTRAINT "_GroupMembers_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserFriends" DROP CONSTRAINT "_UserFriends_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserFriends" DROP CONSTRAINT "_UserFriends_B_fkey";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "rewardPoints" DROP NOT NULL,
ALTER COLUMN "studyHours" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."Group";

-- DropTable
DROP TABLE "public"."_GroupMembers";

-- DropTable
DROP TABLE "public"."_UserFriends";
