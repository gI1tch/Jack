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
        
        postData('https://captain-cake.ru/contact/', formJson)
        .then(data => {
            statusMessage.innerHTML = 'Ваше сообщение успешно отправлено'
            document.querySelector('.feedback__text-block p').innerHTML = ''
            statusMessage.classList.add('textStyle')
        }).catch(() => {
            statusMessage.innerHTML = 'Ваше сообщение успешно отправлено!'
            document.querySelector('.feedback__text-block p').innerHTML = ''
            statusMessage.classList.add('textStyle')
       
        }).finally(() => {
            form.style.display = 'none'
            btnClose.style.display = 'flex'
            form.reset()

        })  
    })
} 


const textarea = document.querySelector('textarea');

textarea.addEventListener('keyup', function(){
    var el = this;
    setTimeout(function() {
      el.style.cssText = 'height:auto; padding:0';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 1);
});