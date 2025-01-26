
document.querySelectorAll('[data-toggle="copy-ip"]').forEach(function(copy){
    copy.addEventListener('click',function(){
        copyToClipboard(copy.getAttribute('data-ip'))
        let copy_span = copy.querySelector('.copy-text')
        let text = copy_span.innerHTML
        copy_span.innerHTML = copied_text
        setTimeout(function(){
            copy_span.innerHTML = text
        },2000)
    })
})
