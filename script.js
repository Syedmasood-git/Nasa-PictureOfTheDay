const api_key=`HICUxbZgmSmVmTUc1KWef4atPHwWXN9jpHTbTR28`;
const baseURL=`https://api.nasa.gov/planetary/apod?`
const imgContainer=document.querySelector(".img-container");
const mydate=document.getElementById("myDate");
const searchBtn=document.getElementById("search-btn");
const currImgCon=document.querySelector(".curr-img-container")
const heading=document.getElementById("heading");
const searchHistoryList = document.getElementById('search-history-list');

async function getCurrentImageOfTheDay(){
    const currentDate = new Date().toISOString().split("T")[0];
    const URL=`https://api.nasa.gov/planetary/apod?date=2023-09-29&api_key=${api_key}`
    try{
        const response=await fetch(URL);
        const data = await response.json();
        console.log(data);

        imgContainer.innerHTML=`
        <img src=${data.url}>
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>`
        
    }
    catch(error){
        console.log(error,"error");
    }
}
getCurrentImageOfTheDay()


async function getImageOfTheDay(selectedDate){
    const URL=`https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${api_key}`
    try{
        const response=await fetch(URL);
        const data=await response.json();

        heading.innerText=`Picture On ${selectedDate}`;
        imgContainer.innerHTML=`
        <img class="img" src=${data.url}>
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>`

        saveSearch(selectedDate);
        addSearchToHistory(selectedDate)
    }
    catch(error){
        console.log(error,"error");
    }
}


function saveSearch(selectedDate){
    let searches = JSON.parse(localStorage.getItem('searches')) || [];

    // Add the selected date to the searches array
    searches.push(selectedDate);

    // Limit the number of saved searches to, for example, the last 10
    const maxSearches = 10;
    if (searches.length > maxSearches) {
        searches = searches.slice(searches.length - maxSearches);
    }

    // Save the updated searches array back to local storage
    localStorage.setItem('searches', JSON.stringify(searches));
}

let lastClickedItem = null;

// Function to add search history to the UI
function addSearchToHistory(selectedDate) {
    // Check if the selected date is already in the search history
    const isAlreadyInHistory = [...searchHistoryList.children].some(item => item.textContent === selectedDate);

    if (!isAlreadyInHistory) {
        // Create a list item for the search history
        const listItem = document.createElement('li');
        listItem.textContent = selectedDate;

        listItem.addEventListener('click', async () => {
            await getImageOfTheDay(selectedDate);
            
            // Scroll the page to the top
            window.scrollTo(0, 0);

            
            lastClickedItem = listItem;
        });

        searchHistoryList.appendChild(listItem);
    }
}










searchBtn.addEventListener("click", async (e)=>{
    if(mydate.value==""){
        alert("Enter Date to be searched");
    }
    console.log(mydate.value);
    const selectedDate=mydate.value;
    await getImageOfTheDay(selectedDate)
    // let date = mydate.value;
    // let newdate = date.split("-").reverse().join("-");
})