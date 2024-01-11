const accessKey = 'MWeBNqApNUvbWcLg_yJ0KhGCo36IAUdM8DPvGDsgj2M';

const formEl = document.querySelector("form")
const inputEl = document.getElementById("Search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-btn")


let inputData = ""
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const ulr = `https://api.unsplash.com/search/photos?page=${page}&query=
    ${inputData}&client_id=${accessKey}`;

    const response = await fetch(ulr);
    const data = await response.json();

    const results = data.results

    if(page === 1){
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imagWrapper = document.createElement('div');
        imagWrapper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imagWrapper.appendChild(image);
        imagWrapper.appendChild(imageLink);
        searchResults.appendChild(imagWrapper);
    });

    page++
    if(page > 1) {
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1;
    searchImages()
});

showMore.addEventListener("click", () => {
    searchImages()
});