// controllers/frontend/category.js

const bookdb = require("../../models/book")


class Category{
    async getBooks(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Category page"
        setup.route = "/category"
        setup.type = req.params.category

        const { books, length } = await bookdb.getBooks(req, setup.categoryItemLimit)
        setup.items = books
        setup.count = length
        setup.page = 1
        
        res.render("base", { data: setup })
    }

    async paginate(req, res){
        const setup = await req.mysetup()
        const { books, length } = await bookdb.paginate(req, setup.categoryItemLimit)
        setup.count = length
        setup.items = books
        setup.page = parseInt(req.body.page) + 1
        res.json(setup)
    }
}


module.exports = new Category()