//Fetching Data from server
const fetchData = () => {
    fetch('https://openapi.programming-hero.com/api/phones?')
        .then(res => res.json())
        .then(data => toDoData(data))
}
fetchData();

const toDoData = data => {
    //Making an array of all the data
    const arrayOfData = data.data.map(e => {
        return e;
    })
    //Getting the first 20 elements of the array
    const zeroToTwenty = arrayOfData.slice(0, 20);
    // console.log(zeroToTwenty)

    //Showing 20 phones as default
    const cardParent = document.getElementById('card-parent');
    zeroToTwenty.forEach(e => {
        // console.log(e.slug)
        const singleCard = document.createElement('div');
        singleCard.classList.add('col-12', 'col-md-4', 'pt-3')
        singleCard.innerHTML = `
            <div class="card text-center">
                <img src="${e.image}" class="card-img-top w-50 mx-auto pt-4" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${e.phone_name}</h5>
                    <p class="card-text">Brand: ${e.brand}</p>
                    <a href="#" onclick = "explore('${e.slug}')" id="explore-btn" class="btn btn-primary">Explore</a>
                </div>
            </div>
        `
        cardParent.appendChild(singleCard)
    })
}
//Getting search input text

//Making the search button clickable
const button = document.getElementById('search-btn');
button.addEventListener('click', () => {
    const searchField = document.getElementById('input');
    const searchText = searchField.value;
    const cardParent = document.getElementById('card-parent');
    cardParent.innerHTML = '';
    //Making the url dynamic
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => updateBySearch(data))
});
//Updating product by search result
const updateBySearch = data => {
    toDoData(data);
}
//Showing details by clicking Explore button
const explore = slugData => {
    
}