/*
  Warnings:

  - The values [ambas] on the enum `detallePago_tipoPago` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `detallepago` MODIFY `tipoPago` ENUM('efectivo', 'tarjeta') NOT NULL;
