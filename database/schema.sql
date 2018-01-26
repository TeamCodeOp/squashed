DROP DATABASE IF EXISTS codeop;
CREATE DATABASE codeop;

USE codeop;

CREATE TABLE projects (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT,
  project_name varchar(20) NOT NULL,
  PRIMARY KEY(id)
);



/* Create other tables and define schemas for them here! */

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/