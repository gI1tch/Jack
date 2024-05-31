const getData = async (url) => {
    const res = await fetch( url, {method: "GET"})

    if(!res.ok){
        throw new Error (`Ашалеть: ${url}, небольшой статус: ${res.status}`)
    }

    return await res.json()
}

function createBlock(link,title, data, text){
    return `
    <div class="journal__block">
                    <img src="${"https://captain-cake.ru/" + link}" alt="journal-preview" class = 'journal-preview'>

                    <div class="journal__content">
                        <img src="../img/journal/news-paper.png" alt="paper-bg" class = 'journal-bg'>

                        <h2 class = 'journal__title'>${title}</h2>
                        <p class = 'journal__data'>${data}</p>
                        <p class = 'journal__text'>${text}</p>
                    </div>
                </div>
    ` 
}


const result = getData('https://captain-cake.ru/journal/')
console.log(result);
result.then(data => {
    data.forEach(block => {
        document.querySelector('.journal__blocks').innerHTML += `${createBlock(block.image, block.title, block.content, block.data)}`
    });
})