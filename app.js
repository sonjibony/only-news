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
categoryName.innerText=category.category_name;
categoryField.appendChild(categoryName);
});
}

loadCategories();