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


const result = getData('https://captain-cake.ru/api/journal/')
result.then(data => {
    data.forEach(block => {
        const year = block.date.slice(0, 4)
        const month = block.date.slice(5, 7)
        const day = block.date.slice(8, 10)
        const date = `${day}.${month}.${year}`
        document.querySelector('.journal__blocks').innerHTML += `${createBlock(block.image, block.title, date, block.content)}`
    });
})
