const yesBtn = document.querySelector('#no')
const noBtn = document.querySelector('#yes')
if(yesBtn){
    yesBtn.addEventListener('click', () => {
        document.querySelector('.modal').remove()
        // document.querySelector('.landing-page').style.overflow = 'auto'
    })
}
if(noBtn){
    noBtn.addEventListener('click', () =>{
        alert('Извините, эта страница вам не подходит!')
    })
}
