-- CreateEnum
CREATE TYPE "public"."Roles" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."Roles" NOT NULL DEFAULT 'user';
