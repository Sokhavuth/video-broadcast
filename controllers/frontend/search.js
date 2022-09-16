// controllers/frontend/search.js

const searchdb = require("../../models/search")


class Search{
    async searchItems(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Search page"
        setup.route = "/search"
        setup.type = "book"

        req.body.search_type = "books"
        setup.searchResult = await searchdb.searchItems(req, 12)

        res.render("base", { data: setup })
    }
}


module.exports = new Search()