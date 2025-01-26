USE DATABASE [DBTentacion];
GO
ALTER TABLE [dbo].[orders_products] NOCHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[products_ingredients] NOCHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[products] NOCHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[branches] NOCHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[ubications] NOCHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[category_product] NOCHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[ingredients] NOCHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[clients] NOCHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[admins] NOCHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[orders] NOCHECK CONSTRAINT ALL;
GO

INSERT INTO [dbo].[admins] ([firstName], [lastName], [username], [password], [phone], [role]) VALUES 
(N'Carlos', N'Pérez', N'carlos_p', N'1234', N'2281234567', N'Admin'),
(N'María', N'Gómez', N'maria_g', N'5678', N'2282345678', N'Admin'),
(N'Juan', N'Hernández', N'juan_h', N'abcd', N'2283456789', N'Admin'),
(N'Ana', N'Lopez', N'ana_l', N'efgh', N'2284567890', N'Admin');

GO
INSERT INTO [dbo].[clients] ([name], [lastName], [phone], [birthDate], [email], [password], [role]) VALUES 
(N'Juan', N'Pérez', N'5512345678', N'1995-03-15', N'juan.perez@gmail.com', N'Segura123!', N'client'),
(N'Pedro', N'Ramírez', N'2285678901', N'1990-05-12', N'pedro.ramirez@example.com', N'pass123', N'Cliente'),
(N'Lucía', N'Martínez', N'2286789012', N'1985-08-22', N'lucia.martinez@example.com', N'pass123', N'Cliente'),
(N'José', N'López', N'2287890123', N'1992-11-03', N'jose.lopez@example.com', N'pass123', N'Cliente'),
(N'Andrea', N'Gutiérrez', N'2288901234', N'1995-03-14', N'andrea.gutierrez@example.com', N'pass123', N'Cliente'),
(N'Carlos', N'Sánchez', N'2289012345', N'1988-06-17', N'carlos.sanchez@example.com', N'pass123', N'Cliente'),
(N'Verónica', N'Díaz', N'2280123456', N'1996-12-01', N'veronica.diaz@example.com', N'pass123', N'Cliente'),
(N'Ricardo', N'Morales', N'2281234567', N'1987-09-10', N'ricardo.morales@example.com', N'pass123', N'Cliente'),
(N'Isabel', N'Castro', N'2282345678', N'1993-01-24', N'isabel.castro@example.com', N'pass123', N'Cliente'),
(N'Fernando', N'Vega', N'2283456789', N'1980-02-14', N'fernando.vega@example.com', N'pass123', N'Cliente'),
(N'Sandra', N'Pérez', N'2284567890', N'1994-07-07', N'sandra.perez@example.com', N'pass123', N'Cliente');

GO
INSERT INTO [dbo].[ingredients] ([name], [quantity], [unitPrice]) VALUES 
(N'Harina', N'500', N'10.00'),
(N'Azúcar', N'300', N'15.00'),
(N'Huevos', N'12', N'20.00'),
(N'Leche', N'1000', N'18.00'),
(N'Mantequilla', N'250', N'35.00'),
(N'Vainilla', N'50', N'40.00'),
(N'Cocoa', N'100', N'25.00'),
(N'Chocolate', N'200', N'50.00'),
(N'Frutillas', N'300', N'45.00'),
(N'Crema', N'500', N'55.00'),
(N'Canela', N'30', N'10.00'),
(N'Frutos secos', N'200', N'60.00'),
(N'Nuez', N'150', N'70.00'),
(N'Levadura', N'100', N'10.00'),
(N'Glaseado', N'150', N'30.00');

GO
INSERT INTO [dbo].[category_product] ([categoryName], [categoryDescription]) VALUES 
(N'Pasteles', N'Deliciosos pasteles de todo tipo.'),
(N'Galletas', N'Galletas caseras y frescas.'),
(N'Bollos', N'Bollos suaves y esponjosos.'),
(N'Panadería', N'Productos de panadería artesanal.');

GO
INSERT INTO [dbo].[ubications] ([description], [latitude], [longitude]) VALUES 
(N'Centro de Xalapa, Veracruz', N'19.543100', N'-96.924600'),
(N'Zona Norte, Xalapa, Veracruz', N'19.543200', N'-96.914600');

GO
INSERT INTO [dbo].[branches] ([branchName], [ubicationId]) VALUES 
(N'Sucursal Xalapa Centro', N'1'),
(N'Sucursal Xalapa Norte', N'2');

