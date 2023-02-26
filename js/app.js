
// function  for fetching data from api
const loadPhones = async(searchText, limit) =>{

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, limit);
}

// loadphone loads the data from api but displayPhones show the elements on the webpage
const displayPhones = (phones, limit) =>{
    const phoneContainer = document.getElementById('phone-container');

    // before adding new element we need to clear previous elements
    phoneContainer.innerHTML ='';

    // display only 20 items 
    const showAll = document.getElementById('show-all');

    if(limit && phones.length > 21){
        showAll.classList.remove('d-none');
        phones = phones.slice(0,21);
    }
    else{
        showAll.classList.add('d-none');
    }
    // msg if no phone found
    const noPhone = document.getElementById('no-phone-found');
    if (phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }

    // this loop through all the elements of the phones array
    phones.forEach(phone => {

        // create the div where we add the items 
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col'); // col class for design purpose
        // console.log(phone);
        // adding the element using dynamic string or backtick
        phoneDiv.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top img-fluid p-4 w-75 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onClick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Details</button>
                </div>
            </div>
        `;

        phoneContainer.appendChild(phoneDiv); 
         // after adding all the element we have to append to the parent otherwise it wouldn't be shown
    });
    toggleSpinner(false)
}

const processSearch = (limit) =>{
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    loadPhones(searchText, limit);
}

// search function
document.getElementById('search-btn').addEventListener('click', function(){
    processSearch(21);
})

// search by enter clicked
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(21);
    }
})

// function to show phone details
const loadPhoneDetails = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone.mainFeatures);
    document.getElementById('phoneDetailsModalLabel').innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>${phone.releaseDate ? phone.releaseDate : 'No Data'}</p>
        <h3>Features: </h3>
        <p>Storage: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'Not Specified'}</p>
        <p>Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'Not Specified'}</p>
    `


}

// show all
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})


const toggleSpinner = isLoading =>{
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }

}



loadPhones('apple', 21)