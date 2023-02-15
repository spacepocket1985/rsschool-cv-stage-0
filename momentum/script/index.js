let lang = 'en';
//translate vocabulary for greeting
const greetingNamePlaceholder = {
    'en': '[Enter name]',
    'ru': '[Введите имя]'
}

const nightGreeting = {
    'en': 'Good night',
    'ru': 'Спокойной ночи'
}
const morningGreeting = {
    'en': 'Good morning',
    'ru': 'Доброе утро'
}
const afternoonGreeting = {
    'en': 'Good afternoon',
    'ru': 'Добрый день'
}
const eveningGreeting = {
    'en': 'Good evening',
    'ru': 'Добрый вечер'
}

//translate vocabulary for weather
const weatherCityPlaceholder = {
    'en': 'Enter the city',
    'ru': 'Укажите город'
}
const windSpeedTitle = {
    'en': 'Wind speed:',
    'ru': 'Скорость ветра'
}

const humidityTitle = {
    'en': 'Humidity',
    'ru': 'Влажность'
}
const windSpeedDimension = {
    'en': 'm/s',
    'ru': 'м/c'
}

const weatherErrorEmptyValue = {
    'en': 'Error! Please enter the city. Nothing to geocode.',
    'ru': 'Ошибка! Пожалуйста, введите город. Нечего геокодировать.'
}

const weatherErrorBadValue = {
    'en': 'Error! The entered city was not found.',
    'ru': 'Ошибка! Введенный Вами город не найден.'
}

//translate vocabulary for audio
const volumeLevelTitl = {
    'en': 'volume level',
    'ru': 'уровень громкости'
}

//translate vocabulary for settings
const backgroundSourceTtile = {
    'en': 'Background source',
    'ru': 'Фоновое изображение'
}

const chooseTag = {
    'en': 'Input img tag for API:',
    'ru': 'Введите тег для API:'
}

const displayHideTitle = {
    'en': 'Display/hide blocks:',
    'ru': 'Показать/скрыть блок:'
}

const displayHideGreeting = {
    'en': 'Greeting',
    'ru': 'Приветствие'
}

const displayHideWeather = {
    'en': 'Weather',
    'ru': 'Погода'
}

const displayHideAudio = {
    'en': 'Audio',
    'ru': 'Плеер'
}

const displayHideTime = {
    'en': 'Time',
    'ru': 'Время'
}

const displayHideDate = {
    'en': 'Date',
    'ru': 'Дата'
}

const displayHideQuote = {
    'en': 'Quote',
    'ru': 'Цитата'
}

const displayHideLang = {
    'en': 'Lang',
    'ru': 'Язык'
}

const toDOinputPlaceHolder = {
    'en': 'Your toDO task is?.',
    'ru': 'Что нужно сделать?'
}

const toDOinputInvalidMsg = {
    'en': 'Fill in this field!',
    'ru': 'Заполните это поле!'
}


const yourTime = document.querySelector('.time');
const yourDate = document.querySelector('.date');
const dayHalf = document.querySelector('.greeting');
const greetingName = document.querySelector('.greeting__name');
const greetingBlock = document.querySelector('.greeting__block');
const langBlock = document.querySelector('.lang__block');


// for background images
let imageSource
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide__next');
const slidePrev = document.querySelector('.slide__prev');

// for weather API
const weatherBlock = document.querySelector('.weather__block');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherWindSpeed = document.querySelector('.wind');
const weatherHumidity = document.querySelector('.humidity');
const weatherCity = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');


// for weather quates
const quoteBlock = document.querySelector('.quote__block');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change__quote')

// for audio player. task 6.0
let isPlay = false;
let playNum = 0;
const audioBlock = document.querySelector('.audio__block');
const playListContainer = document.querySelector('.play__list');
const playPause = document.querySelector('.play');
const playPrev = document.querySelector('.play__prev');
const playNext = document.querySelector('.play__next');
const progressBar = document.querySelector('#progress-bar');
const currentTime = document.querySelector('.current__time');
const durationTime = document.querySelector('.duration__time');
const trackName = document.querySelector('.track_name');
const soundControl = document.querySelector('#sound-control');
const sound = document.querySelector('.sound');
const volumeLevelTitle = document.querySelector('.volume__level-title');


import playList from './playList.js';

