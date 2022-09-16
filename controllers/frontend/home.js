// controllers/frontend/home.js

const bookdb = require("../../models/book")


class Home{
    async getPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Home"
        setup.route = "/"

        const query = {"bookCover?ne": null, "bookCover?ne": ""}
        let { books, length } = await bookdb.getBooks(req, 5, query)
        setup.items = books
        setup.count = length
        const bookObj = await bookdb.getBooks(req, 13)
        setup.articles = bookObj.books
        setup.randomBooks = await bookdb.getRandomBooks(req, setup.fpostLimit, query)
        setup.page = 1

        res.render("base", { data: setup })
    }

    async navigate(req, res){
        const setup = await req.mysetup()
        
        if(req.params.element == "top_nav"){
            var query = {"bookCover?ne": null, "bookCover?ne": ""}
            var { books, length } = await bookdb.navigate(req, 5, query)
            
        }else{
            var query = {}
            var { books, length } = await bookdb.navigate(req, 13, query)
        }
        
        setup.count = length
        setup.items = books
        res.json(setup)
    }

    async getRandomItems(req, res){
        const setup = await req.mysetup()

        const query = {"bookCover?ne": null, "bookCover?ne": ""}
        setup.randomBooks = await bookdb.getRandomBooks(req, setup.fpostLimit, query)
        res.json(setup)
    }

    async getBook(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Book page"
        setup.route = "/book"

        setup.item = await bookdb.getBook(req)
        const query = {"bookTitle": setup.item.bookTitle}
        setup.articles = await bookdb.getBooks(req, false, query)

        res.render("base", { data: setup })
    }
}


module.exports = new Home()