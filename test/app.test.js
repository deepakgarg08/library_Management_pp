// All test cases here!!

const { assert } = require('chai')
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app')
chai.use(chaiHttp)


//tests for /addbook
let counter = 0;
// let onlyforconsole = 0
describe(" \n Library Test - TDD ", () => {

    it(`\n #${++counter} it should GET a welcome`, (done) => {

        chai.request(app)
            .get('/')
            .end((err, result) => {

                if (err) {
                    done(err);
                }
                assert.typeOf(result.text, 'string');
                done();
            });
    });

    // test for /checkbooks
    // check added books in the library, currently no books in the library

    it(`\n #${++counter} expect empty library msg, as no books are there - GET`, (done) => {

        chai.request(app)
            .get('/checkbooks')
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');
                assert.equal(result.body.output, "Library is empty");

                done();
            });
            
    });

     // test for /checkusers
    // check added users and total users in the library

    it(`\n #${++counter} Get Users from the library -GET`, (done) => {

        chai.request(app)
            .get('/checkusers')
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                
                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');
                assert.equal(result.body.output, "No user exist");
            

                done();
            });
    });

    //store Books into the library

    it(`\n #${++counter} Addbooks add book in the Library say BookId = "B1" - POST`, (done) => {

        const data = {
            bookId: "B1",
            bookname: "English"
        }

        chai.request(app)
            .post('/addbook')
            .send(data)
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');
                assert.typeOf(result.body.book, 'object', 'it is object');
                assert.typeOf(result.body.book.bookId, 'string', 'it is string');
                assert.typeOf(result.body.book.bookname, 'string', 'it is string');
                assert.typeOf(result.body.book.noOfCopiesOfParticularBook, 'number', 'it is number');

                assert.equal(result.body.book.bookId, data.bookId);
                assert.equal(result.body.book.bookname, data.bookname);
                assert.equal(result.body.book.noOfCopiesOfParticularBook, 1);
                assert.equal(result.body.output, "book added");
                assert.lengthOf(result.body.book.bookId, data.bookId.length);
                assert.lengthOf(result.body.book.bookname, data.bookname.length);

                done();
            });
    });

    it(`\n #${++counter} Add new book of same id as before i.e B1 - POST`, (done) => {
        const data = {
            bookId: "B1",
            bookname: "English"
        }
        chai.request(app)
            .post('/addbook')
            .send(data)
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');
                assert.typeOf(result.body.book, 'object', 'it is object');
                assert.typeOf(result.body.book.bookId, 'string', 'it is string');
                assert.typeOf(result.body.book.bookname, 'string', 'it is string');
                assert.typeOf(result.body.book.noOfCopiesOfParticularBook, 'number', 'it is number');

                assert.equal(result.body.book.bookId, data.bookId);
                assert.equal(result.body.book.bookname, data.bookname);
                assert.equal(result.body.book.noOfCopiesOfParticularBook, 2); //this will get updated
                assert.equal(result.body.output, "book added");

                assert.lengthOf(result.body.book.bookId, data.bookId.length);
                assert.lengthOf(result.body.book.bookname, data.bookname.length);

                done();
            });
    });

    it(`\n #${++counter} Add new book of different id say BookId = "B2" - POST`, (done) => {
        const data = {
            bookId: "B2",
            bookname: "Hindi"
        }
        chai.request(app)
            .post('/addbook')
            .send(data)
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');
                assert.typeOf(result.body.book, 'object', 'it is object');
                assert.typeOf(result.body.book.bookId, 'string', 'it is string');
                assert.typeOf(result.body.book.bookname, 'string', 'it is string');
                assert.typeOf(result.body.book.noOfCopiesOfParticularBook, 'number', 'it is number');

                assert.equal(result.body.book.bookId, data.bookId);
                assert.equal(result.body.book.bookname, data.bookname);
                assert.equal(result.body.book.noOfCopiesOfParticularBook, 1);
                assert.equal(result.body.output, "book added");

                assert.lengthOf(result.body.book.bookId, data.bookId.length);
                assert.lengthOf(result.body.book.bookname, data.bookname.length);

                done();
            });
    });

    it(`\n #${++counter} Add new book of same id as before say BookId = "B2" - POST`, (done) => {
        const data = {
            bookId: "B2",
            bookname: "Hindi"
        }
        chai.request(app)
            .post('/addbook')
            .send(data)
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');
                assert.typeOf(result.body.book, 'object', 'it is object');
                assert.typeOf(result.body.book.bookId, 'string', 'it is string');
                assert.typeOf(result.body.book.bookname, 'string', 'it is string');
                assert.typeOf(result.body.book.noOfCopiesOfParticularBook, 'number', 'it is number');

                assert.equal(result.body.book.bookId, data.bookId);
                assert.equal(result.body.book.bookname, data.bookname);
                assert.equal(result.body.book.noOfCopiesOfParticularBook, 2); //this will get updated to +1
                assert.equal(result.body.output, "book added");

                assert.lengthOf(result.body.book.bookId, data.bookId.length);
                assert.lengthOf(result.body.book.bookname, data.bookname.length);

                done();
            });
    });


    // test for /checkbooks
    // check added books in the library

    it(`\n #${++counter} Get books from the library -GET`, (done) => {

        let response = {
            libraryBooks: [
                {
                    bookId: 'B1',
                    bookname: 'English',
                    noOfCopiesOfParticularBook: 2
                },
                {
                    bookId: 'B2',
                    bookname: 'Hindi',
                    noOfCopiesOfParticularBook: 2
                }
            ],
            libraryBooksCurrentlyAvailable: 4,
            libraryBorrowedTotalBooks: 0
        }

        chai.request(app)
            .get('/checkbooks')
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');

                assert.typeOf(result.body.libraryBooksCurrentlyAvailable, 'number', 'it is object');
                assert.typeOf(result.body.libraryBorrowedTotalBooks, 'number', 'it is object');

                //libraryBooksCurrentlyAvailable tells total books in the library, before this 3 books are added

                assert.equal(result.body.libraryBooksCurrentlyAvailable, response.libraryBooksCurrentlyAvailable);
                assert.equal(result.body.libraryBorrowedTotalBooks, response.libraryBorrowedTotalBooks);

                assert.typeOf(result.body.libraryBooks, 'array', 'it is array');

                let arrLB = result.body.libraryBooks
                arrLB.forEach((book, i) => {
                    assert.typeOf(book.bookId, 'string', 'it is string');
                    assert.typeOf(book.bookname, 'string', 'it is string');
                    assert.typeOf(book.noOfCopiesOfParticularBook, 'number', 'it is number');

                    assert.equal(book.bookId, result.body.libraryBooks[i].bookId);
                    assert.equal(book.bookname, result.body.libraryBooks[i].bookname);
                    assert.equal(book.noOfCopiesOfParticularBook, result.body.libraryBooks[i].noOfCopiesOfParticularBook); //this will get updated

                })


                done();
            });
    });

    // test for /addusers - POST


    it(`\n #${++counter} Add new User - POST`, (done) => {

        const data = {
            userId: "U1",
            name: "Deepak",
            class: "masters"
        }
        chai.request(app)
            .post('/adduser')
            .send(data)
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');

                assert.typeOf(result.body.user, 'object', 'it is object');
                assert.typeOf(result.body.user.userId, 'string', 'it is string');
                assert.typeOf(result.body.user.name, 'string', 'it is string');
                assert.typeOf(result.body.user.class, 'string', 'it is number');
                assert.typeOf(result.body.user.borrowedBooksName, 'array', 'it will contain book names in future, so must be empty');
                assert.typeOf(result.body.user.borrowedBooksCounter, 'number', 'contains number value');
                assert.equal(result.body.output, "user added");

                assert.equal(result.body.user.userId, data.userId);
                assert.equal(result.body.user.name, data.name);
                assert.equal(result.body.user.class, data.class);

                assert.equal(result.body.user.borrowedBooksName, 0); //initial set to 0
                assert.equal(result.body.user.borrowedBooksCounter, 0); //initial set to 0

                assert.lengthOf(result.body.user.userId, data.userId.length);
                assert.lengthOf(result.body.user.name, data.name.length);
                assert.lengthOf(result.body.user.class, data.class.length);
                assert.lengthOf(result.body.user.borrowedBooksName, 0);

                done();
            });
    });

    it(`\n #${++counter} Add Another User - POST`, (done) => {

        const data = {
            userId: "U2",
            name: "Garg",
            class: "Bachelor"
        }
        chai.request(app)
            .post('/adduser')
            .send(data)
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');

                assert.typeOf(result.body.user, 'object', 'it is object');
                assert.typeOf(result.body.user.userId, 'string', 'it is string');
                assert.typeOf(result.body.user.name, 'string', 'it is string');
                assert.typeOf(result.body.user.class, 'string', 'it is number');
                assert.typeOf(result.body.user.borrowedBooksName, 'array', 'it will contain book names in future, so must be empty');
                assert.typeOf(result.body.user.borrowedBooksCounter, 'number', 'contains number value');

                assert.equal(result.body.user.userId, data.userId);
                assert.equal(result.body.user.name, data.name);
                assert.equal(result.body.user.class, data.class);
                assert.equal(result.body.output, "user added");

                assert.equal(result.body.user.borrowedBooksName, 0);
                assert.equal(result.body.user.borrowedBooksCounter, 0);

                assert.lengthOf(result.body.user.userId, data.userId.length);
                assert.lengthOf(result.body.user.name, data.name.length);
                assert.lengthOf(result.body.user.class, data.class.length);
                assert.lengthOf(result.body.user.borrowedBooksName, 0);

                done();
            });
    });

    it(`\n #${++counter} Trying to add same user gives error - POST`, (done) => {

        const data = {
            userId: "U2",
            name: "Deepak",
            class: "Bachelor"
        }
        chai.request(app)
            .post('/adduser')
            .send(data)
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');
                assert.equal(result.body.output, 'User already exist with this Userid');

                done();
            });
    });

    // test for /checkusers
    // check added users and total users in the library

    it(`\n #${++counter} Get Users from the library -GET`, (done) => {

        let response = {
            libraryUsers: [
                {
                    userId: 'U1',
                    name: 'Deepak',
                    class: 'masters',
                    borrowedBooksName: [],
                    borrowedBooksCounter: 0
                },
                {
                    userId: 'U2',
                    name: 'Garg',
                    class: 'Bachelor',
                    borrowedBooksName: [],
                    borrowedBooksCounter: 0
                }
            ],
            totalUserInLibrary: 2
        }

        chai.request(app)
            .get('/checkusers')
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');
                result.body.libraryUsers.forEach((user, i) => {

                    assert.typeOf(user, 'object', 'it is object');
                    assert.typeOf(user.userId, 'string', 'it is string');
                    assert.typeOf(user.name, 'string', 'it is string');
                    assert.typeOf(user.class, 'string', 'it is number');
                    assert.typeOf(user.borrowedBooksName, 'array', 'will contain book names');
                    assert.typeOf(user.borrowedBooksCounter, 'number', 'contains number value');

                    assert.equal(user.userId, response.libraryUsers[i].userId);
                    assert.equal(user.name, response.libraryUsers[i].name);
                    assert.equal(user.class, response.libraryUsers[i].class);

                    // assert.equal(user.borrowedBooksName, 0);
                    assert.equal(user.borrowedBooksCounter, response.libraryUsers[i].borrowedBooksCounter);

                    assert.lengthOf(user.userId, response.libraryUsers[i].userId.length);
                    assert.lengthOf(user.name, response.libraryUsers[i].name.length);
                    assert.lengthOf(user.class, response.libraryUsers[i].class.length);
                    assert.lengthOf(user.borrowedBooksName, response.libraryUsers[i].borrowedBooksName.length);
                })
                assert.typeOf(result.body.totalUserInLibrary, 'number', 'tell total users');
                assert.equal(result.body.totalUserInLibrary, response.totalUserInLibrary);

                done();
            });
    });


    // test for borrow books one or two and its different exception cases


    // requesting for borrowing both the same books
    it(`\n #${++counter} requesting for borrowing both the same books - POST`, (done) => {

        // As user U1 already has two book

        const data = {
            bookId: ["B1", "B1"]
        }

        const userId = "U2"


        chai.request(app)
            .post('/borrow/' + userId)
            .send(data)
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');
                assert.equal(result.body.output, "Both borrowing books can't be same");

                done();
            });
    });

    // Borrow one book


    it(`\n #${++counter}  Borrow one book request - POST`, (done) => {

        //send bookId in array, ease working when sending mulitple book request, in our case max 2


        const data = {
            bookId: ["B1"]
        }

        const userId = "U2"

        let responseobj = {
            output: 'books borrowed',
            user: {
                userId: 'U2',
                name: 'Garg',
                class: 'Bachelor',
                borrowedBooksName: [
                    { bookId: 'B1', bookname: 'English' }
                ],
                borrowedBooksCounter: 1
            }
        }


        chai.request(app)
            .post('/borrow/' + userId)
            .send(data)
            .end((err, result) => {


                if (err) {
                    done(err);
                }


                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');

                assert.typeOf(result.body.user, 'object', 'it is object');
                assert.typeOf(result.body.user.userId, 'string', 'it is string');
                assert.typeOf(result.body.user.name, 'string', 'it is string');
                assert.typeOf(result.body.user.class, 'string', 'it is number');
                assert.typeOf(result.body.user.borrowedBooksName, 'array', 'It contain book object');
                assert.typeOf(result.body.user.borrowedBooksCounter, 'number', 'contains number value');

                assert.equal(result.body.output, responseobj.output);
                assert.equal(result.body.user.userId, userId);
                assert.equal(result.body.user.name, responseobj.user.name);
                assert.equal(result.body.user.class, responseobj.user.class);

                assert.equal(result.body.user.borrowedBooksCounter, data.bookId.length);

                assert.lengthOf(result.body.user.userId, responseobj.user.userId.length);
                assert.lengthOf(result.body.user.name, responseobj.user.name.length);
                assert.lengthOf(result.body.user.class, responseobj.user.class.length);

                assert.lengthOf(result.body.user.borrowedBooksName, data.bookId.length);

                let borrowedbook = result.body.user.borrowedBooksName

                borrowedbook.forEach((book, i) => {

                    assert.equal(book.bookId, responseobj.user.borrowedBooksName[i].bookId);
                    assert.equal(book.bookname, responseobj.user.borrowedBooksName[i].bookname);

                })
                done();
            });
    });


    it(`\n #${++counter}  Same Book Borrowing request by same user - denied - POST`, (done) => {

        //send bookId in array, ease working when sending mulitple book request, in our case max 2


        const data = {
            bookId: ["B1"]
        }

        const userId = "U2"

        chai.request(app)
            .post('/borrow/' + userId)
            .send(data)
            .end((err, result) => {


                if (err) {
                    done(err);
                }


                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');
                assert.equal(result.body.output, "You can't borrow the same book (B1)  twice");

                done();
            });
    });



    it(`\n #${++counter}  Deny Borrow book for non user - POST`, (done) => {

        const data = {
            bookId: ["B1"]
        }

        const userId = "annonymous_user"

        chai.request(app)
            .post('/borrow/' + userId)
            .send(data)
            .end((err, result) => {


                if (err) {
                    done(err);
                }


                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');
                assert.equal(result.body.output, "No user Exist with this id");


                done();
            });
    });

    // Borrow two book

    it(`\n #${++counter} Two book Borrow request - POST`, (done) => {

        //send bookId in array, ease working when sending mulitple book request, in our case max 2

        const data = {
            bookId: ["B1", "B2"]
        }

        const userId = "U1"

        let responseobj = {
            output: 'books borrowed',
            user: {
                userId: 'U1',
                name: 'Deepak',
                class: 'masters',
                borrowedBooksName: [

                    { bookId: 'B1', bookname: 'English' },
                    { bookId: 'B2', bookname: 'Hindi' }
                ],
                borrowedBooksCounter: 2
            }
        }

        chai.request(app)
            .post('/borrow/' + userId)
            .send(data)
            .end((err, result) => {

                if (err) {
                    done(err);
                }


                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');

                assert.typeOf(result.body.user, 'object', 'it is object');
                assert.typeOf(result.body.user.userId, 'string', 'it is string');
                assert.typeOf(result.body.user.name, 'string', 'it is string');
                assert.typeOf(result.body.user.class, 'string', 'it is number');
                assert.typeOf(result.body.user.borrowedBooksName, 'array', 'It contain book object');
                assert.typeOf(result.body.user.borrowedBooksCounter, 'number', 'contains number value');

                assert.equal(result.body.output, responseobj.output);
                assert.equal(result.body.user.userId, userId);
                assert.equal(result.body.user.name, responseobj.user.name);

                assert.equal(result.body.user.class, responseobj.user.class);

                assert.equal(result.body.user.borrowedBooksCounter, data.bookId.length);

                assert.lengthOf(result.body.user.userId, responseobj.user.userId.length);
                assert.lengthOf(result.body.user.name, responseobj.user.name.length);
                assert.lengthOf(result.body.user.class, responseobj.user.class.length);
                assert.lengthOf(result.body.user.borrowedBooksName, data.bookId.length);

                let borrowedbook = result.body.user.borrowedBooksName

                borrowedbook.forEach((book, i) => {

                    assert.equal(book.bookId, responseobj.user.borrowedBooksName[i].bookId);
                    assert.equal(book.bookname, responseobj.user.borrowedBooksName[i].bookname);

                })

                done();
            });
    });


    // requesting for borrowing books - more than 2 limit

    it(`\n #${++counter} requesting for borrowing books - more than 2 limit, when user already has 2 books - POST`, (done) => {

        // As user U1 already has two book

        const data = {
            bookId: ["B1"]
        }

        const userId = "U1"


        chai.request(app)
            .post('/borrow/' + userId)
            .send(data)
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');
                assert.equal(result.body.output, "You can't borrow more than 2 books");

                done();
            });
    });

    // requesting for borrowing books - more than 2 limit

    it(`\n #${++counter} requesting for borrowing books - more than 2 limit, when user already has 1 books - POST`, (done) => {

        // As user U1 already has two book

        const data = {
            bookId: ["B1", "B2"]
        }

        const userId = "U2"


        chai.request(app)
            .post('/borrow/' + userId)
            .send(data)
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');
                assert.equal(result.body.output, "1 of 2 books already borrowed, can borrow one more");

                done();
            });
    });

    /*
    Summary -
    Library has 4 books...  B1 and B2 two copies each
    Library has 2 users...  U1 and U2 two copies each
    U2 has 1 book issued i.e B1
    U1 has 2 book issued i.e B1, B2

    so library has 1 book remaining
    and both users are having 3 books with them in total

    */

    //Checking previous two test cases of /checkbooks and /checkusers for validation each

    // test for /checkbooks  - 2nd time (repeat)
    // check added books in the library

    it(`\n #${++counter} Get books from the library -GET`, (done) => {

        let response = {
            libraryBooks: [
                { bookId: 'B2', bookname: 'Hindi', noOfCopiesOfParticularBook: 1 }
            ],
            libraryBooksCurrentlyAvailable: 1,
            libraryBorrowedTotalBooks: 3
        }

        chai.request(app)
            .get('/checkbooks')
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');

                assert.typeOf(result.body.libraryBooksCurrentlyAvailable, 'number', 'it is object');
                assert.typeOf(result.body.libraryBorrowedTotalBooks, 'number', 'it is object');
                //libraryBooksCurrentlyAvailable tells total books in the library, before this 3 books are added
                assert.equal(result.body.libraryBooksCurrentlyAvailable, response.libraryBooksCurrentlyAvailable);
                assert.equal(result.body.libraryBorrowedTotalBooks, response.libraryBorrowedTotalBooks);

                assert.typeOf(result.body.libraryBooks, 'array', 'it is array');

                let arrLB = result.body.libraryBooks
                arrLB.forEach((book, i) => {
                    assert.typeOf(book.bookId, 'string', 'it is string');
                    assert.typeOf(book.bookname, 'string', 'it is string');
                    assert.typeOf(book.noOfCopiesOfParticularBook, 'number', 'it is number');

                    assert.equal(book.bookId, result.body.libraryBooks[i].bookId);
                    assert.equal(book.bookname, result.body.libraryBooks[i].bookname);
                    assert.equal(book.noOfCopiesOfParticularBook, result.body.libraryBooks[i].noOfCopiesOfParticularBook); //this will get updated

                })

                done();
            });
    });

    // test for /checkusers
    // check added users and total users in the library

    it(`\n #${++counter} Get Users from the library -GET`, (done) => {

        let response = {
            libraryUsers: [
                {
                    userId: 'U1',
                    name: 'Deepak',
                    class: 'masters',
                    borrowedBooksName: [{
                        bookId: "B1",
                        bookname: "English"
                    },
                    {
                        bookId: "B2",
                        bookname: "Hindi"
                    }],
                    borrowedBooksCounter: 2
                },
                {
                    userId: 'U2',
                    name: 'Garg',
                    class: 'Bachelor',
                    borrowedBooksName: [{
                        bookId: "B1",
                        bookname: "English"
                    }],
                    borrowedBooksCounter: 1
                }
            ],
            totalUserInLibrary: 2
        }
        chai.request(app)
            .get('/checkusers')
            .end((err, result) => {

                if (err) {
                    done(err);
                }

                assert.typeOf(result.body, 'object', 'it is object');
                result.body.libraryUsers.forEach((user, i) => {

                    assert.typeOf(user, 'object', 'it is object');
                    assert.typeOf(user.userId, 'string', 'it is string');
                    assert.typeOf(user.name, 'string', 'it is string');
                    assert.typeOf(user.class, 'string', 'it is number');
                    assert.typeOf(user.borrowedBooksName, 'array', 'will contain book names');
                    assert.typeOf(user.borrowedBooksCounter, 'number', 'contains number value');

                    assert.equal(user.userId, response.libraryUsers[i].userId);
                    assert.equal(user.name, response.libraryUsers[i].name);
                    assert.equal(user.class, response.libraryUsers[i].class);

                    // assert.equal(user.borrowedBooksName, 0);
                    assert.equal(user.borrowedBooksCounter, response.libraryUsers[i].borrowedBooksCounter);

                    assert.lengthOf(user.userId, response.libraryUsers[i].userId.length);
                    assert.lengthOf(user.name, response.libraryUsers[i].name.length);
                    assert.lengthOf(user.class, response.libraryUsers[i].class.length);
                    assert.lengthOf(user.borrowedBooksName, response.libraryUsers[i].borrowedBooksName.length);
                })
                assert.typeOf(result.body.totalUserInLibrary, 'number', 'tell total users');
                assert.equal(result.body.totalUserInLibrary, response.totalUserInLibrary);

                done();
            });
    });

    // return one book

    it(`\n #${++counter}  return one book request - POST`, (done) => {

        //send bookId in array, ease working when sending mulitple book request, in our case max 2

        //till now user 'U2' has borrowed 1 book, we will return it back to the library
        const data = {
            bookId: ["B1"]
        }

        const userId = "U2"

        let responseobj = {

            output: 'books returned',
            user: {
                userId: 'U2',
                name: 'Garg',
                class: 'Bachelor',
                borrowedBooksName: [],
                borrowedBooksCounter: 0
            }
        }

        chai.request(app)
            .post('/return/' + userId)
            .send(data)
            .end((err, result) => {


                if (err) {
                    done(err);
                }


                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');

                assert.typeOf(result.body.user, 'object', 'it is object');
                assert.typeOf(result.body.user.userId, 'string', 'it is string');
                assert.typeOf(result.body.user.name, 'string', 'it is string');
                assert.typeOf(result.body.user.class, 'string', 'it is number');
                assert.typeOf(result.body.user.borrowedBooksName, 'array', 'It contain book object');
                assert.typeOf(result.body.user.borrowedBooksCounter, 'number', 'contains number value');

                assert.equal(result.body.output, responseobj.output);
                assert.equal(result.body.user.userId, userId);
                assert.equal(result.body.user.name, responseobj.user.name);
                assert.equal(result.body.user.class, responseobj.user.class);

                assert.equal(result.body.user.borrowedBooksCounter, responseobj.user.borrowedBooksCounter);

                assert.lengthOf(result.body.user.userId, responseobj.user.userId.length);
                assert.lengthOf(result.body.user.name, responseobj.user.name.length);
                assert.lengthOf(result.body.user.class, responseobj.user.class.length);

                assert.lengthOf(result.body.user.borrowedBooksName, responseobj.user.borrowedBooksName.length);


                done();

            });
    });


    // return two book

    it(`\n #${++counter}  return two book request - POST`, (done) => {

        //send bookId in array, ease working when sending mulitple book request, in our case max 2

        //till now user 'U1' has borrowed 2 book, we will return it back to the library
        const data = {
            bookId: ["B1", "B2"]
        }

        const userId = "U1"

        let responseobj = {
            output: 'books returned',
            user: {
                userId: 'U1',
                name: 'Deepak',
                class: 'masters',
                borrowedBooksName: [],
                borrowedBooksCounter: 0
            }
        }

        chai.request(app)
            .post('/return/' + userId)
            .send(data)
            .end((err, result) => {


                if (err) {
                    done(err);
                }


                assert.typeOf(result.body, 'object', 'it is object');
                assert.typeOf(result.body.output, 'string', 'it is message in string');

                assert.typeOf(result.body.user, 'object', 'it is object');
                assert.typeOf(result.body.user.userId, 'string', 'it is string');
                assert.typeOf(result.body.user.name, 'string', 'it is string');
                assert.typeOf(result.body.user.class, 'string', 'it is number');
                assert.typeOf(result.body.user.borrowedBooksName, 'array', 'It contain book object');
                assert.typeOf(result.body.user.borrowedBooksCounter, 'number', 'contains number value');

                assert.equal(result.body.output, responseobj.output);
                assert.equal(result.body.user.userId, userId);
                assert.equal(result.body.user.name, responseobj.user.name);
                assert.equal(result.body.user.class, responseobj.user.class);

                assert.equal(result.body.user.borrowedBooksCounter, responseobj.user.borrowedBooksCounter);

                assert.lengthOf(result.body.user.userId, responseobj.user.userId.length);
                assert.lengthOf(result.body.user.name, responseobj.user.name.length);
                assert.lengthOf(result.body.user.class, responseobj.user.class.length);

                assert.lengthOf(result.body.user.borrowedBooksName, responseobj.user.borrowedBooksName.length);


                done();

            });
    });

});






