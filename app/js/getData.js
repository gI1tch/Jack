const getData = async (url) => {
    const res = await fetch( url, {method: "GET"})

    if(!res.ok){
        throw new Error (`Ошибка: ${url}, статус: ${res.status}`)
    }

    return await res.json()
}

function createBlock(link, title, date, text){
    return `
    <div class="journal__block">
        <img src="${"https://captain-cake.ru/" + link}" alt="journal-preview" class = 'journal-preview'>

        <div class="journal__content">
            <img src="../img/journal/news-paper.png" alt="paper-bg" class = 'journal-bg'>

            <h2 class = 'journal__title'>${title}</h2>
            <p class = 'journal__data'>${date}</p>
            <p class = 'journal__text'>${text}</p>
        </div>
    </div>
    ` 
}

const step = 3
let currentSlide = 1 
const result = getData('https://captain-cake.ru/api/journal/')
function createInterval(from, to, data){
    for (let i = from; i < to; i++) {
        const block = data[i];
        if(block){
            const year = block.date.slice(0, 4)
            const month = block.date.slice(5, 7)
            const day = block.date.slice(8, 10)
            const date = `${day}.${month}.${year}`
            document.querySelector('.journal__blocks').innerHTML += `${createBlock(block.image, block.title, date, block.content)}`
        }
        else break;
    }
}
result.then(data => {
    createInterval(0, step, data)
    
    return data
}).then((data) => {
    function createSlider(){
        let countOfPosts = data.length
        let slides;
        if(countOfPosts%3==0){
            slides = countOfPosts/3
        } else {
            slides = Math.trunc(countOfPosts/3) + 1
        }
        console.log(slides);
        
        let slidesHTML = `<li class = 'journal-slide active' data-counter='1'>1</li>`;
        for (let i = 1; i < slides; i++) {
            slidesHTML += `<li class = 'journal-slide' data-counter='${i+1}'>${i+1}</li>`
        }
        
        return `   
            <ul class = 'journal__slider-list'>
                <li class = 'journal-func'>
                    <button id = "journal-prev">
                        <img src="../img/arrow.svg" alt="arrow"> 
                    </button> 
                </li>
                ${slidesHTML}
                <li class = 'journal-func'>
                    <button id = "journal-next">
                        <img src="../img/arrow.svg" alt="arrow"> 
                    </button> 
                </li>
            </ul>
        `
    }
    
    const journalSlider =  document.querySelector('.journal__slider') 
    journalSlider.innerHTML = createSlider()

    return data
}).then(data => {
    function prev(){
        if(currentSlide != 1) {
            --currentSlide;
            console.log(currentSlide);

            document.querySelectorAll('.journal-slide').forEach((item, i) => { 
                if(i+1 == currentSlide){
                    item.classList.add('active')
                } else{
                    item.classList.remove('active')
                }
            })
            createBlocks(currentSlide, 'prev', data)
                
        } else{
            return; 
        }    
    }
    
    function next(){
        let countOfSlides = document.querySelectorAll('.journal-slide').length
        if(currentSlide != countOfSlides) {
            ++currentSlide;
            console.log(currentSlide);
            document.querySelectorAll('.journal-slide').forEach((item, i) => { 
                if(i+1 == currentSlide){
                    item.classList.add('active')
                } else{
                    item.classList.remove('active')
                }
            })
            createBlocks(currentSlide, 'next', data)
                
        } else{
            return; 
        }    
    }

    function createBlocks(current, vector, data){
        document.querySelector('.journal__blocks').innerHTML = ''

        if(vector == 'next'){
            createInterval((current-1)*step, current*step, data)
        }
        if(vector == 'prev'){
            createInterval((current-1)*step, (current)*step, data)
        }
    } 
    
    document.querySelector('#journal-prev').addEventListener('click', prev) 
    document.querySelector('#journal-next').addEventListener('click', next) 

    document.querySelectorAll('.journal-slide').forEach((item) => {
        item.addEventListener('click', (e) => {
            let t = e.target
            let dataTarget = t.getAttribute('data-counter')

            currentSlide = dataTarget
            document.querySelectorAll('.journal-slide').forEach((item) => {
                if(item == t){
                    item.classList.add('active')
                } else{
                    item.classList.remove('active')
                }
            }) 
            document.querySelector('.journal__blocks').innerHTML = ''
            createInterval((dataTarget-1)*step, dataTarget*step, data)
        })
    })
})
