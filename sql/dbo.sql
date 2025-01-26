CREATE DATABASE [DBTentacion];
GO

USE [DBTentacion];
GO
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[admins]') AND type IN ('U'))
	DROP TABLE [dbo].[admins]
GO

CREATE TABLE [dbo].[admins] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [firstName] nvarchar(100) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [lastName] nvarchar(100) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [username] nvarchar(100) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [password] nvarchar(100) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [phone] nvarchar(15) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [role] nvarchar(50) COLLATE Modern_Spanish_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[admins] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for branches
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[branches]') AND type IN ('U'))
	DROP TABLE [dbo].[branches]
GO

CREATE TABLE [dbo].[branches] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [branchName] nvarchar(100) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [ubicationId] int  NOT NULL
)
GO

ALTER TABLE [dbo].[branches] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for category_product
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[category_product]') AND type IN ('U'))
	DROP TABLE [dbo].[category_product]
GO

CREATE TABLE [dbo].[category_product] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [categoryName] nvarchar(100) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [categoryDescription] nvarchar(255) COLLATE Modern_Spanish_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[category_product] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for clients
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[clients]') AND type IN ('U'))
	DROP TABLE [dbo].[clients]
GO

CREATE TABLE [dbo].[clients] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [name] nvarchar(100) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [lastName] nvarchar(100) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [phone] nvarchar(15) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [birthDate] date  NOT NULL,
  [email] nvarchar(100) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [password] nvarchar(100) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [role] nvarchar(50) COLLATE Modern_Spanish_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[clients] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for ingredients
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[ingredients]') AND type IN ('U'))
	DROP TABLE [dbo].[ingredients]
GO

CREATE TABLE [dbo].[ingredients] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [name] nvarchar(100) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [quantity] int  NOT NULL,
  [unitPrice] decimal(18,2)  NOT NULL
)
GO

ALTER TABLE [dbo].[ingredients] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for logs
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[logs]') AND type IN ('U'))
	DROP TABLE [dbo].[logs]
GO

CREATE TABLE [dbo].[logs] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [username] nvarchar(100) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [action] nvarchar(255) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [dateTime] datetime DEFAULT getdate() NOT NULL,
  [ipAddress] nvarchar(50) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [macAddress] nvarchar(50) COLLATE Modern_Spanish_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[logs] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for orders
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[orders]') AND type IN ('U'))
	DROP TABLE [dbo].[orders]
GO

CREATE TABLE [dbo].[orders] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [totalPrice] decimal(18,2)  NOT NULL,
  [clientId] int  NOT NULL,
  [branchId] int  NOT NULL
)
GO

ALTER TABLE [dbo].[orders] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for orders_products
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[orders_products]') AND type IN ('U'))
	DROP TABLE [dbo].[orders_products]
GO

CREATE TABLE [dbo].[orders_products] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [orderId] int  NOT NULL,
  [productId] int  NOT NULL
)
GO

ALTER TABLE [dbo].[orders_products] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for products
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[products]') AND type IN ('U'))
	DROP TABLE [dbo].[products]
GO

CREATE TABLE [dbo].[products] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [productName] nvarchar(100) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [stock] int  NOT NULL,
  [finalPrice] decimal(18,2)  NOT NULL,
  [expirationDate] date  NOT NULL,
  [categoryId] int  NOT NULL
)
GO

ALTER TABLE [dbo].[products] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for products_ingredients
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[products_ingredients]') AND type IN ('U'))
	DROP TABLE [dbo].[products_ingredients]
GO

CREATE TABLE [dbo].[products_ingredients] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [productId] int  NOT NULL,
  [ingredientId] int  NOT NULL
)
GO

ALTER TABLE [dbo].[products_ingredients] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for ubications
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[ubications]') AND type IN ('U'))
	DROP TABLE [dbo].[ubications]
GO

CREATE TABLE [dbo].[ubications] (
  [id] int  IDENTITY(1,1) NOT NULL,
  [description] nvarchar(255) COLLATE Modern_Spanish_CI_AS  NOT NULL,
  [latitude] decimal(9,6)  NOT NULL,
  [longitude] decimal(9,6)  NOT NULL
)
GO

ALTER TABLE [dbo].[ubications] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Auto increment value for admins
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[admins]', RESEED, 4)
GO


-- ----------------------------
-- Uniques structure for table admins
-- ----------------------------
ALTER TABLE [dbo].[admins] ADD CONSTRAINT [UQ__admins__F3DBC572FC797A0C] UNIQUE NONCLUSTERED ([username] ASC)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table admins
-- ----------------------------
ALTER TABLE [dbo].[admins] ADD CONSTRAINT [PK__admins__3213E83F5BB760CD] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for branches
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[branches]', RESEED, 2)
GO


