//public/scripts/paginate.js

let page = 0

function paginate(){
    $('.pagination img').attr('src', '/images/loading.gif')
    page += 1
    
    $.post(`/paginate`,{page:page},function(data, status){
        appendItem(data.items, data)
    })
}

function appendItem(items, data){
    let html = ''
    
    if(items){
        for(const item of items){
            html += `<a class="title" href="/post/${item.key}">`
            html += item.title
            html += `</a>`
        }
    }
    
    let message = ''
    if(data.count - data.page*data.fpostLimit === 1){
        message = `1 more post`
    }else if(data.count - data.page*data.fpostLimit <= 0){
        message = `no more post`
    }else{
        message = `${data.count - data.page*data.fpostLimit} more posts`
    }

    $('.post-title').append(html)
    $('.pagination p').html(message)
    
    $('.pagination img').attr('src', '/images/loadmore.png')
}