DROP DATABASE IF EXISTS codeop;
CREATE DATABASE codeop;

 USE codeop;

-- USE heroku_a9ded5de1ff1c8b;

CREATE TABLE IF NOT EXISTS users (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(20) NOT NULL UNIQUE,
  git_username varchar(20) NOT NULL,
  session_id varchar(64),
  avatar_url varchar(100),
  user_bio varchar(200)
);

CREATE TABLE IF NOT EXISTS projects (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  project_name varchar(20) NOT NULL UNIQUE,
  description varchar(100),
  repo_url varchar(100),
  image_Url varchar(100),
  creation_date date,
  user_id int,
  view_count int,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS technologies (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  tech_name varchar(20) NOT NULL,
  project_id int,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS followers (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id int NOT NULL,
  follower_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (follower_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS github_repos (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  repo_id int,
  name varchar(50) NOT NULL,
  description varchar(100),
  url varchar(100) NOT NULL,
  creation_date date,
  owner_id int,
  owner_image varchar(100),
  language varchar(50)
);

CREATE TABLE IF NOT EXISTS notifications (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  event text NOT NULL,
  user_id int NOT NULL
  -- follower_id int NOT NULL,

  -- FOREIGN KEY (follower_id) REFERENCES followers(follower_id)
);

CREATE TABLE IF NOT EXISTS private_messages(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  sender_id int,
  recipient_id int,
  time_sent TIMESTAMP,
  content text,
  opened boolean
);

-- mysql --host=DB_HOST --user=DB_USER--password=DB_PASS --reconnect DB_NAME < schema.sql

/* Create other tables and define schemas for them here!

/*  Execute this file from the command line (from database folder)by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/

