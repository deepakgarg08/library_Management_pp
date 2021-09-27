# Nodejs - Library Management System

# install dependencies
$ cd libraryManagement

$ npm install

## serve at localhost:3000 (default) or by env
$ npm run start

OR

## directly run by test cases
$ npm test

OR

$npx mocha


## created 6 Api's


##### Assumptions

`#1`
- Initially library contains no books
- bookId {is unique} is mandatory field and bookname is used in test cases. 
- Other field can be added as per requirements
- body params example - ` { "bookId" : "B1", "bookname": "English"  }`

`/addbook` - to add book in the library

`#2`

`/checkbooks` - get all books info + no of books stored in library at current state

##### Assumptions
`#3`
- Initially library contains no user
- userId {is unique} is mandatory field, name and class are used in test cases
- other field can be added as per requirements
- body params example - ` {"userId" : "U1", "name" : "Deepak", "class": "Bachelor"}`

`/adduser` - to add user in the library

`#4`

`/checkusers` - to check all users info + total no of users at currant state

##### Assumptions
`#5`

- userId is passed into request parameters and mandatory
- body contains `1` or `2` book `borrowing` request in array format
- body params example - `{ "bookId" : ["B1"] }`

or
- body params example - ` { "bookId" : ["B1", "B2"] }`
- user will not send blank request `though code will handle`
- user will not ask for the book which do not exist via bookId

`/borrow/userid` for example `/borrow/U1` 

##### Assumptions
`#6`

- userId is passed into request parameters and mandatory
- body contains `1` or `2` book `returning` request in array format
- body params example - `{ "bookId" : ["B1"] }`


or
- body params example - ` { "bookId" : ["B1", "B2"] }`
- user will not send blank request `though code will handle`
- user will not give request for `returning` the book which he did not `borrowed`

`/return/userid` for example `/return/U1` 



