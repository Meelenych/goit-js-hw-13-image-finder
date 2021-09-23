//Pixabay API поддерживает пагинацию, пусть в ответе приходит по 12 объектов, 
// установлено в параметре per_page.По умолчанию параметр page равен 1. 
// При каждом последующем запросе page увеличивается на 1,
// а при поиске по новому ключевому слову необходимо сбрасывать его значение в 1.

import debounce from "lodash/debounce";
// console.log(debounce);


const input = document.getElementById('search-form')
// console.log(input);
input.addEventListener('change',((e) => {
    console.log(e.target.value);
    // const { value } = e.target
    

    //Autorization
    const API_KEY = '23474268-70d851d8204f5902d9e83a665';
    
    //URL and query params
    let imageOrientation = 'horizontal'
    let searchQuery = e.target.value;
    let pageNumber = 1;
    let perPage = 12;
    let imgType = 'photo'


const baseUrl = `https://pixabay.com/api/`;
const params = `?key=${API_KEY}&q=${searchQuery}&orientation=${imageOrientation}&page=${pageNumber}&per_page=${perPage}&image_type=${imgType}`
const url = baseUrl + params;

//Input and buttons
const loadMore = document.querySelector('.load-more-button')
console.log(loadMore);
    
//Image fetcher

const gallery = document.querySelector('.gallery')
// console.log('gallery:', gallery);


    const images = function () {
    
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
                // console.log('data:', data);
                if (data.hits.length === 0) {
                    throw new Error('Nothing found')
                }
                else if (data.hits.length !== 0) {
                    loadMore.classList.remove('invisible')
                }
                return data.hits
                
            })
            .then(array => {
                console.log(array);
       
                let items = array.map((item) => {
                    const { webformatURL, largeImageURL, likes, views, comments, downloads } = item
                    return `
            <li>
            <div class="photo-card">
            <img src="${webformatURL}" alt="" data-src = "${largeImageURL}"/>
            
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
                // console.log(items);
                
            })
            .catch((e) => {
                alert(e);
                console.log(e);
            })
        
        // console.log(images); 
        //===============================================================
    

    }
  
    images()
    
    function clearQuery() {
        gallery.innerHTML = '';
        e.target.value = ''
    }
        


    loadMore.addEventListener('click', (e) => {
        console.log("load more:", e);
        console.log('pageNumber:', pageNumber);
        pageNumber += 1;
        return images(pageNumber)
    })


    clearQuery()
    
    loadMore.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}))




