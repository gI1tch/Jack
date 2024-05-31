
// burger animation
const burger = document.querySelector('.header__burger')


burger.addEventListener('click', (e) => {
    burger.classList.toggle('opened')
    document.querySelector('.burger').classList.toggle('hidden')
    document.querySelector('.burger-container').classList.toggle('burger-active')
    
})

// modal close


