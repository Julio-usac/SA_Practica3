CREATE DATABASE IF NOT EXISTS mysqldb;
use mysqldb;
CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT,
    nombre CHAR(30) NOT NULL,
     PRIMARY KEY (id)
);
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;