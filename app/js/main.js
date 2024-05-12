
// burger animation
const burger = document.querySelector('.header__burger')
let menuActive = true

burger.addEventListener('click', (e) => {
    burger.classList.toggle('opened')

    menuActive = menuActive ? false : true
})

// modal close
const yesBtn = document.querySelector('#no')
yesBtn.addEventListener('click', () => {
    document.querySelector('.modal').remove()
    document.querySelector('body').style.overflow = 'auto'
    yesBtn.removeEventListener('click')
})
