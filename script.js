//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  createSelect()
  makePageForEpisodes(allEpisodes);

}

//LEVEL 100- Get Episodes from getAllEpisodes Function

function makePageForEpisodes(episodeList) {
         
  const rootElem = document.getElementById("root");
  rootElem.classList.add('container');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row-main');
  const rowMain = document.getElementsByClassName('row-main');
  if(rowMain.length > 0){
    rowMain[0].remove();

  }

  for (const episode of episodeList) {

  const columnDiv = getTvSeries(episode);

  rowDiv.appendChild(columnDiv);
 }

rootElem.appendChild(rowDiv);

}//makePageForEpisodes closing

function getTvSeries(episode){
      //start loop
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
  //end Loop
  return columnDiv;
}


window.onload = setup;

//Level 200-Search and Display Episodes

const searchInput = document.querySelector('.searchInput');
searchInput.addEventListener('input', makeSearchEpisodes);

function makeSearchEpisodes(){
 
  const allEpisodes = getAllEpisodes();
  const searchInput = document.querySelector('.searchInput');
  const searchValue = searchInput.value.toUpperCase();

  const filteredEpisodes = allEpisodes.filter(episode => {
    const upperName = episode.name.toUpperCase();
    const upperSummary = episode.summary.toUpperCase();
    
    if(upperName.includes(searchValue)||upperSummary.includes(searchValue)){
    return episode

    }

  })//filter close 
  console.log(filteredEpisodes);
  const displayResults = document.querySelector('.displayResults');

  if(searchValue !== null){
    displayResults.innerText = `Displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes`
  }

  else{
    displayResults.innerText = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`

  }
 
  makePageForEpisodes(filteredEpisodes)


}//function close



//Level 300-Select Episode


// const optionBtn = document.querySelector('.optionButton')

function createSelect(){
  //create content of select
  const selectBtn = document.querySelector('.selectButton');
  const allEpisodes = getAllEpisodes();

  //Option Main
  const optionEpisode = document.createElement('option');
  optionEpisode.value = '-1';
  optionEpisode.innerHTML = "Select an Episode"
  selectBtn.appendChild(optionEpisode);
  //Other Options
for (let i = 0; i < allEpisodes.length; i++) {
  const episode = allEpisodes[i];
  const option = document.createElement('option')
    option.value = `${i}`;  // show.id

    if( episode.number > 9){ 
      option.innerText = `${episode.name} - S0${episode.season}E${episode.number}`;
    }
    else { 
      option.innerText = `${episode.name} - S0${episode.season}E0${episode.number}`;
    }

    selectBtn.appendChild(option);
  }

  selectBtn.addEventListener('change', selectFunc);
}

function selectFunc(e){
  const index = parseInt(e.target.value);
//  console.log(index);
  const allEpisodes = getAllEpisodes();

  if(index === -1){
    console.log(allEpisodes[index]);
    makePageForEpisodes(allEpisodes)
  }else{
    console.log(allEpisodes[index]);
    makePageForEpisodes([allEpisodes[index]])
  }




  //event value
}

  

//LEVEL 300
// Complete all requirements from level 200
// Add a select input which allows you to jump quickly to an episode:
// The select input should list all episodes in the format: "S01E01 - Winter is Coming"
// When the user makes a selection, they should be taken directly to that episode in the list
// Bonus: if you prefer, when the select is used, ONLY show the selected episode. If you do this,
//  be sure to provide a way for the user to see all episodes again.

