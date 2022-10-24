/*
  Warnings:

  - You are about to drop the `sedeproducto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `sedeproducto` DROP FOREIGN KEY `sedeProducto_idProducto_fkey`;

-- DropForeignKey
ALTER TABLE `sedeproducto` DROP FOREIGN KEY `sedeProducto_idSede_fkey`;

-- DropTable
DROP TABLE `sedeproducto`;

-- CreateTable
CREATE TABLE `_productoTosede` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_productoTosede_AB_unique`(`A`, `B`),
    INDEX `_productoTosede_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_productoTosede` ADD CONSTRAINT `_productoTosede_A_fkey` FOREIGN KEY (`A`) REFERENCES `producto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_productoTosede` ADD CONSTRAINT `_productoTosede_B_fkey` FOREIGN KEY (`B`) REFERENCES `sede`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
