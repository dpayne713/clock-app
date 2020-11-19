
const background = document.querySelector('.background'); 
const more = document.querySelector('#MORE');
const quote = document.querySelector('.main-top__quote-QUOTE');
const author = document.querySelector('.main-top__quote-AUTHOR');
const reloadQuote = document.querySelector('#RELOAD') 

const moreBtn = {
    main: document.querySelector('.main'), 
    lower: document.querySelector('.lower'), 
    label: document.querySelector('.main-btm-right__button-LABEL-text'), 
    arrow: document.querySelector('#LABEL-ARROW')
}

const timeDOM = {
    time: document.querySelector('#TIME'), 
    timezone: document.querySelector('#TIMEZONE'), 
    todImage: document.querySelector('#TOD-IMAGE'),
    tod: document.querySelector('#TOD'), 
    city : document.querySelector('#CITY')
}

const moreInfo = {
    timezone: document.querySelector('#LOWER-TIMEZONE'), 
    dayOfYear: document.querySelector('#LOWER-DAYOFTHEYEAR'),
    dayOfWeek: document.querySelector('#LOWER-DAYOFTHEWEEK'), 
    weekNumber : document.querySelector('#LOWER-WEEKNUMBER'), 
    lowerBackground : document.querySelector('.lower'), 
    lowerTextColor : document.querySelectorAll('.lower-display')
}

more.addEventListener('change', (event)=> {
  moveUpDown(event.target.checked);
});

reloadQuote.addEventListener('click', ()=> {
    getQuote();
});

async function getLocation() {
    const response = await fetch('/location', {
        method: 'GET', 
        mode: 'cors', 

    })
    const data = await response.json(); 
    timeDOM.city.textContent = data.city; 
    moreInfo.timezone.textContent = data.timeZone; 
}


async function getQuote() {
    const response = await fetch('/quote', {
        method: 'GET', 
        mode: 'cors', 

    })
    const data = await response.json(); 
    quote.textContent = data.content; 
    author.textContent = data.author;    
};



