

window.Telegram.WebApp.onEvent('viewportChanged', expandHandler)

function expandHandler(object){
  if (!this.isExpanded){
      this.expand()
    }
}
// burger animation
const burger = document.querySelector('.header__burger')
const burgerScreen = document.querySelector('.burger')

burgerScreen.addEventListener('click', (e) => {
    if(e.target == burgerScreen){
        burger.classList.toggle('opened')
        burgerScreen.classList.toggle('hidden')
        document.querySelector('.burger-container').classList.toggle('burger-active')
    }
})



burger.addEventListener('click', (e) => {
    burger.classList.toggle('opened')
    burgerScreen.classList.toggle('hidden')
    document.querySelector('.burger-container').classList.toggle('burger-active')
    
})
const urlParams = new URLSearchParams(window.location.search)
const accessToken = urlParams.get('access_token')
if (accessToken) {
    const modal = document.querySelector('.modal')
    if (modal) {
        modal.remove()
        document.querySelector('.landing-page').style.overflow = 'auto'
    }
    const links = document.querySelectorAll('a')
    links.forEach(link => {
        console.log(link);
        const href = link.getAttribute('href')
        link.setAttribute('href', `${href}?access_token=${accessToken}`) 
    });
}
