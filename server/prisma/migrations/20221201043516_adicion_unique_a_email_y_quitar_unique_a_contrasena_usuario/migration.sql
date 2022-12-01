/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `usuario_contrasena_key` ON `usuario`;

-- CreateIndex
CREATE UNIQUE INDEX `usuario_email_key` ON `usuario`(`email`);