async function getTime(format) {
    let hour12 = false;
    (format === '24') ? hour12 = false : hour12 = true
    const data = new Date().toLocaleTimeString([], {hour12, timeZoneName: 'short'}).split(' '); 
    const time = data[0].slice(0,5); 
    const timezone = data[1];
    const ampm = parseInt(new Date().toLocaleTimeString([], {hour12: false}).split(' ')[0].split(':'));

    switch (true) {
        case ampm > 6 && ampm < 12 :
            timeDOM.todImage.innerHTML = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M11.78 19.417c.594 0 1.083.449 1.146 1.026l.006.125v1.842a1.152 1.152 0 01-2.296.125l-.007-.125v-1.842c0-.636.516-1.151 1.152-1.151zM6.382 17.18a1.15 1.15 0 01.09 1.527l-.09.1-1.302 1.303a1.152 1.152 0 01-1.718-1.528l.09-.1 1.302-1.302a1.15 1.15 0 011.628 0zm12.427 0l1.303 1.303a1.15 1.15 0 11-1.628 1.627L17.18 18.81a1.15 1.15 0 111.628-1.628zM11.781 5.879a5.908 5.908 0 015.901 5.902 5.908 5.908 0 01-5.901 5.902 5.908 5.908 0 01-5.902-5.902 5.908 5.908 0 015.902-5.902zm10.63 4.75a1.151 1.151 0 110 2.303h-1.843a1.151 1.151 0 110-2.303h1.842zm-19.418 0a1.151 1.151 0 01.126 2.296l-.125.007H1.15a1.151 1.151 0 01-.125-2.296l.125-.007h1.842zm1.985-7.268l.1.09 1.303 1.302a1.151 1.151 0 01-1.528 1.718l-.1-.09L3.45 5.08A1.15 1.15 0 014.978 3.36zm15.133.09c.45.449.45 1.178 0 1.628L18.808 6.38a1.151 1.151 0 11-1.628-1.628l1.303-1.303c.449-.449 1.178-.449 1.628 0zM11.781 0c.636 0 1.151.515 1.151 1.151v1.843a1.152 1.152 0 01-2.303 0V1.15C10.63.515 11.145 0 11.781 0z" fill="#FFF" fill-rule="nonzero"/></svg>`
            timeDOM.tod.textContent = 'Good Morning'
            background.classList.remove('night'); 
            background.classList.add('day'); 
            moreInfo.lowerBackground.classList.remove('lower-night'); 
            moreInfo.lowerBackground.classList.add('lower-day'); 
            moreInfo.lowerTextColor.forEach(el=> {
                el.classList.remove('lower-display-night'); 
                el.classList.add('lower-display-day')
            })
            
            break;
        case ampm > 11 && ampm < 18 :
            timeDOM.todImage.innerHTML = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M11.78 19.417c.594 0 1.083.449 1.146 1.026l.006.125v1.842a1.152 1.152 0 01-2.296.125l-.007-.125v-1.842c0-.636.516-1.151 1.152-1.151zM6.382 17.18a1.15 1.15 0 01.09 1.527l-.09.1-1.302 1.303a1.152 1.152 0 01-1.718-1.528l.09-.1 1.302-1.302a1.15 1.15 0 011.628 0zm12.427 0l1.303 1.303a1.15 1.15 0 11-1.628 1.627L17.18 18.81a1.15 1.15 0 111.628-1.628zM11.781 5.879a5.908 5.908 0 015.901 5.902 5.908 5.908 0 01-5.901 5.902 5.908 5.908 0 01-5.902-5.902 5.908 5.908 0 015.902-5.902zm10.63 4.75a1.151 1.151 0 110 2.303h-1.843a1.151 1.151 0 110-2.303h1.842zm-19.418 0a1.151 1.151 0 01.126 2.296l-.125.007H1.15a1.151 1.151 0 01-.125-2.296l.125-.007h1.842zm1.985-7.268l.1.09 1.303 1.302a1.151 1.151 0 01-1.528 1.718l-.1-.09L3.45 5.08A1.15 1.15 0 014.978 3.36zm15.133.09c.45.449.45 1.178 0 1.628L18.808 6.38a1.151 1.151 0 11-1.628-1.628l1.303-1.303c.449-.449 1.178-.449 1.628 0zM11.781 0c.636 0 1.151.515 1.151 1.151v1.843a1.152 1.152 0 01-2.303 0V1.15C10.63.515 11.145 0 11.781 0z" fill="#FFF" fill-rule="nonzero"/></svg>`
            timeDOM.tod.textContent = 'Good Afternoon'
            background.classList.remove('night'); 
            background.classList.add('day'); 
            moreInfo.lowerBackground.classList.remove('lower-night'); 
            moreInfo.lowerBackground.classList.add('lower-day');
            moreInfo.lowerTextColor.forEach(el=> {
                el.classList.remove('lower-display-night'); 
                el.classList.add('lower-display-day')
            }) 
            break;
        case ampm < 7 || ampm > 17:
            timeDOM.todImage.innerHTML = `<svg width="23" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M22.157 17.366a.802.802 0 00-.891-.248 8.463 8.463 0 01-2.866.482c-4.853 0-8.8-3.949-8.8-8.8a8.773 8.773 0 013.856-7.274.801.801 0 00-.334-1.454A7.766 7.766 0 0012 0C5.382 0 0 5.382 0 12s5.382 12 12 12c4.2 0 8.02-2.134 10.218-5.709a.805.805 0 00-.061-.925z" fill="#FFF" fill-rule="nonzero"/></svg>`
            timeDOM.tod.textContent = 'Good Evening'
            background.classList.remove('day'); 
            background.classList.add('night'); 
            moreInfo.lowerBackground.classList.remove('lower-day'); 
            moreInfo.lowerBackground.classList.add('lower-night');
            moreInfo.lowerTextColor.forEach(el=> {
                el.classList.remove('lower-display-day'); 
                el.classList.add('lower-display-night')
            }) 
            break;  
    }
    
    timeDOM.time.textContent = time; 
    timeDOM.timezone.textContent = timezone; 
}

async function dateMath () {
    const year = new Date().getFullYear(); 
    const month = new Date().getMonth(); 
    const day = new Date().getDay(); 

    const today = {year, month, day}
    const jan1 = {year, month: 1, day: 1}
    

    const response = await fetch(`/dateMath`, {
        method: 'POST', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([today, jan1])
    }); 

    const data = await response.json(); 
    moreInfo.dayOfYear.textContent = data.days; 
    moreInfo.weekNumber.textContent = data.weekNumber; 
    moreInfo.dayOfWeek.textContent = data.day; 

}

function moveUpDown(e) {
    if(e) {
        moreBtn.main.classList.add('move');
        moreBtn.lower.classList.add('move');
        moreBtn.arrow.classList.add('rotate');
        setTimeout(() => {
        moreBtn.label.textContent = 'less';    
        }, 700); 
    } 
    if(!(e)) {
        moreBtn.main.classList.remove('move');
        moreBtn.lower.classList.remove('move');
        
        moreBtn.arrow.classList.remove('rotate');
        setTimeout(() => {
            moreBtn.label.textContent = 'more';
        }, 700);
    }
}


function init() {
    getQuote(); 
    getTime('24'); 
    getLocation(); 
    dateMath(); 
}


init(); 


