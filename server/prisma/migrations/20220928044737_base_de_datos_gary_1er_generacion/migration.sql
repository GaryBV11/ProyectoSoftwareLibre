-- CreateTable
CREATE TABLE `sede` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,
    `precio` DECIMAL(65, 30) NOT NULL,
    `ingredientes` VARCHAR(191) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `categoria` ENUM('platoPrincipal', 'bebida', 'entrada') NOT NULL,
    `estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sedeProducto` (
    `idSede` INTEGER NOT NULL,
    `idProducto` INTEGER NOT NULL,

    PRIMARY KEY (`idProducto`, `idSede`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `capacidad` INTEGER NOT NULL,
    `idSede` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comanda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `estado` ENUM('registrado', 'enProceso', 'pendiente', 'entregada', 'porPagar') NOT NULL,
    `direccion` VARCHAR(191) NULL,
    `subTotal` DECIMAL(65, 30) NOT NULL,
    `impuesto` DECIMAL(65, 30) NOT NULL,
    `total` DECIMAL(65, 30) NOT NULL,
    `idMesa` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detallePago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoPago` ENUM('efectivo', 'tarjeta', 'ambas') NOT NULL,
    `monto` DECIMAL(65, 30) NOT NULL,
    `idComanda` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalleComanda` (
    `idComanda` INTEGER NOT NULL,
    `idProducto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`idComanda`, `idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido1` VARCHAR(191) NOT NULL,
    `apellido2` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `rol` ENUM('cliente', 'mesero', 'administrador') NOT NULL DEFAULT 'cliente',
    `idSede` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sedeProducto` ADD CONSTRAINT `sedeProducto_idSede_fkey` FOREIGN KEY (`idSede`) REFERENCES `sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sedeProducto` ADD CONSTRAINT `sedeProducto_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mesa` ADD CONSTRAINT `mesa_idSede_fkey` FOREIGN KEY (`idSede`) REFERENCES `sede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comanda` ADD CONSTRAINT `comanda_idMesa_fkey` FOREIGN KEY (`idMesa`) REFERENCES `mesa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detallePago` ADD CONSTRAINT `detallePago_idComanda_fkey` FOREIGN KEY (`idComanda`) REFERENCES `comanda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleComanda` ADD CONSTRAINT `detalleComanda_idComanda_fkey` FOREIGN KEY (`idComanda`) REFERENCES `comanda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleComanda` ADD CONSTRAINT `detalleComanda_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_idSede_fkey` FOREIGN KEY (`idSede`) REFERENCES `sede`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
