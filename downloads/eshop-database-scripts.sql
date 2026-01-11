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

insert into categories (name) values
('Elektronika'),
('Oblečení'),
('Knihy');

insert into products (name, price, available, category_id) values
('Mobilní telefon', 7999.99, 1, 1),
('Notebook', 15999.50, 1, 1),
('Tričko', 299.90, 1, 2),
('Džíny', 999.00, 0, 2),
('Román "Cesta"', 349.00, 1, 3),
('Učebnice matematiky', 499.00, 1, 3);




