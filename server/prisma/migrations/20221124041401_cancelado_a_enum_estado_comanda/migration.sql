-- AlterTable
ALTER TABLE `comanda` MODIFY `estado` ENUM('cancelada', 'registrado', 'enProceso', 'pendiente', 'entregada', 'porPagar') NOT NULL;
