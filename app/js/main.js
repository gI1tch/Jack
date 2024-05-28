
// burger animation
const burger = document.querySelector('.header__burger')


burger.addEventListener('click', (e) => {
    burger.classList.toggle('opened')
    document.querySelector('.burger').classList.toggle('hidden')
    
})

// modal close
const yesBtn = document.querySelector('#no')
const noBtn = document.querySelector('#yes')
yesBtn.addEventListener('click', () => {
    document.querySelector('.modal').remove()
    document.querySelector('.landing-page').style.overflow = 'auto'
    yesBtn.removeEventListener('click')
})
noBtn.addEventListener('click', () =>{
    alert('Извините, эта страница вам не подходит!')
})

console.log('привет мир');

