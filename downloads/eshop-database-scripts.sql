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

create view v_order_summary as
select o.id, c.first_name, o.total_price, o.created_at
from orders o
join customers c on c.id = o.customer_id;

create view v_product_sales as
select p.name, sum(oi.quantity) as sold
from order_items oi
join products p on p.id = oi.product_id
group by p.id;