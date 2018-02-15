# Project Name

Find other engineers to collaborate with!! :octocat: :squirrel:

## Team

* [Thuan Tran - Software Engineer](https://github.com/toowan) :star2: 
* [Tejaswi Guvvala - Software Engineer](https://github.com/tguvvala) :star2: 
* [Ralph Plumley - Scrum Master](https://github.com/ralphplumley) :star2: 
* [Dan Kelly - Product Owner](https://github.com/DanielJKelly) :star2: 

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

## Requirements
To run locally: 

You will need MySQL, node, and npm installed on your computer. 

We used MySQL v5.7.20, node v8.9.3, npm v5.6.0

Clone the repo and run ```npm install``` from root directory. 

To build the schema: ```cd database``` and then ```mysql -u root < schema.sql``` 

If your MySql root user has a password, you will need to modify the password in database/index.js in order to connect to the database.

Start webpack in watch mode by running ```npm run react-dev``` 

Start the server with nodemon by running ```npm run server-dev``` 

## Development

### Installing Dependencies