window.onload = function () {
    weatherCity.value = 'Minsk'
    showTime();
    getWeather(lang);
    getQuotes(lang, randomNumForQuotes);
    addPlayList()

    const playListTracks = document.querySelectorAll('.list__play');
    playListTracks.forEach((track, index, tracks) => {
        track.addEventListener('click', () => {
            removePlayListTrack(playListTracks);
            tracks[index].classList.toggle('pause')
            if (playNum == index) {
                tracks[index].classList.toggle('pause')
                playAudio()
            }
            else {
                playNum = index;
                isPlay = false;
                playAudio()
            }
        })
    })

}

const removePlayListTrack = (playListTracks) => {
    playListTracks.forEach(track => {
        track.classList.remove('pause');
    })
}

// time and data

const showTime = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    yourTime.textContent = currentTime;

    showDate(date, lang);
    getTimeOfDay();
    // if (audio.currentTime == audio.duration) { playNexTrack() }
    setTimeout(showTime, 1000);
}

const showDate = (date, lang) => {

    const options = { month: 'long', weekday: 'long', day: 'numeric', timeZone: 'UTC' };
    const currentDate = date.toLocaleDateString(lang, options);
    yourDate.textContent = currentDate;

}

//User greeting 
greetingName.placeholder = greetingNamePlaceholder[lang]

const getTimeOfDay = () => {

    const date = new Date();
    const hours = date.getHours();
    if (hours >= 0 && hours < 6) { dayHalf.textContent = nightGreeting[lang]; return 'night' }
    if (hours >= 6 && hours < 12) { dayHalf.textContent = morningGreeting[lang]; return 'morning' }
    if (hours >= 12 && hours < 18) { dayHalf.textContent = afternoonGreeting[lang]; return 'afternoon' }
    if (hours >= 18 && hours <= 23) { dayHalf.textContent = eveningGreeting[lang]; return 'evening' }

}
const timeOfDay = getTimeOfDay();
// dayHalf.textContent = `Good ${timeOfDay}`;

const setLocalStorage = () => {
    localStorage.setItem('greetingName', greetingName.value);

    if (weatherError.textContent == '') {
        localStorage.setItem('weatherCity', weatherCity.value)

    }
    else { localStorage.removeItem('weatherCity'); }

}

window.addEventListener('beforeunload', setLocalStorage)

const getLocalStorage = () => {

    if (localStorage.getItem('tagImg')) {
        imageTag.value = localStorage.getItem('tagImg');
    }


    if (localStorage.getItem('unsplash')) {
        setBackgroundImgFromUnsplash();
    }

    if (localStorage.getItem('flick')) {
        setBackgroundImgFromFlick();
    }

    if (!localStorage.getItem('flick') && !localStorage.getItem('unsplash')) {
        { setBg(); }
    }


    if (localStorage.getItem('langRu')) {
        lang = 'ru';
        langRu.textContent = 'Ру';
        langEn.textContent = 'Анг';
        langRu.classList.add('lang__active');
        langEn.classList.remove('lang__active');
        setLanguage()
    }

    if (localStorage.getItem('langEn')) {
        lang = 'en';
        langRu.textContent = 'Ru';
        langEn.textContent = 'En';
        langEn.classList.add('lang__active');
        langRu.classList.remove('lang__active');
        setLanguage()
    }

    if (localStorage.getItem('greetingName')) {
        greetingName.value = localStorage.getItem('greetingName');
    }

    if (localStorage.getItem('weatherCity')) {
        weatherCity.value = localStorage.getItem('weatherCity');
    }

    if (localStorage.getItem('time__block')) {
        yourTime.classList.add('hide__on__load');
        yourTime.classList.add('hide__block');
        buttonTime.classList.add('button__dispaly-hide-0n')
    }
    if (localStorage.getItem('date__block')) {
        yourDate.classList.add('hide__on__load');
        yourDate.classList.add('hide__block');
        buttonDate.classList.add('button__dispaly-hide-0n')
    }
    if (localStorage.getItem('quote__block')) {
        quoteBlock.classList.add('hide__on__load');
        quoteBlock.classList.add('hide__block');
        buttonQuote.classList.add('button__dispaly-hide-0n')
    }

    if (localStorage.getItem('audio__block')) {
        audioBlock.classList.add('hide__on__load');
        audioBlock.classList.add('hide__block');
        buttonAudio.classList.add('button__dispaly-hide-0n')
    }

    if (localStorage.getItem('weather__block')) {
        weatherBlock.classList.add('hide__on__load');
        weatherBlock.classList.add('hide__block');
        buttonWeather.classList.add('button__dispaly-hide-0n')
    }

    if (localStorage.getItem('greeting__block')) {
        greetingBlock.classList.add('hide__on__load');
        greetingBlock.classList.add('hide__block');
        buttonGreeting.classList.add('button__dispaly-hide-0n')
    }

    if (localStorage.getItem('lang__block')) {
        langBlock.classList.add('hide__on__load');
        langBlock.classList.add('hide__block');
        buttonLang.classList.add('button__dispaly-hide-0n')
    }


    if (!localStorage.getItem('toDOListView')) {
        todoWrapper.classList.add('hide__on__load');
        todoWrapper.classList.add('hide__block');
    }

    if (localStorage.getItem('myToDoList')) {

        toDoList.innerHTML = localStorage.getItem("myToDoList");
        renderToDoList()
    }

}

