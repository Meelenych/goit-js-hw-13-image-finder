import Notiflix from "notiflix";
// import debounce from "lodash/debounce";
var debounce = require('debounce');
var throttle = require('lodash.throttle');
// console.log(throttle );
// console.log(debounce);
//Input and buttons
const input = document.getElementById('search-form')
// const input = document.getElementById('search-button')
console.log(input);
const loadMore = document.querySelector('.load-more-button')
// console.log(loadMore);
const gallery = document.querySelector('.gallery')
// console.log('gallery:', gallery);

//Autorization
const API_KEY = '23474268-70d851d8204f5902d9e83a665';
//URL and query params
let pageNumber = 1;
let perPage = 12;
let imgType = 'photo'
let imageOrientation = 'horizontal'
let searchQuery = '';
const baseUrl = `https://pixabay.com/api/`;

//SEARCH
input.addEventListener('input', debounce ((e) => {
    searchQuery = e.target.value;
    console.log('search query from input:', e.target.value);

    const params = `?key=${API_KEY}&q=${searchQuery}&orientation=${imageOrientation}&page=${pageNumber}&per_page=${perPage}&image_type=${imgType}`
    const url = baseUrl + params;
   //Image fetcher
    const images = function () {
    
        fetch(url)
    
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    Notiflix.Notify.failure('No results');
                    throw new Error('No results')
                }
            })
            .then((data) => {
                if (data.hits.length === 0) {
                    Notiflix.Notify.failure('Nothing found');
                    throw new Error('Nothing found')
                }
                else if (data.hits.length !== 0) {
                    loadMore.classList.remove('invisible')
                }
                return data.hits
                
            })
            .then(array => {
                console.log('search result:', array);
                Notiflix.Notify.success('Success! 12 results found!')
                let items = array.map((item) => {
                    const { webformatURL, largeImageURL, likes, views, comments, downloads } = item
                    return `
            <li>
            <div class="photo-card">
            <img src="${webformatURL}" loading="lazy" alt="" data-src = "${largeImageURL}"/>
            
            <div class="stats">
            <p class="stats-item">
            <i class="material-icons">thumb_up</i>
            ${likes}
            </p>
            <p class="stats-item">
            <i class="material-icons">visibility</i>
            ${views}
            </p>
            <p class="stats-item">
            <i class="material-icons">comment</i>
            ${comments}
            </p>
            <p class="stats-item">
            <i class="material-icons">cloud_download</i>
            ${downloads}
            </p>
            </div>
            </div>
            </li>
            `
                }).join('')
                gallery.insertAdjacentHTML('beforeend', items)               
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => input.reset())
    }
    console.log(url);
    images()

    
    function clearQuery() {
        gallery.innerHTML = '';
        e.target.value = ''
    }
        clearQuery()
}, 1000))


//LOAD MORE 
let pageNumb = 2;
loadMore.addEventListener('click', (e) => {
    console.log("load more:", e);
    console.log('pageNumb:', pageNumb);
    const params = `?key=${API_KEY}&q=${searchQuery}&orientation=${imageOrientation}&page=${pageNumb}&per_page=${perPage}&image_type=${imgType}`
    const url = baseUrl + params;
 
    pageNumb += 1;
    // searchQuery = e.target.value
        fetch(url)
    
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error('No results')
                }
            })
            .then((data) => {
                if (data.hits.length === 0) {
                    throw new Error('Nothing found')
                }
                else if (data.hits.length !== 0) {
                    loadMore.classList.remove('invisible')
                }
                return data.hits
                
            })
            .then(array => {
                console.log('load more search result:',array);  
                let items = array.map((item) => {
                    const { webformatURL, largeImageURL, likes, views, comments, downloads } = item
                    return `
            <li>
            <div class="photo-card">
            <img src="${webformatURL}" loading="lazy" alt="" data-src = "${largeImageURL}"/>
            
            <div class="stats">
            <p class="stats-item">
            <i class="material-icons">thumb_up</i>
            ${likes}
            </p>
            <p class="stats-item">
            <i class="material-icons">visibility</i>
            ${views}
            </p>
            <p class="stats-item">
            <i class="material-icons">comment</i>
            ${comments}
            </p>
            <p class="stats-item">
            <i class="material-icons">cloud_download</i>
            ${downloads}
            </p>
            </div>
            </div>
            </li>
            `
                }).join('')
                gallery.insertAdjacentHTML('beforeend', items)               
            })
    console.log('pageNumb:', pageNumb);

    loadMore.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });

})



