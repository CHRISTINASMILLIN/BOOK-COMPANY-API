let books = [{
        ISBN: "12ONE",
        title: "JAVASCRIPT",
        author: [1],
        language: "eng",
        pubDate: "16-06-2018",
        numOfPage: 528,
        Genre: ["computer", "programming", "Studies"],
        publication: 2,
    },
    {
        ISBN: "12TWO",
        title: "NODEJS",
        author: [1, 2],
        language: "eng",
        pubDate: "11-09-2019",
        numOfPage: 143,
        Genre: ["computer", "tech", "Studies"],
        publication: 1,
    },
    {
        ISBN: "34THREE",
        title: "REACT.JS",
        author: [2],
        language: "eng",
        pubDate: "10-04-2020",
        numOfPage: 609,
        Genre: ["computer", "WEB DEVELOPMENT", "Studies"],
        publication: 3
    },
    {
        ISBN: "34FOUR",
        title: "MONGODB",
        author: [1, 2],
        language: "eng",
        pubDate: "23-06-2019",
        numOfPage: 348,
        Genre: ["computer", "WEB DEVELOPMENT", "Studies"],
        publication: 1
    },
]
let authors = [{
        id: 1,
        name: "Christina",
        books: ["12ONE", "34FOUR", "12TWO"],
    },
    {
        id: 2,
        name: "Joe",
        books: ["34THREE", "12TWO"],
    }
]
let publications = [{
        id: 1,
        name: "SMILE PUBLICATIONS",
        books: ["12TWO", "34FOUR"],
    }, {
        id: 2,
        name: "ANGEL PUBLICATIONS",
        books: ["12ONE"],
    },
    {
        id: 3,
        name: "MERVIN PUBLICATIONS",
        books: ["34THREE"],

    }
];

module.exports = { books, authors, publications };