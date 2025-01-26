new ModalVideo("[data-video-id]")
const observer = new MutationObserver(() => {
    document.querySelector('#trailer').style.setProperty('background-image','url("https://img.youtube.com/vi/'+document.querySelector('[data-toggle="trailer-id"]').innerHTML+'/0.jpg")')
    document.querySelector('#trailer').setAttribute('data-video-id',document.querySelector('[data-toggle="trailer-id"]').innerHTML)
    new ModalVideo(document.querySelector("[data-video-id]"))
});
observer.observe(document.querySelector('[data-toggle="trailer-id"]'), {
    attributes:    true,
    childList:     true,
    characterData: true
});