-- ----------------------------
-- Primary Key structure for table branches
-- ----------------------------
ALTER TABLE [dbo].[branches] ADD CONSTRAINT [PK__branches__3213E83F8C8EFFE2] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for category_product
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[category_product]', RESEED, 4)
GO


-- ----------------------------
-- Primary Key structure for table category_product
-- ----------------------------
ALTER TABLE [dbo].[category_product] ADD CONSTRAINT [PK__category__3213E83F4D5DF8AE] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for clients
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[clients]', RESEED, 11)
GO


-- ----------------------------
-- Uniques structure for table clients
-- ----------------------------
ALTER TABLE [dbo].[clients] ADD CONSTRAINT [UQ__clients__AB6E616498E17100] UNIQUE NONCLUSTERED ([email] ASC)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table clients
-- ----------------------------
ALTER TABLE [dbo].[clients] ADD CONSTRAINT [PK__clients__3213E83FF92ECFE5] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for ingredients
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[ingredients]', RESEED, 15)
GO


-- ----------------------------
-- Primary Key structure for table ingredients
-- ----------------------------
ALTER TABLE [dbo].[ingredients] ADD CONSTRAINT [PK__ingredie__3213E83FC60586C5] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for logs
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[logs]', RESEED, 1)
GO


-- ----------------------------
-- Primary Key structure for table logs
-- ----------------------------
ALTER TABLE [dbo].[logs] ADD CONSTRAINT [PK__log__3213E83FFA42549D] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for orders
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[orders]', RESEED, 3)
GO


-- ----------------------------
-- Primary Key structure for table orders
-- ----------------------------
ALTER TABLE [dbo].[orders] ADD CONSTRAINT [PK__orders__3213E83FD53BFB15] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for orders_products
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[orders_products]', RESEED, 9)
GO


-- ----------------------------
-- Auto increment value for products
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[products]', RESEED, 25)
GO


-- ----------------------------
-- Primary Key structure for table products
-- ----------------------------
ALTER TABLE [dbo].[products] ADD CONSTRAINT [PK__products__3213E83F0AEC4956] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for products_ingredients
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[products_ingredients]', RESEED, 37)
GO


-- ----------------------------
-- Primary Key structure for table products_ingredients
-- ----------------------------
ALTER TABLE [dbo].[products_ingredients] ADD CONSTRAINT [PK__products__4F65EB38459672FA] PRIMARY KEY CLUSTERED ([productId], [ingredientId], [id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for ubications
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[ubications]', RESEED, 2)
GO


-- ----------------------------
-- Primary Key structure for table ubications
-- ----------------------------
ALTER TABLE [dbo].[ubications] ADD CONSTRAINT [PK__ubicatio__3213E83F28D0CFCD] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Foreign Keys structure for table branches
-- ----------------------------
ALTER TABLE [dbo].[branches] ADD CONSTRAINT [FK__branches__ubicat__5535A963] FOREIGN KEY ([ubicationId]) REFERENCES [dbo].[ubications] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO


-- ----------------------------
-- Foreign Keys structure for table orders
-- ----------------------------
ALTER TABLE [dbo].[orders] ADD CONSTRAINT [FK__orders__clientId__5812160E] FOREIGN KEY ([clientId]) REFERENCES [dbo].[clients] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[orders] ADD CONSTRAINT [FK__orders__branchId__59063A47] FOREIGN KEY ([branchId]) REFERENCES [dbo].[branches] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO


-- ----------------------------
-- Foreign Keys structure for table orders_products
-- ----------------------------
ALTER TABLE [dbo].[orders_products] ADD CONSTRAINT [FK__orders_pr__order__75A278F5] FOREIGN KEY ([orderId]) REFERENCES [dbo].[orders] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[orders_products] ADD CONSTRAINT [FK__orders_pr__produ__76969D2E] FOREIGN KEY ([productId]) REFERENCES [dbo].[products] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO


-- ----------------------------
-- Foreign Keys structure for table products
-- ----------------------------
ALTER TABLE [dbo].[products] ADD CONSTRAINT [FK__products__catego__440B1D61] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[category_product] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO


-- ----------------------------
-- Foreign Keys structure for table products_ingredients
-- ----------------------------
ALTER TABLE [dbo].[products_ingredients] ADD CONSTRAINT [FK__products___ingre__47DBAE45] FOREIGN KEY ([ingredientId]) REFERENCES [dbo].[ingredients] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[products_ingredients] ADD CONSTRAINT [FK__products___produ__74AE54BC] FOREIGN KEY ([productId]) REFERENCES [dbo].[products] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

