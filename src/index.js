 // List Beer Information and variable declaration   
 const beerName = document.getElementById('beer-name');
 const beerImage = document.getElementById('beer-image');
 const beerDescription = document.getElementById('beer-description');
 const beerReviewForm = document.getElementById('review-form');
 const beerReviewText = document.getElementById('review');

 function beerDisplay(beer) {

     // declare variables to enable editing of our beer descriptions
     const beerDescriptionForm = document.getElementById('description-form');
     const beerEditDescription = document.getElementById('description');
     //  beerEditedDescriptionForm.reset();

     // code to remove place-holder for customer reviews
     const beerReviewList = document.getElementById('review-list');
     while (beerReviewList.firstElementChild) {
         beerReviewList.removeChild(beerReviewList.lastElementChild)
     };



     // code to display beer Name, beer Image, beer description, edit the description and add reviews
     // add reviews to each specific beer

     beerName.textContent = beer.name,
         beerImage.src = beer.image_url,
         beerDescription.textContent = beer.description,
         beerEditDescription.value = beer.description

     // code to display beer reviews of each individual beer

     for (let review of beer.reviews) {
         let beerReview = document.createElement('li');
         beerReview.textContent = review;
         beerReviewList.appendChild(beerReview);
     }

     // code to update beer description
     beerDescriptionForm.addEventListener('submit', updateDescription);

     // function call to update description
     function updateDescription(event) {
         // e.preventDefault() prevents page from reloading
         event.preventDefault();
         beer.description = beerEditDescription.value;
         updateBeer(beer)
     };
     // this code will add reviews  
     beerReviewForm.addEventListener('submit', (event) => {
         event.preventDefault();

         // conditional that will not allow users to add empty reviews
         if (beerReviewText.value !== '') {

             beer.reviews.push(beerReviewText.value)
             updateBeer(beer)
         } else {
             alert('Please add Review!')
         }
     });
 };


 // function using Patch Method which updates beer changes(beer description and add beer reviews)
 function updateBeer(beer) {
     //use fetch to pick beer id to be updated
     fetch(`http://localhost:3000/beers/${beer.id}`, {
             method: 'PATCH',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(beer)
         })
         .then(response => response.json())
         .then(data => beerDisplay(data))

 };

 // extra practice could include A POST method to create Beer name, description, image Url and its reviews


 //using method GET to fetch beer data
 //using beer = null to show there exist a variable
 function fetchData(beer = null) {
     let baseURL = 'http://localhost:3000/beers/'
         //use class to  create a promise using the promise constructor
     return new Promise((resolve, ) => {
         let url = beer == null ? baseURL : `${baseURL + beer}`
         fetch(url)
             .then(response => response.json())
             .then(data => resolve(data))

     })
 };


 //function to display navigation on the left side
 function navDisplay(beers) {

     //populate the left side bar withe beer names
     const navBeerList = document.querySelector('#beer-list');
     while (navBeerList.firstElementChild) {
         //remove last child element will remove 
         // <li>Beer Name</li>
         //   <li>Another Beer Name</li>
         //   <li>And Another Beer Name</li>
         navBeerList.removeChild(navBeerList.lastElementChild)
     };

     beers.forEach(beer => {
         const navElement = document.createElement('li');
         navElement.textContent = beer.name;
         navElement.setAttribute('index', beer.id);
         navBeerList.append(navElement)

         // add event listener to beernames onCLick
         navElement.addEventListener('click', (event) => {
             //when clicked fetches beer dat using its id value
             fetchData(event.target.getAttribute('index'))
                 .then(beer => {
                     beerDisplay(beer);
                 });
         });
     });


 };

 function initializeFlataBeer() {
     //use asynchronous javascript
     //displays the navbar
     fetchData()
         .then(beers => navDisplay(beers))
         //then display the renderpage
     fetchData(1)
         .then(beers => beerDisplay(beers))

 };
 initializeFlataBeer()