window.addEventListener('load', getLocalStorage)

// background slider

const getRandomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let randomNum = getRandomNum(1, 20);


const setBg = () => {

    imageSource = 'git'
    imageTag.value = '';
    buttonGithub.classList.add('api__select');
    buttonFlick.classList.remove('api__select');
    buttonUnsplash.classList.remove('api__select');
    imageTag.disabled = true;

    const img = new Image();
    let bgUrl = '';
    let bgNum = (randomNum < 10) ? ((randomNum + '').padStart(2, '0')) : (randomNum);
    img.src = `https://spacepocket1985.github.io/stage1-tasks/images/${timeOfDay}/${bgNum}.jpg`
    bgUrl = `url(https://spacepocket1985.github.io/stage1-tasks/images/${timeOfDay}/${bgNum}.jpg)`
    img.onload = () => {
        body.style.backgroundImage = bgUrl;
    };
}

const getSlideNext = () => {
    if (imageSource == 'git') {
        randomNum = (randomNum == 20) ? (0o1) : (randomNum + 1);
        setBg();
        return randomNum
    }
    if (imageSource == 'unsplash') {
        setBackgroundImgFromUnsplash()
    }
    if (imageSource == 'flick') {
        setBackgroundImgFromFlick()
    }

}

const getSlidePrev = (imageSource) => {

    if (imageSource == 'git') {
        randomNum = (randomNum == 0o1) ? (20) : (randomNum - 1);
        setBg();
        return randomNum
    }
    if (imageSource == 'unsplash') {
        setBackgroundImgFromUnsplash()
    }
    if (imageSource == 'flick') {
        setBackgroundImgFromFlick()
    }

}

slideNext.addEventListener('click', () => {
    getSlideNext(imageSource);
});

slidePrev.addEventListener('click', () => {
    getSlidePrev(imageSource)
});

// weather API 

