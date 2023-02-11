# MyShop General Backend Practice 🗃

![GitHub last commit](https://img.shields.io/github/last-commit/AlejandroJRosas/myShop-DBPractice)
![GitHub package.json version](https://img.shields.io/github/package-json/v/AlejandroJRosas/myShop-DBPractice)

API Rest using Xampp/PHPMyAdmin MySQL Database for learning/practice purposes.

### This app uses the following languages and frameworks:

- NodeJS
- Typescript (using ts-standard)
- Express

### Front repo for better testing
***...soon*** 🐱‍👤

# Requirements

Create .env file with the information of the Database conection in the format given.

```js
PORT = #port
DOMAIN = #domain
DBNAME = #nombre
DBHOST = #host
DBUSER = #user
DBPASSWORD = #password
```

**As for right now you must create the database and the tables by hand with the SQL code in the sql folder for it to work properly 🙈**

*This will be addressed in future commits* 🐱‍🐉

# Usage

Install all dependencies (don't forget to be inside the downloaded folder directory!)

```bash
npm i
```

Start the API via the following command (this command will build the project and then run it, if you already build it before you can npm run prod to avoid the building process)

```bash
npm start
```

# To-Do ⭕

- Routes
  - users ( in Progress )
  - products ( in Progress )
  - baskets
  - orders
- Filters
- Validations
- JWT Implementation
- More validations
- Synchronization of the tables
- Auto creation of the tables needed for the API to work with the only necessity of the Database being created
- Response messages (QOL)
- 🍕🍺
