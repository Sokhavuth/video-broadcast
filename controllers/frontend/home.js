// controllers/frontend/home.js

const postdb = require("../../models/post")


class Home{
    async shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    async generateVideos(posts){
        const videos = []
        for(let post of posts){
            var playlist = post.videos
            await videos.push((JSON.parse(playlist))[0].id)
        }
        return videos
    }

    async getPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Home"
        setup.route = "/"
        setup.type = "post"

        const amount = 50
        
        const query_news = { "categories?contains": "News" }
        let newsObj = await postdb.getPosts(req, amount, query_news)
        this.shuffleArray(newsObj.posts)
        setup.newsThumb = newsObj.posts[0].thumb
        const news_videos = await this.generateVideos(newsObj.posts)
        setup.news = JSON.stringify(news_videos)

        const query_movie = { "categories?contains": "Movie" }
        let movieObj = await postdb.getPosts(req, amount, query_movie)
        this.shuffleArray(movieObj.posts)
        setup.movieThumb = movieObj.posts[0].thumb
        const movie_videos = await this.generateVideos(movieObj.posts)
        setup.movies = JSON.stringify(movie_videos)
        
        let postObj = await postdb.getPosts(req, amount)
        setup.latestPosts = postObj.posts.slice(0, 15)
        const post_videos = await this.generateVideos(postObj.posts)
        this.shuffleArray(post_videos)
        setup.latestVideos = JSON.stringify(post_videos)
        
        setup.count = amount
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