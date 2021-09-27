const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())

app.get("/", (req, res) => {

    res.send("Welcome to Library Management System")
})

let libraryBooks = [], libraryUsers = []
let libraryBooksCurrentlyAvailable = 0; //total no of books available now in library in current state
let libraryBorrowedTotalBooks = 0 //total no of books borrowed by all users in current state
let totalUserInLibrary = 0; //total no of users

//find book with their bookId
function findBook(bookId) {
    return libraryBooks.find(book => bookId === book.bookId)
}

//find user with their userid
function findUser(userId) {
    return libraryUsers.find(user => userId === user.userId)
}


//remove particular book from Libraries
function filterOutparticularBook(bookId) {
    libraryBooks = libraryBooks.filter(book => bookId !== book.bookId)
}


function borrowBookRequest(book, bookId, user) {
    //Simply remove particular book if only 1 copy of book is there
    if (book.noOfCopiesOfParticularBook === 1) {
        filterOutparticularBook(bookId)

    }
    //If multiple copies of requested book exist
    else {
        filterOutparticularBook(bookId)
        // just reduce noofcopiesofParticularbook and push back updated details
        book.noOfCopiesOfParticularBook -= 1
        libraryBooks.push(book)
    }

    user.borrowedBooksCounter += 1
    const { noOfCopiesOfParticularBook, ..._book } = book
    user.borrowedBooksName.push(_book)

    libraryBooksCurrentlyAvailable -= 1
    libraryBorrowedTotalBooks++

}

//Assuming user will not raise request the book which is not borrowed

function returnBookRequest(bookId, user) {

    const book = user.borrowedBooksName[0].bookId === bookId ? user.borrowedBooksName.shift() : user.borrowedBooksName.pop()


    user.borrowedBooksCounter -= 1

    libraryBooksCurrentlyAvailable++
    libraryBorrowedTotalBooks--

    //check if copy of book is already present in library
    const checkBook = findBook(bookId)
    //if present update only no of copies
    if (checkBook) {
        filterOutparticularBook(bookId)
        checkBook.noOfCopiesOfParticularBook += 1;
        libraryBooks.push(checkBook)

    }
    // Add that book from user
    else {
        book.noOfCopiesOfParticularBook = 1;
        libraryBooks.push(book)

    }

}


//Add books in the library

app.post("/addbook", (req, res) => {
    req.body.noOfCopiesOfParticularBook = 1;

    const bookId = req.body.bookId
    const book = findBook(bookId)

    if (book) {
        book.noOfCopiesOfParticularBook += 1;
        libraryBooksCurrentlyAvailable++
        res.send({ output: "book added", book })
    }
    else {
        libraryBooks.push(req.body)
        libraryBooksCurrentlyAvailable++
        res.send({ output: "book added", book: req.body })
    }
})

//check books Details in the library

app.get("/checkbooks", (req, res) => {
    if (libraryBooks.length === 0) {
        return res.send({ output: "Library is empty" })
    }

    return res.send({
        libraryBooks, libraryBooksCurrentlyAvailable,
        libraryBorrowedTotalBooks
    })
})

//Add Users in the library


app.post("/adduser", (req, res) => {


    const userId = req.body.userId
    const user = findUser(userId)
    if (user) {
        return res.send({ output: "User already exist with this Userid" })
    }

    req.body.borrowedBooksName = []
    req.body.borrowedBooksCounter = 0
    totalUserInLibrary++

    libraryUsers.push(req.body)

    res.send({ output: "user added", user: req.body })

})

//check user Details in the library


app.get("/checkusers", (req, res) => {
    if (libraryUsers.length === 0) {
        return res.send({ output: "No user exist" })
    }
    return res.send({ libraryUsers, totalUserInLibrary })
})



// user requesting books for borrowing one or two books

//Assuming user can't ask for the book which do not exist
//Assuming user can't send blank request

app.post("/borrow/:id", (req, res) => {

    const userId = req.params.id
    if (req.body.bookId.length > 2) return res.send({ output: "Please send only two book request" })

    const [bookId, bookId2 = null] = req.body.bookId
    let noOfBooksBorrowRequest = req.body.bookId.length


    let user = findUser(userId)

    if (!user) {
        return res.send({ output: "No user Exist with this id" })
    }

    else if (user.borrowedBooksCounter === 2) {
        return res.send({ output: "You can't borrow more than 2 books" })
    }

    else if (user.borrowedBooksCounter === 1) {
        if (req.body.bookId.length === 2) return res.send({ output: "1 of 2 books already borrowed, can borrow one more" })
    }

    else if (bookId === bookId2) {
        return res.send({ output: "Both borrowing books can't be same" })
    }

    if (user.borrowedBooksName[0] && user.borrowedBooksName[0].bookId === bookId) {
        return res.send({ output: `You can't borrow the same book (${bookId})  twice` })
    }

    let book = findBook(bookId)

    switch (noOfBooksBorrowRequest) {

        case 1: {
            borrowBookRequest(book, bookId, user)
            return res.send({ output: "books borrowed", user })

        }

        case 2: {
            let book2 = findBook(bookId2)
           
            borrowBookRequest(book, bookId, user)
            borrowBookRequest(book2, bookId2, user)
            return res.send({ output: "books borrowed", user })

        }

        default:
            // btw it will never execute
            return res.send({ output: 'Invalid request' })

    }

})

app.post("/return/:id", (req, res) => {
    const userId = req.params.id
    const [bookId, bookId2 = null] = req.body.bookId

    let noOfBooksReturnRequest = req.body.bookId.length

    let user = findUser(userId)

    switch (noOfBooksReturnRequest) {

        case 1: {
            returnBookRequest(bookId, user)
            return res.send({ output: "books returned", user })

        }
        case 2: {
            returnBookRequest(bookId, user)
            returnBookRequest(bookId2, user)
            return res.send({ output: "books returned", user })
        }
        default:
            //by the way this will never execute
            return res.send({ output: "Invalid request" })

    }

})



app.listen(PORT, () => {
    console.log("Server started at port ", PORT);
})


module.exports = app;
