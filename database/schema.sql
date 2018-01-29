DROP DATABASE IF EXISTS codeop;
CREATE DATABASE codeop;

USE codeop;


CREATE TABLE users (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(20) NOT NULL UNIQUE,
  git_username varchar(10) NOT NULL
);

CREATE TABLE projects (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  project_name varchar(20) NOT NULL UNIQUE,
  description varchar(100),
  repo_url varchar(20),
  category varchar(20),
  image_Url varchar(20),
  creation_date date,
  status varchar(10),
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users(id)
);



/* Create other tables and define schemas for them here! */

/*  Execute this file from the command line (from database folder)by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/