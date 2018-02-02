DROP DATABASE IF EXISTS test;
CREATE DATABASE test;

USE test;

-- USE heroku_a9ded5de1ff1c8b;

CREATE TABLE users (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(20) NOT NULL UNIQUE,
  git_username varchar(20) NOT NULL,
  session_id varchar(64),
  avatar_url varchar(100)
);

CREATE TABLE projects (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  project_name varchar(20) NOT NULL UNIQUE,
  description varchar(100),
  repo_url varchar(100),
  category varchar(20),
  image_Url varchar(100),
  creation_date date,
  status varchar(10),
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users(id)
);