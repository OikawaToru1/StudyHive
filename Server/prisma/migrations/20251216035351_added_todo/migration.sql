-- CreateTable
CREATE TABLE "public"."Todos" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT,
    "creatorUsername" TEXT NOT NULL,

    CONSTRAINT "Todos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Todos" ADD CONSTRAINT "Todos_creatorUsername_fkey" FOREIGN KEY ("creatorUsername") REFERENCES "public"."User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
