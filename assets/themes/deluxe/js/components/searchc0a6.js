
let type_timeout;
let posts;
document.querySelector('[data-toggle="search-content"]').classList.add('hide')
document.querySelector('#content').addEventListener('click',function(e){
    if(e.target.type !== 'input'){
        document.querySelector('[data-toggle="search-content"]').classList.add('hide')
    }
})
function loadPosts() {
    axios({
        url: 'api/posts',
        method: 'GET',

    }).then(function (result) {
        posts = result.data;
    })
}
loadPosts()
function getPostByKeyword(keyword){
    let i = 0;
    let min_one_post = false

    document.querySelector('[data-toggle="search-content"]').innerHTML = ""
    posts.forEach(function(value,key){
        let post = value
        let post_added = false
        Object.entries(value).forEach(([key1, value2]) => {
            if(value2.toString().toLowerCase().includes(keyword.toLowerCase())) {
                post_added = true
                min_one_post = true
            }
        })
        if(post_added){
            if(i < 5) {
                let el = `<a class="search-link" href="/news/`+post.slug+`">
                        `+post.title+`
                        </a>`
                document.querySelector('[data-toggle="search-content"]').insertAdjacentHTML('beforeend', el)
                i++;
            }
        }
    })
    if(!min_one_post) {
        let el = `<p class="text-color-4 mb-0 text-center mt-2">`+no_search+`</p>`
        document.querySelector('[data-toggle="search-content"]').insertAdjacentHTML('beforeend', el)
    }
}
document.querySelector('[data-toggle="search"]').addEventListener('input',function(){
    let input_val = this.value
    if(input_val.trim().length !== 0) {
        document.querySelector('[data-toggle="search-content"]').classList.remove('hide')
    } else {
        document.querySelector('[data-toggle="search-content"]').classList.add('hide')
        console.log(input_val)
    }
    if(posts) {
        if(type_timeout) {
            clearTimeout(type_timeout);
        }
        type_timeout = setTimeout(function(){

            getPostByKeyword(input_val)
            type_timeout = false;
        },200)
    }
})

