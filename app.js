/*--------------------
category api fetching
--------------------*/
const loadCategories = () =>{
    const url = `  https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
    //error handling
    .catch(error => console.log(error))
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

//categoryName.innerText=category.category_name;
categoryName.innerHTML=`
<p onclick ="categoryDetail(${category.category_id})">${category.category_name}</p>
`;
categoryField.appendChild(categoryName);
});
}


const categoryDetail =(categoryId)=>{
const url = ` https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
fetch(url)
.then (res => res.json())
.then (data => showCategoryDetail(data.data))
.catch(error => console.log(error));
//     console.log(url);
}

const showCategoryDetail= details=>{
    const cardContainer = document.getElementById('card-container');
     const noNews =document.getElementById('no-news');
    if(details.length===0){
        noNews.classList.remove('d-none');
        //console.log(noNews);
    }
    else{
        noNews.classList.add('d-none')
    }
    cardContainer.innerHTML='';
    
details.forEach(detail=>{
    
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'mb-3', 'w-75')
    cardDiv.innerHTML=`
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${detail.thumbnail_url}" class="img-fluid w-100 rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${detail.title}</h5>
        <p class="card-text">${detail.details}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
    
    `;
    cardContainer.appendChild(cardDiv);

    //console.log(detail.length)

})
    }
    


loadCategories();
categoryDetail(01);