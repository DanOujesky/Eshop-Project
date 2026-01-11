create database eshop;
use eshop;

create table customers (
  id int auto_increment primary key,
  first_name varchar(100),
  last_name varchar(100),
  email varchar(100)
);

create table categories (
  id int auto_increment primary key,
  name varchar(50)
);

create table products (
  id int auto_increment primary key,
  name varchar(100),
  description varchar(100),
  price float,
  available boolean,
  category_id int,
  foreign key (category_id) references categories(id)
);

create table orders (
  id int auto_increment primary key,
  customer_id int,
  total_price float,
  status enum('ordered', 'delivered'),
  created_at datetime,
  foreign key (customer_id) references customers(id)
);

create table order_items (
  order_id int,
  product_id int,
  quantity int,
  price float,
  primary key (order_id, product_id),
  foreign key (order_id) references orders(id),
  foreign key (product_id) references products(id)
);

create view product_with_category as
select p.id, p.name, p.price, p.available, p.description, p.category_id, c.name AS category_name
from products p
left join categories c ON p.category_id = c.id;

create view valid_categories as
select id, name from categories;


INSERT INTO categories (name) VALUES
('Elektronika'),
('Oblečení'),
('Knihy'),
('Domácnost');

INSERT INTO products (name, description, price, available, category_id) VALUES
('Smartphone X', 'Nový model smartphone s 128GB', 799.99, true, 1),
('Laptop Pro', 'Výkonný laptop pro práci i zábavu', 1299.50, true, 1),
('Tričko Sport', 'Bavlněné tričko, modrá barva', 19.99, true, 2),
('Džíny Classic', 'Modré džíny, velikost M', 49.90, false, 2),
('Kniha PHP Programování', 'Učebnice programování v PHP', 29.90, true, 3),
('Kniha Fantasy Saga', 'První díl fantasy ságy', 24.50, true, 3),
('Vysavač UltraClean', 'Výkonný vysavač do domácnosti', 199.00, true, 4),
('Mixér KitchenPro', 'Výkonný mixér na smoothie', 89.90, false, 4);