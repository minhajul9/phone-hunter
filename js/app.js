// function  for fetching data from api
const loadPhones = async(searchText) =>{

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

// loadphone loads the data from api but displayPhones show the elements on the webpage
const displayPhones = phones =>{
    const phoneContainer = document.getElementById('phone-container');

    // before adding new element we need to clear previous elements
    phoneContainer.innerHTML ='';

    // display only 20 items 
    phones = phones.slice(0,21)

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
                </div>
            </div>
        `;

        phoneContainer.appendChild(phoneDiv); 
         // after adding all the element we have to append to the parent otherwise it wouldn't be shown
    });
}

// search function
document.getElementById('search-btn').addEventListener('click', function(){
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
})

// loadPhones()