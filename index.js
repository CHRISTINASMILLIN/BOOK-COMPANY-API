//MAIN BACKEND FILE

const BookModel = require('./database/books');
const AuthorModel =require('./database/authors');
const PublicationModel = require('./database/publications');

const express = require("express");

const app = express();
app.use(express.json());

var mongoose = require ('mongoose');
var mongoDB = "mongodb+srv://smile_28:5zvVUgOrnCtjtXjs@cluster0.hx6eo.mongodb.net/book-company?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {useNewUrlParser : true, useUnifiedTopology: true}).then(() => console.log("CONNECTION ESTABLISHED"));


// http://localhost:3000/
app.get("/", (req, res) => {
    return res.json({ "WELCOME": 'to my Backend Software for the book company' });
})

// http://localhost:3000/books
app.get("/books", async (req, res) => {
    const getAllBooks = await BookModel.find();
    res.send(getAllBooks);
});

// http://localhost:3000/book-isbn/12ONE/
app.get("/book-isbn/:isbn", async (req, res) => {
    //console.log(req.params);
    const { isbn } = req.params;
    //console.log(isbn);
    const getSpecificBook = await BookModel.findOne({ISBN :isbn});
    console.log(getSpecificBook);

    if (getSpecificBook === null) {
        return res.json({ "error": 'No Book found for the ISBN of ${isbn}' });
    };
    return res.json(getSpecificBook);
});

// http://localhost:3000/book-genre/tech/
app.get("/book-genre/:genre", async (req, res) => {
    console.log(req.params);
    const { genre } = req.params;
    console.log(genre);

    const getSpecificBooks = await BookModel.find({Genre: genre});
    console.log(getSpecificBooks);
    console.log(getSpecificBooks.length);

    if (getSpecificBooks.length === 0) {
        return res.json({ "error": 'No Books found for the genre  of ${genre}' });
    };
    return res.json(getSpecificBooks);
});

// http://localhost:3000/authors
app.get("/authors", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    res.send(getAllAuthors);
});

// http://localhost:3000/author-id/1/
app.get("/author-id/:id", async (req, res) => {
    console.log(req.params);
    let { id } = req.params;
    id = Number(id);
    console.log(id);
    const getSpecificAuthor = await AuthorModel.findOne({id :id});
    console.log(getSpecificAuthor);
    console.log(getSpecificAuthor);

    if (getSpecificAuthor === null) {
        return res.json({
            "error": 'No author found for the Id of ${ id }'
        });
    };
    return res.json(getSpecificAuthor);
});

// http://localhost:3000/authors-isbn/12ONE/
app.get("/authors-isbn/:isbn", async (req, res) => {
    console.log(req.params);
    const { isbn } = req.params;
    console.log(isbn);

    const getSpecificAuthors = await AuthorModel.find({isbn:isbn});
    console.log(getSpecificAuthors);
    console.log(getSpecificAuthors.length);

    if (getSpecificAuthors.length === 0) {
        return res.json({ "error": 'No Author found for the book with isbn $(isbn) ' });
    };
    return res.json(getSpecificAuthors);

});


//http://localhost:3000/publications
app.get("/publications", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
})

// http://localhost:3000/pub-id/1/
app.get("/pub-id/:id", async (req, res) => {
    console.log(req.params);
    let { id } = req.params;
    id = Number(id);
    console.log(id);
    const getSpecificPublication = await PublicationModel.findOne({id:id});
    console.log(getSpecificPublication);
    console.log(getSpecificPublication);

    if (getSpecificPublication=== null) {
        return res.json({
            "error": 'No publication found for the Id of ${ id }'
        });
    };
    return res.json(getSpecificPublication);
})

// http://localhost:3000/publication/34FOUR/
app.get("/publication/:isbn", async (req, res) => {
    console.log(req.params);
    const { isbn } = req.params;
    console.log(isbn);

    const getSpecificPublication =await PublicationModel.find({ISBN :isbn})
    console.log(getSpecificPublication);
    console.log(getSpecificPublication.length);

    if (getSpecificPublication.length === 0) {
        return res.json({ "error": 'No Publication found for the book of isbn  of $(isbn)' });
    };
    return res.json(getSpecificPublication);
});

