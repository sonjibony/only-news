/*--------------------
category api fetching
--------------------*/
const loadCategories = () =>{
    const url = `  https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
    //error handling
    .catch(error => alert(error))
}
/*--------------------
  category displaying
--------------------*/
const displayCategories = categories =>{
    const categoryField = document.getElementById('category');
    //looping through array
 categories.forEach(category => {
    //creating and appending categories
const categoryName = document.createElement('p');

categoryName.innerHTML=`
<p ><button class="btn btn-light" onclick ="categoryDetail(${category.category_id})">${category.category_name}</button></p>
`;

categoryField.appendChild(categoryName);
});
}

const categoryDetail =(categoryId)=>{
    //loading spinner
    toggleSpinner(true);
 
const url = ` https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
fetch(url)
.then (res => res.json())
.then (data => showCategoryDetail(data.data))
//error handling
.catch(error => alert(error));

}

const showCategoryDetail= details=>{
    const cardContainer = document.getElementById('card-container');


    //no news message showed
     const noNews =document.getElementById('no-news');
    if(details.length===0){
        noNews.classList.remove('d-none');
    
    }
    else{
        noNews.classList.add('d-none')
    }
    cardContainer.innerHTML='';
    
   /*----------------------------------
    showing most viewed news for bonus
   ------------------------------------*/
    details.sort((a,b)=>{
    return b.total_view - a.total_view;
     })

   /*----------------------------------
    showing all news in one category
   ------------------------------------*/
details.forEach(detail=>{
 const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'mb-3', 'w-75', 'border-0', 'shadow-sm')
    cardDiv.innerHTML=`
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${detail.thumbnail_url}" class="img-fluid w-100 rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${detail.title?detail.title:'No data found'}</h5>
        <p  class="card-text   ">${detail.details.slice(0,300)}...</p>
        <div class="d-flex justify-content-between align-items-center ">
        <div class="d-flex gap-2 align-items-center flex-wrap">
        <img src="${detail.author.img?detail.author.img:'No data found'}" class="img-fluid  rounded-circle" style="width:50px" alt="...">
        <p class="card-text">${detail.author.name?detail.author.name:'No data found'}</p>

        </div>
        <p class="card-text  my-auto">Views- ${detail.total_view?detail.total_view:'No data found'}</p>
<button onclick="loadNewsDetail('${detail._id}')" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" > See Detail</button>
</div>
      </div>
    </div>
  </div>
    
    `;
    cardContainer.appendChild(cardDiv);
    })

//item quantity
const itemField =document.getElementById('item-field');
itemField.innerText= details.length

//stopping spinner
toggleSpinner(false);
    }

  /*------------------
  loading news details
  --------------------*/
const loadNewsDetail = newsId =>{
const url=`https://openapi.programming-hero.com/api/news/${newsId}`;
fetch (url)
.then (res => res.json())
.then (data => showNewsDetail(data.data))
//error handling
.catch(error => alert(error))
}

/*------------------------------
  showing news details in modal
 ---------- --------------------*/
const showNewsDetail= details =>{
    details.forEach(detail => {
    
const title = document.getElementById('exampleModalLabel');
title.innerText= detail.title;
const modalDetail = document.getElementById('modal-detail');
modalDetail.innerHTML=`
<img src="${detail.image_url}" class="img-fluid w-100 rounded-start" alt="...">

<p class="card-text">Author: ${detail.author.name?detail.author.name:'No data found'}</p>
<p class="card-text">Publish Date: ${detail.author.publish_date?detail.author.publish_date:'No data found'}</p>
<p class="card-text">Rating: ${detail.rating.number?detail.rating.number:'No data found'}</p>
<p class="card-text">Badge: ${detail.rating.badge?detail.rating.badge:'No data found'}</p>
<p class="card-text">Total Views: ${detail.total_view?detail.total_view:'No data found'}</p>
<p> ${detail.details}</p>
`;
});

 }

/*------------------
         spinner
  --------------------*/
  const toggleSpinner = isLoading =>{
    const spinnerSection = document.getElementById('spinner');
    if(isLoading === true){
        spinnerSection.classList.remove('d-none')
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}

/*--------------------
    calling functions
  --------------------*/
loadCategories();
//showing all news by default
categoryDetail(08);