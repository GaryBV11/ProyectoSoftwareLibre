/*
  Warnings:

  - A unique constraint covering the columns `[contrasena]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `usuario_contrasena_key` ON `usuario`(`contrasena`);