// http://localhost:3000/book
app.post("/book", (req, res) => {
    const addNewBook = BookModel.create(req.body);
    return res.json({
        books: addNewBook,
        message: "Book was added !!!"
    });
});

// http://localhost:3000/author
app.post("/author", async (req, res) => {
    const addNewAuthor = await AuthorModel.create(req.body);
    return res.json({
        authors: addNewAuthor,
        message: "Author was added !!!"
    });
});

// http://localhost:3000/publication
app.post("/publication", async (req, res) => {
    const addNewPublication = await PublicationModel.create(req.body);
    return res.json({
        publications: addNewPublication,
        message: "Publication was added !!!"

});
});

//http://localhost:3000/book-update/12ONE
app.put("/book-update/:isbn", async (req,res) => {
    // console.log(req.body);
    // console.log(req.params);
    const {isbn} = req.params;
    const updateBook = await BookModel.findOneAndUpdate({ISBN :isbn}, req.body, {new:true});
    return res.json ({bookUpdated: updateBook,message : "Book was Updated !!!"});
});

//http://localhost:3000/author-update/1
app.put("/author-update/:id", async (req,res) => {
    const {id} = req.params;
    const updateAuthor = await AuthorModel.findOneAndUpdate({id:id}, req.body, {new:true});
    return res.json ({authorUpdated: updateAuthor,message : "Author was Updated !!!"});
});

//http://localhost:3000/publication-update/1
app.put("/publication-update/:id", async (req,res) => {
    const {id} = req.params;
    const updatePublication = await PublicationModel.findOneAndUpdate({id:id}, req.body, {new:true});
    return res.json ({publicationUpdated: updatePublication,message : "Publication was Updated !!!"});
});

//http://localhost:3000/book-delete/12ONE
app.delete("/book-delete/:isbn", async (req,res) => {
    const {isbn}= req.params;
    const deleteBook = await BookModel.deleteOne({ISBN:isbn});
    return res.json ({bookDeleted : deleteBook ,message :"Book was deleted"});
});

//http://localhost:3 000/author-delete/1
app.delete("/author-delete/:id", async (req,res) => {
    const {id}= req.params;
    const deleteAuthor = await AuthorModel.deleteOne({id:id});
    return res.json ({authorDeleted : deleteAuthor ,message :"Author was deleted"});
});

//http://localhost:3000/publication-delete/1
app.delete("/publication-delete/:id", async (req,res) => {
    const {id}= req.params;
    const deletePublication = await PublicationModel.deleteOne({id:id});
    return res.json ({publicationDeleted : deletePublication ,message :"Publication was deleted"});
});

//http://localhost:3000/book-author-delete/12TWO/1
app.delete("/book-author-delete/:isbn/:id", async (req, res) => {
    const {id,isbn} = req.params;
    let getSpecifiedBook = await BookModel.findOne({ISBN:isbn});
    if (getSpecifiedBook ===null){
        return res.json({"error":'No book for the isbn ${isbn}'});
    }
    else{
        getSpecifiedBook.authors.remove(id);
        const updateBook = await BookModel.findOneAndUpdate({ISBN:isbn},getSpecifiedBook,{new: true});
        return res.json({bookUpdated: updateBook ,message :"Author was Deleted from the Book !!!"});
    }
    

});

//http://localhost:3000/author-book-delete/1/12TWO
app.delete("/author-book-delete/:id/:isbn", async (req, res) =>{
    const {isbn,id} = req.params;
    let getSpecifiedAuthor = await AuthorModel.findOne({id:id});
    if (getSpecifiedAuthor ===null){
        return res.json({"error":'No Author for the id ${id}'});
    }
    else{
        getSpecifiedAuthor.books.remove(isbn);
        const updateAuthor = await AuthorModel.findOneAndUpdate({id:id},getSpecifiedAuthor,{new: true});
        return res.json({AuthorUpdated: updateAuthor ,message :"Book was Deleted from the Author !!!"});
    }
});



app.listen(3000, () => {
    console.log("MY EXPRESS APP IS RUNNING....");
});