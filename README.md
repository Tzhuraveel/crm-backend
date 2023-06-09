# CRM Programmer School
***


The `CRM Programmer School API` is a RESTful API designed to manage the operations and data of a programmer school 
focused on customer relationship management. It provides endpoints for managing students, courses, and other related entities.
By utilizing this API, you can `effortlessly` retrieve comprehensive information about all orders and perform various operations on them.
The API provides robust filtering capabilities, allowing you to narrow down your search based on specific properties or criteria.
This ensures that you have the flexibility to access the precise order data you need, optimizing your productivity.
In addition, the API documentation is carefully prepared to help developers easily integrate and use the API in their projects.

>Note that this is only the backend of the project. The client part of the project can be found here [FRONT](https://github.com/Orest-Sabara/crm-frontend) 

# Main technologies

- Nest.js
- TypeScript
- MySQL
- TypeORM

## Requirements
- Node.js (recommended version 18.13.0)
- NPM (recommended version 8.19.3)
## Installation Steps

1. Clone the git repository
   ```bash 
   git clone <url>
   ```
2. Install all dependencies
   ```bash 
   npm install
   ```
3. Start the server
   ```bash 
   npm run start:dev #develoment watch mode
   ```
4. Use the host and port are described below 
   ```bash 
   http://localhost:<PORT> #port in .env file
   ```   
## Brief project map

There are two roles in this project: `Admin` and `Manager`

You can log in to the project using the following credentials and endpoint:
- EMAIL: `admin@gmail.com`
- PASSWORD: `admin`
- ENDPOINT: 
```http
  POST /auth/login
```
Now you are able to use other endpoint. Other endpoints described here [SWAGGER](http://localhost:5000/api/doc/#/) 

# Author

- Timofii Zhuravel
- [LINKEDIN](https://www.linkedin.com/in/timofii-zhuravel/) 


            
            
