/*
  Warnings:

  - Added the required column `contrasena` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `contrasena` VARCHAR(191) NOT NULL;