GO
INSERT INTO [dbo].[products] ([productName], [stock], [finalPrice], [expirationDate], [categoryId]) VALUES 
(N'Pastel de Chocolate', N'20', N'150.00', N'2025-02-15', N'1'),
(N'Pastel de Vainilla', N'15', N'140.00', N'2025-02-10', N'1'),
(N'Galletas de Avena', N'50', N'30.00', N'2025-01-30', N'2'),
(N'Galletas de Chocolate', N'30', N'35.00', N'2025-01-25', N'2'),
(N'Bollo de Canela', N'40', N'25.00', N'2025-01-28', N'3'),
(N'Bollo de Chocolate', N'35', N'28.00', N'2025-02-01', N'3'),
(N'Pan de Leche', N'45', N'40.00', N'2025-02-12', N'4'),
(N'Pan de Caja', N'60', N'50.00', N'2025-02-20', N'4'),
(N'Pastel de Frutillas', N'10', N'170.00', N'2025-02-18', N'1'),
(N'Pastel de Nuez', N'12', N'160.00', N'2025-02-22', N'1'),
(N'Galletas de Limón', N'50', N'35.00', N'2025-02-05', N'2'),
(N'Pastel de Mantequilla', N'14', N'155.00', N'2025-03-01', N'1'),
(N'Bollo de Mantequilla', N'30', N'30.00', N'2025-01-26', N'3'),
(N'Pan de Chocolate', N'55', N'45.00', N'2025-02-10', N'4'),
(N'Tarta de Frutillas', N'18', N'160.00', N'2025-02-25', N'1'),
(N'Tarta de Manzana', N'25', N'150.00', N'2025-02-18', N'1'),
(N'Galletas Rellenas de Chocolate', N'40', N'40.00', N'2025-02-15', N'2'),
(N'Bollo de Crema', N'35', N'32.00', N'2025-01-29', N'3'),
(N'Pastel de Caramelo', N'15', N'165.00', N'2025-02-11', N'1'),
(N'Torta de Chocolate', N'20', N'175.00', N'2025-03-05', N'1'),
(N'Galletas de Almendra', N'50', N'38.00', N'2025-02-12', N'2'),
(N'Panecillos de Mantequilla', N'60', N'48.00', N'2025-02-20', N'4'),
(N'Pastel de Limón', N'22', N'160.00', N'2025-03-01', N'1'),
(N'Galletas de Coco', N'45', N'37.00', N'2025-02-22', N'2'),
(N'Bollos de Chocolate y Nuez', N'30', N'34.00', N'2025-02-10', N'3');

GO
INSERT INTO [dbo].[products_ingredients] ([productId], [ingredientId]) VALUES 
(N'1', N'1'),
(N'1', N'2'),
(N'1', N'3'),
(N'1', N'4'),
(N'1', N'5'),
(N'2', N'1'),
(N'2', N'2'),
(N'2', N'3'),
(N'2', N'4'),
(N'2', N'5'),
(N'3', N'1'),
(N'3', N'2'),
(N'3', N'6'),
(N'3', N'7'),
(N'3', N'8'),
(N'4', N'1'),
(N'4', N'2'),
(N'4', N'3'),
(N'4', N'9'),
(N'4', N'10'),
(N'5', N'1'),
(N'5', N'2'),
(N'5', N'3'),
(N'5', N'4'),
(N'5', N'10'),
(N'6', N'1'),
(N'6', N'3'),
(N'6', N'5'),
(N'6', N'9'),
(N'7', N'1'),
(N'7', N'4'),
(N'7', N'6'),
(N'7', N'7'),
(N'8', N'1'),
(N'8', N'3'),
(N'8', N'4'),
(N'8', N'8');

GO
INSERT INTO [dbo].[orders] ([totalPrice], [clientId], [branchId]) VALUES 
(N'500.00', N'1', N'1'),
(N'350.00', N'2', N'2'),
(N'450.00', N'3', N'1');

GO
INSERT INTO [dbo].[orders_products] ([orderId], [productId]) VALUES 
(N'1', N'1'),
(N'1', N'3'),
(N'1', N'4'),
(N'2', N'2'),
(N'2', N'5'),
(N'2', N'6'),
(N'3', N'1'),
(N'3', N'7'),
(N'3', N'8');
GO

-- Activar nuevamente las restricciones de claves foráneas
ALTER TABLE [dbo].[orders_products] CHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[products_ingredients] CHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[products] CHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[branches] CHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[ubications] CHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[category_product] CHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[ingredients] CHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[clients] CHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[admins] CHECK CONSTRAINT ALL;
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT ALL;
GO