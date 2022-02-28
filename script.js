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
    //Clearing previous search
    const cardParent = document.getElementById('card-parent');
    const detailParent = document.getElementById('detail-parent');
    cardParent.innerHTML = '';
    detailParent.innerHTML = '';
    searchField.value = '';
    //Making the url dynamic
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => updateBySearch(data))
});
//Updating product by search result
const updateBySearch = data => {
    if (data.status) {
        toDoData(data);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Nothing found!'
          })
    }
}
//Showing details by clicking Explore button
const explore = slugData => {
    const url = `https://openapi.programming-hero.com/api/phone/${slugData}`
    fetch(url)
        .then(res => res.json())
        .then(data => exploreInner(data))
    const exploreInner = data => {
        console.log(data.data)
        const detailParent = document.getElementById('detail-parent');
        detailParent.innerHTML = `
    <div class="card mb-3 p-4">
    <div class="row g-0">
      <div class="col-md-4 d-flex align-items-center">
        <img src="${data.data.image}" class="image-full mb-3 mb-md-0" rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${data.data.name}</h5>
          <p class="card-text mb-0">Brand: ${data.data.brand}</p>
          ${
            (data => data.data.releaseDate ? `<p class="card-text"><small class="text-muted">${data.data.releaseDate}</small></p>` : `<p class="card-text"><small class="text-muted">Releasedate not found</small></p>`) (data)
          }
          
          <hr>
          <p class="card-text mb-0"><strong>Main Features:</strong></p>
          <hr class="w-25 mt-0 mb-1">
          ${
            (data => data.data.mainFeatures.storage ? `<p class="card-text mb-0"><small class="text-muted"><strong>Storage:</strong> ${data.data.mainFeatures.storage}</small></p>` : `<p class="card-text"><small class="text-muted"> Not found</small></p>`) (data)
          }
          ${
            (data => data.data.mainFeatures.memory ? `<p class="card-text mb-0"><small class="text-muted"><strong>Memory:</strong> ${data.data.mainFeatures.memory}</small></p>` : `<p class="card-text"><small class="text-muted"> Not found</small></p>`) (data)
          }
          ${
            (data => data.data.mainFeatures.displaySize ? `<p class="card-text mb-0"><small class="text-muted"><strong>Display:</strong> ${data.data.mainFeatures.displaySize}</small></p>` : `<p class="card-text"><small class="text-muted"> Not found</small></p>`) (data)
          }
          ${
            (data => data.data.mainFeatures.chipSet ? `<p class="card-text mb-0"><small class="text-muted"><strong>Chipset:</strong> ${data.data.mainFeatures.chipSet}</small></p>` : `<p class="card-text"><small class="text-muted">Chipset: Not found</small></p>`) (data)
          }
          ${
            (data => data.data.mainFeatures.sensors ? `<p class="card-text mb-0"><small class="text-muted"><strong>Sensors:</strong> &nbsp;${data.data.mainFeatures.sensors}&nbsp;</small></p>` : `<p class="card-text"><small class="text-muted">Sensors: Not found</small></p>`) (data)
          }
          <hr>
          <p class="card-text mb-0"><strong>Other Features:</strong></p>
          <hr class="w-25 mt-0 mb-1">
          ${
            (data => data.data.others?.Bluetooth ? `<p class="card-text mb-0"><small class="text-muted"><strong>Bluetooth:</strong> &nbsp;${data.data.others.Bluetooth}</small></p>` : `<p class="card-text"><small class="text-muted">Bluetooth: Not Supported</small></p>`) (data)
          }
          ${
            (data => data.data.others?.NFC ? `<p class="card-text mb-0"><small class="text-muted"><strong>NFC:</strong> &nbsp;${data.data.others.NFC}</small></p>` : `<p class="card-text"><small class="text-muted">NFC: Not Supported</small></p>`) (data)
          }
          ${
            (data => data.data.others?.Radio ? `<p class="card-text mb-0"><small class="text-muted"><strong>Radio:</strong> &nbsp;${data.data.others.Radio}</small></p>` : `<p class="card-text"><small class="text-muted">Radio: Not Supported</small></p>`) (data)
          }
          ${
            (data => data.data.others?.USB ? `<p class="card-text mb-0"><small class="text-muted"><strong>USB:</strong> &nbsp;${data.data.others.USB}</small></p>` : `<p class="card-text"><small class="text-muted">USB: No</small></p>`) (data)
          }
          ${
            (data => data.data.others?.WLAN ? `<p class="card-text mb-0"><small class="text-muted"><strong>WALN:</strong> &nbsp;${data.data.others.WLAN}</small></p>` : `<p class="card-text"><small class="text-muted">WLAN: Not found</small></p>`) (data)
          }

        </div>
      </div>
    </div>
  </div>
    `
    }
}