**Its An Ecommerce Backend using Express js and MongoDb**

  Its Registered The users in user database as USER Database in mongoDb

  Then it login the user based on their email and password 

**Features:**

  Added Features like bcrypt in password so that the password is stored in bcrypted form so tha no one can predict it

  Added features like jsonWebToken that stores the token of the user in localstorage so it authenticate the user and measure for what timestamp it can use the app without doing login again

**Logout:**

  If the user logout then it cannot do any process 


**Role Based Architecture:**

  There are Four rules define in the project with theri authorization

**1. Admin
2. Manager
3. Salesman
4. User**


The admin can do CRUD operations like adding the product, updating the product and delete it 

The maange add the product and update it

The salesmann only update the product and get the products

The user only get the product


**Cart Operation:**

  If the user like the product then it can cart the product
  Delete the Cart 
  And check the products in cart


