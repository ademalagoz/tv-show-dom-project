//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
         
         //STRUCTURE
  //rootElem        --container
  //rowDiv          --row
  //divColumn       --col-4
  //eachEpisode     --div(title,img,p)
  
  const rootElem = document.getElementById("root");
  rootElem.classList.add('container');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');
  
  for (const episode of episodeList) {

    const columnDiv = document.createElement('div');
    columnDiv.classList.add('col-4');
   
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


}


window.onload = setup;
