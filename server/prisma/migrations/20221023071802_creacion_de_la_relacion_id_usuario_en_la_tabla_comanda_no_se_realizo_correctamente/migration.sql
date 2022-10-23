-- AlterTable
ALTER TABLE `comanda` MODIFY `idUsuario` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `comanda` ADD CONSTRAINT `comanda_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
