const postData = async (url, data) => {
    const res = await fetch(url,{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: data
    })
    
    return await res.json()
}

const statusMessage = document.querySelector('.status')
const form = document.querySelector('.feedback__form')
const btnClose = document.querySelector('.close')

post(form)

function post(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault()
       
        const formData = new FormData(form)
    
        const formJson = JSON.stringify(Object.fromEntries(formData.entries()))
        console.log(formJson);
        postData('https://captain-cake.ru/contact/', formJson)
        .then(data => {
            console.log(data);
            statusMessage.innerHTML = 'Ваше сообщение успешно отправлено'
            document.querySelector('.feedback__text-block p').innerHTML = ''
            
        }).catch(() => {
            statusMessage.innerHTML = 'Извините, произошла ошибка!'
            document.querySelector('.feedback__text-block p').innerHTML = 'Попробуйте позже.'
        }).finally(() => {
    
            form.style.display = 'none'
            btnClose.style.display = 'flex'
            form.reset()

        })  
    })
} 

function createModal(status){
    const prevModalDialog = document.querySelector('.modal__dialog')

    prevModalDialog.classList.add('hide')
    openModal(`.modal`, )

    const thanksModal = document.createElement('div')
    thanksModal.classList.add('modal__dialog')

    thanksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__close">X</div>
        <div class="modal__title"> ${status}</div>
        </div>
        `

    document.querySelector('.modal').append(thanksModal)
    
    setTimeout(() => {
        thanksModal.remove()
        prevModalDialog.classList.add('show')
        prevModalDialog.classList.remove('hide')
        modal.style.display = 'none'
        
    }, 100000)
}

const textarea = document.querySelector('textarea');

textarea.addEventListener('keyup', function(){
	if(this.scrollTop > 0){
		this.style.height = this.scrollHeight + "px";
  }
});