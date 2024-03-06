create database Swift_ship;
CREATE TABLE AdminDetails (
    username varchar(100),
    password varchar(100),
    email varchar(100),
	phone varchar(100)
   
);
create Table users(
    userId int NOT NULL PRIMARY KEY IDENTITY(1,1),
	username varchar(100),
    password varchar(100),
    email varchar(100),
	phone varchar(100)
);
create Table couriers(

    courierId int NOT NULL PRIMARY KEY IDENTITY(1,1),
	userId int,
	pickupAddress varchar(255),
	deliveryAddress varchar(255),
	pickupPincode varchar(10),
	deliveryPincode varchar(10),
	weight int,
	height int,
	length int,
	width int,
	price int,
	
    itemName varchar(100),
    deliveryDate varchar(100),
	pickupDate varchar(100),
	estimatedDeliveryDate varchar(100),
	deliveryStatus varchar(100),
);
