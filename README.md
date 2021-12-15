
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

# Energy-Dashboard-Backend

Reengen Full Stack Bootcamp is part of the finishing assignment.
This repo includes the backend side of the Factory Dashboard project. MongoDB and PostgreSQL databases were used in the project.





## Features

- Performs basic CRUD operations with MongoDB and PostgreSQL. MongoDB is used for recording users and performing authorization. PostgreSQL is used for recording facility data and list info.
- User roles are; Admin (read, write, delete), Editor (read, write), User(view).
- User authentication and authorization is needed and proivded with JWT.



## Technologies
- Node.js
- Express
- MongoDB
- PostgreSQL


## Authors

- [@Eralpozcan](httpss://www.github.com/Eralpozcan)




## API Reference
All API requests (excluding login and register) require the use of a JWT.

To authenticate an API request, you should provide your JWT in the `x-access-token` header.


### User
#### Register
```https
  POST /account/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. User name|
| `surname` | `string` | **Required**. User surname|
| `email` | `string` | **Required**. User email |
| `password` | `string` | **Required** |
| `role` | `string` | **Required**. Values =["Admin","Editor","User"]|

#### Login
```httpss
  POST /account/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |


### Facility
### Data
#### Get All Records 

```httpss
  GET /factorydata
```

#### Create New Data

```httpss
  POST /factorydata
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `factoryName` | `string` | **Required** - Factory name |
| `unitType` | `numeric` | **Required** - The number of products produced. |
| `usedKw` | `numeric` | **Required** - Used KiloWatt|
| `usedPrice` | `numeric` | **Required** - |
| `discount` | `boolean` | **Required** - True/False |


#### Update Data

```httpss
  PUT /factorydata
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `factoryName` | `string` | **Required** - Factory name |
| `unitType` | `numeric` | **Required** - The number of products produced. |
| `usedKw` | `numeric` | **Required** - Used KiloWatt|
| `usedPrice` | `numeric` | **Required** - |
| `discount` | `boolean` | **Required** - True/False |


#### Delete Data

```https
  DELETE /factorydata
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `factoryName` | `string` | **Required** - Factory name |


## List
#### Get All List

```https
  GET /factorylist
```

#### Create New List

```https
  POST /factorylist
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `factoryName` | `string` | **Required** - Factory name |
| `registerDate` | `date` | **Required** - Register Date |
| `registerEndDate` | `date` | **Required** -|
| `employeeCount` | `numeric` | **Required** - |
| `specialMembers` | `boolean` | **Required** - True/False |


#### Update List

```https
  PUT /factorylist
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `factoryName` | `string` | **Required** - Factory name |
| `registerDate` | `date` | **Required** - Register Date |
| `registerEndDate` | `date` | **Required** -|
| `employeeCount` | `numeric` | **Required** - |
| `specialMembers` | `boolean` | **Required** - True/False |


#### Delete List

```https
  DELETE /factorylist
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `factoryName` | `string` | **Required** - Factory name |




## Roadmap

- Performing read, write and delete operations according to ID. - PostgreSQL
- Adding user settings