async function getWeather(lang) {
    try {

        weatherError.textContent = '';

        if (weatherCity.value == '') {
            console.log('lang = ' + lang)
            weatherCity.placeholder = weatherCityPlaceholder[lang];

            console.log(weatherCityPlaceholder[lang])
            weatherIcon.className = 'weather-icon owf';
            temperature.textContent = '';
            weatherDescription.textContent = '';
            weatherWindSpeed.textContent = '';
            weatherHumidity.textContent = '';
            weatherError.textContent = weatherErrorEmptyValue[lang];

            return
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value}&lang=${lang}&appid=e9a74e1bea94f061d1a7ab39183351b1&units=metric`;

        const res = await fetch(url);
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        weatherWindSpeed.textContent = `${windSpeedTitle[lang]} ${data.wind.speed.toFixed(0)} ${windSpeedDimension[lang]}`;
        weatherHumidity.textContent = `${humidityTitle[lang]}: ${data.main.humidity.toFixed(0)} %`;

    } catch (error) {
        weatherError.textContent = weatherErrorBadValue[lang];
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        weatherWindSpeed.textContent = '';
        weatherHumidity.textContent = '';
    }

}

weatherCity.addEventListener('change', () => {
    weatherCity.placeholder = weatherCityPlaceholder[lang];
    getWeather(lang)
});

let randomNumForQuotes = getRandomNum(0, 15);

async function getQuotes(lang, randomNumForQuotes) {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    quote.textContent = data[randomNumForQuotes][`text-${lang}`]
    author.textContent = data[randomNumForQuotes][`author-${lang}`]
    changeQuote.classList.add('add__quote-scale')
    return;
}

changeQuote.addEventListener('click', () => {
    randomNumForQuotes = getRandomNum(0, 15);
    getQuotes(lang, randomNumForQuotes)
});

// audio player task 6

const addPlayList = () => {
    playList.forEach(el => {
        const li = document.createElement('li');
        li.classList.add('play__item');
        li.textContent = el.title;
        const button = document.createElement('button');
        button.classList.add('player__icon');
        button.classList.add('play');
        button.classList.add('list__play');
        playListContainer.append(li);
        li.append(button);
    })

}


const audio = new Audio();

const playAudio = () => {

    const playListTracks = document.querySelectorAll('.list__play');
    removePlayListTrack(playListTracks);
    const playItems = document.querySelectorAll('.play__item');
    playItems.forEach(playItem => {
        playItem.classList.remove('item__active')
    })
    playItems[playNum].classList.add('item__active')
    playListTracks[playNum].classList.add('pause')

    audio.src = playList[playNum].src;


    if (!isPlay) {
        audio.play()
        isPlay = true;
        trackName.textContent = playList[playNum].title;
        playPause.classList.add('pause')
    }
    else {
        audio.pause()
        playPause.classList.toggle('pause')
        playListTracks[playNum].classList.toggle('pause')
        isPlay = false;
    }
}

const playNexTrack = () => {
    playNum = (playNum == 3) ? (0o0) : (playNum + 1);
    isPlay = false;
    playAudio();
    return playNum
}

const playPrevTrack = () => {

    playNum = (playNum == 0) ? (0o3) : (playNum - 1);
    isPlay = false;
    playAudio();
    return playNum
}


audio.addEventListener("loadeddata", () => {
    durationTime.textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = .5;
},
    false
);

audio.addEventListener('ended', () => {
    playNexTrack();
});


setInterval(() => {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
    currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);


const getTimeCodeFromNum = (num) => {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}


progressBar.addEventListener('change', () => {
    audio.currentTime = progressBar.value;
});

soundControl.addEventListener('input', () => {
    audio.volume = soundControl.value;
});


sound.addEventListener('click', () => {
    audio.muted = !audio.muted;
    if (audio.muted) {
        sound.classList.remove("sound__on");
        sound.classList.add("sound__off");
        soundControl.disabled = true;
    } else {
        sound.classList.add("sound__on");
        sound.classList.remove("sound__off");
        soundControl.disabled = false;
    }
})


playPause.addEventListener('click', playAudio);
playNext.addEventListener('click', playNexTrack)
playPrev.addEventListener('click', playPrevTrack)

//translate

const langRu = document.querySelector('.lang__ru');

const setLanguage = () => {

    greetingName.placeholder = greetingNamePlaceholder[lang];
    volumeLevelTitle.textContent = volumeLevelTitl[lang];
    titleBackgroundSource.textContent = backgroundSourceTtile[lang];
    tagsApiTitle.textContent = chooseTag[lang];
    titleDisplayHide.textContent = displayHideTitle[lang];
    titleGreeting.textContent = displayHideGreeting[lang];
    titleWeather.textContent = displayHideWeather[lang];
    titleAudio.textContent = displayHideAudio[lang];
    titleDate.textContent = displayHideDate[lang];
    titleTime.textContent = displayHideTime[lang];
    toDoInputAddForm.placeholder = toDOinputPlaceHolder[lang];
    titleQuote.textContent = displayHideQuote[lang];
    titleLang.textContent = displayHideLang[lang];

    getQuotes(lang, randomNumForQuotes)
    getWeather(lang)

}

langRu.addEventListener('click', () => {
    langRu.classList.add('lang__active');
    langEn.classList.remove('lang__active');
    lang = 'ru'
    //toDoInputAddForm.setCustomValidity("Зполните это поле");

    setLanguage()

    if (langRu.classList.contains('lang__active')) {
        localStorage.setItem('langRu', true);
        langRu.textContent = 'РУ';
        langEn.textContent = 'Анг';
        localStorage.removeItem('langEn')
    }

    if (weatherCity.value == 'Minsk') { weatherCity.value = 'Минск' }

})

const langEn = document.querySelector('.lang__en');
langEn.addEventListener('click', () => {
    langEn.classList.add('lang__active');
    langRu.classList.remove('lang__active');
    lang = 'en'

    setLanguage()

    if (langEn.classList.contains('lang__active')) {
        localStorage.setItem('langEn', true);
        langRu.textContent = 'Ru';
        langEn.textContent = 'En';
        localStorage.removeItem('langRu')
    }

    if (weatherCity.value == 'Минск') { weatherCity.value = 'Minsk' }

})

//background pic from api

const buttonGithub = document.querySelector('.button__github');
const buttonFlick = document.querySelector('.button__flick')
const buttonUnsplash = document.querySelector('.button__unsplash')
const imageTag = document.querySelector('.img__tags');
imageTag.disabled = "disabled";


async function setBackgroundImgFromUnsplash() {
    let tag;
    imageSource = 'unsplash'
    buttonUnsplash.classList.add('api__select');
    buttonGithub.classList.remove('api__select');
    buttonFlick.classList.remove('api__select');
    imageTag.disabled = false;

    if (imageTag.value == '') {
        tag = timeOfDay; imageTag.value = timeOfDay
    }
    else tag = imageTag.value;

    console.log(tag)

    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=XeTjbPd9bYEi81mQ5Vs1WYgcSCBAKf2WU1IAGtEQzn4`;
    const res = await fetch(url);
    const data = await res.json();

    const img = new Image();
    img.src = data.urls.regular;
    img.onload = () => {
        body.style.backgroundImage = `url(${data.urls.regular})`;
    }


}

buttonUnsplash.addEventListener('click', () => {

    setBackgroundImgFromUnsplash()
    console.log(imageTag.value)
    localStorage.setItem('unsplash', 'true');
    localStorage.removeItem('github');
    localStorage.removeItem('flick');

})


async function setBackgroundImgFromFlick() {

    let tag;
    imageSource = 'flick'
    buttonFlick.classList.add('api__select');
    buttonGithub.classList.remove('api__select');
    buttonUnsplash.classList.remove('api__select');
    imageTag.disabled = false;

    if (imageTag.value == '') {
        tag = timeOfDay; imageTag.value = timeOfDay
    }
    else tag = imageTag.value;
    console.log(tag)

    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2fd408dda4b5a29aebcbc102999612f2&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();

    const img = new Image();
    let linkNumber = getRandomNum(1, 100);
    console.log(linkNumber)
    img.src = data.photos.photo[linkNumber].url_l;
    img.onload = () => {
        body.style.backgroundImage = `url(${data.photos.photo[linkNumber].url_l})`;
    }

}

buttonFlick.addEventListener('click', () => {
    setBackgroundImgFromFlick();
    localStorage.setItem('flick', true);
    localStorage.removeItem('github');
    localStorage.removeItem('unsplash');
})

buttonGithub.addEventListener('click', () => {
    setBg();
    localStorage.setItem('github', true);
    localStorage.setItem('tagImg', '');
    localStorage.removeItem('flick');
    localStorage.removeItem('unsplash');
})

imageTag.addEventListener('change', () => {
    console.log('imageSource  change = ' + imageSource);
    (imageSource == 'flick') ? (setBackgroundImgFromFlick()) : (setBackgroundImgFromUnsplash())
    localStorage.setItem('tagImg', imageTag.value);
})


//settings 
const buttonSettings = document.querySelector('.button__settings');
const mainSettingsWrapper = document.querySelector('.main__settings_wrapper');
const buttonsDispalyHide = document.querySelectorAll('.button__dispaly-hide');
const buttonTime = document.querySelector('.button__time');
const buttonDate = document.querySelector('.button__date');
const buttonAudio = document.querySelector('.button__audio');
const buttonQuote = document.querySelector('.button__quote');
const buttonWeather = document.querySelector('.button__weather');
const buttonGreeting = document.querySelector('.button__greeting');
const buttonLang = document.querySelector('.button__lang');
const titleBackgroundSource = document.querySelector('.title__background-source');
const tagsApiTitle = document.querySelector('.title__tag');
const titleDisplayHide = document.querySelector('.title__dispaly-hide');
const titleGreeting = document.querySelector('.title__greeting');
const titleWeather = document.querySelector('.title__weather');
const titleAudio = document.querySelector('.title__audio');
const titleTime = document.querySelector('.title__time');
const titleDate = document.querySelector('.title__date');
const titleQuote = document.querySelector('.title__quote');
const titleLang = document.querySelector('.title__lang');

buttonSettings.addEventListener('click', () => {
    mainSettingsWrapper.classList.toggle('display__block');
    //slidePrev.classList.toggle('hide__block')
})

buttonsDispalyHide.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('button__dispaly-hide-0n');
        let hideBlock = button.dataset.filter;
        document.querySelector(`.${hideBlock}`).classList.toggle('hide__block');
        document.querySelector(`.${hideBlock}`).classList.remove('hide__on__load');
        if (document.querySelector(`.${hideBlock}`).classList.contains('hide__block')) {
            localStorage.setItem(`${hideBlock}`, true);
        }
        else { localStorage.removeItem(`${hideBlock}`) }

    })

})

