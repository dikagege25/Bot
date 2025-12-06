-- CreateTable
CREATE TABLE "Bahan" (
    "id" SERIAL NOT NULL,
    "caption" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Bahan_pkey" PRIMARY KEY ("id")
);
