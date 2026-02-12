-- DropForeignKey
ALTER TABLE "public"."Todos" DROP CONSTRAINT "Todos_creatorUsername_fkey";

-- CreateTable
CREATE TABLE "public"."Notes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "favouritedBy" TEXT,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notes_url_key" ON "public"."Notes"("url");

-- AddForeignKey
ALTER TABLE "public"."Todos" ADD CONSTRAINT "Todos_creatorUsername_fkey" FOREIGN KEY ("creatorUsername") REFERENCES "public"."User"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notes" ADD CONSTRAINT "Notes_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notes" ADD CONSTRAINT "Notes_favouritedBy_fkey" FOREIGN KEY ("favouritedBy") REFERENCES "public"."User"("username") ON DELETE SET NULL ON UPDATE CASCADE;
