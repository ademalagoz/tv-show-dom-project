//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  
  // makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
         
         //STRUCTURE
  //rootElem        --container
  //rowDiv          --row
  //columnDiv       --col-md-4
  //eachEpisode     --div(title,img,p)
  
  const rootElem = document.getElementById("root");
  rootElem.classList.add('container');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');
  
  for (const episode of episodeList) {

    const columnDiv = document.createElement('div');
    columnDiv.classList.add('col-md-4');
   
    const eachEpisode = document.createElement('div');
    eachEpisode.classList.add('episode');
  
    const title = document.createElement('h3');
    
    if( episode.number > 9){
      title.innerText = `${episode.name} - S0${episode.season}E${episode.number}`;
    }
    else {
      title.innerText = `${episode.name} - S0${episode.season}E0${episode.number}`;
    }
    
    const imgElem = document.createElement("img");
    imgElem.src = episode.image.medium;

    const summaryText = document.createElement('p');
    summaryText.innerHTML = episode.summary.replace('<p>', '').replace('</p>', '');
    
//Appends
  eachEpisode.append(title, imgElem, summaryText);
  columnDiv.appendChild(eachEpisode);
  rowDiv.appendChild(columnDiv);
  rootElem.appendChild(rowDiv);
    
 }

}//makePageForEpisodes closing

window.onload = setup;

//LEVEL 200
// Add a "live" search input:
// Only episodes whose summary OR name contains the search term should be displayed
// The search should be case-insensitive
// The display should update immediately after each keystroke changes the input.
// Display how many episodes match the current search
// If the search box is cleared, all episodes should be shown.
// If you have been fetching the episode data from the API, be careful not to cause many
// frequent requests with this search feature. The search should look through an in-memory
// copy of the episode list. Do not fetch the data again each time something is typed!


//SEARCH-LEVEL 200

const searchInput = document.querySelector('.searchInput');
searchInput.addEventListener('input', search);


function search(){

  const searchInput = document.querySelector('.searchInput');
  const searchInputValue = searchInput.value;

  const allEpisodes = getAllEpisodes();
  const filteredEpisodes = allEpisodes.filter(episode => {
    
      const nameUpperCase = episode.name.toUpperCase();
      const summaryUpperCase = episode.summary.toUpperCase();
      if(nameUpperCase.includes(searchInputValue)|| summaryUpperCase.includes(searchInputValue) ){
    return episode;

}
  }
 )

console.log(filteredEpisodes);
makePageForEpisodes(filteredEpisodes)
}