//toDo
const todoWrapper = document.querySelector('.todo__wrapper')
const buttonToDo = document.querySelector('.button__todo');
const toDoList = document.querySelector('.todo__list');
const toDoAddForm = document.querySelector('.todo__add-form');
const toDoInputAddForm = document.querySelector('.todo__add-form-input');
const toDoButtonAdd = document.querySelector('.todo__add-form-button');


toDoInputAddForm.addEventListener('invalid', () => {
    toDoInputAddForm.setCustomValidity(toDOinputInvalidMsg[lang])
})

buttonToDo.addEventListener('click', () => {
    todoWrapper.classList.toggle('hide__block');
    if (!todoWrapper.classList.contains('hide__block')) {
        localStorage.setItem(`toDOListView`, true);
    }
    else { localStorage.removeItem(`toDOListView`) }

})

//New task list item
const createNewToDoElement = (taskString) => {

    let listItem = document.createElement("li");
    listItem.classList.add('todo__list-item');
    let label = document.createElement("label");
    label.classList.add('todo__list-label');
    let checkBox = document.createElement("input");
    checkBox.classList.add('todo__list-input');
    checkBox.type = "checkbox";
    let span = document.createElement("span");
    span.classList.add('todo__span');
    span.innerText = taskString;
    let editInput = document.createElement("input");
    editInput.classList.add('todo__input-edit');
    editInput.type = "text";
    let div = document.createElement('div');
    div.classList.add('todo__list-item-buttons');
    let editButton = document.createElement('button');
    editButton.classList.add('todo__button-edit');
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('todo__button-delete');

    listItem.append(label);
    label.append(checkBox);
    label.append(span);
    label.append(editInput);
    label.append(div);
    div.append(editButton);
    div.append(deleteButton);

    return listItem;
}


const addToDoTask = () => {

    const listItem = createNewToDoElement(toDoInputAddForm.value);
    toDoList.append(listItem);
    editToDoList(listItem);
    toDoInputAddForm.value = '';
    localStorage.setItem("myToDoList", (toDoList.innerHTML));
}


toDoAddForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addToDoTask();

});


let toDoItems = toDoList.children;

const editToDoList = (item) => {
    let checkbox = item.querySelector('.todo__list-input');
    let buttonDeleteItem = item.querySelector('.todo__button-delete');
    let buttonEditItem = item.querySelector('.todo__button-edit');

    checkbox.addEventListener('click', () => {

    })

    checkbox.addEventListener('change', () => {
        item.classList.toggle('todo-done')
        localStorage.setItem("myToDoList", (toDoList.innerHTML));
    });
    buttonDeleteItem.addEventListener('click', () => {
        item.remove();
        localStorage.setItem("myToDoList", (toDoList.innerHTML));
    })

    if (item.classList.contains('todo-done')) {
        checkbox.checked = true;
    }


    buttonEditItem.addEventListener('click', () => {

        item.classList.toggle('edit__mode');
        let editInput = item.querySelector('.todo__input-edit');
        let span = item.querySelector('.todo__span');
        checkbox.classList.add('todo__hide');

        const saveEditToDO = () => {
            span.classList.remove('todo__hide');
            span.innerText = editInput.value;
            editInput.classList.remove('todo__show');
            buttonEditItem.classList.remove('todo__save')
            item.classList.remove('edit__mode');
            checkbox.classList.remove('todo__hide');
            localStorage.setItem("myToDoList", (toDoList.innerHTML));
        }


        if (item.classList.contains('edit__mode')) {
            buttonEditItem.classList.add('todo__save')
            editInput.value = span.innerText;
            span.classList.add('todo__hide');
            editInput.classList.add('todo__show');
        }

        else {

            saveEditToDO()
        }

        editInput.addEventListener('keyup', event => {
            if (event.code === 'Enter') {
                saveEditToDO();
            }
        })

    })

    localStorage.setItem("myToDoList", (toDoList.innerHTML));

};

const renderToDoList = () => {
    for (let i = 0; i < toDoItems.length; i++) {
        editToDoList(toDoItems[i])
    }
}


























