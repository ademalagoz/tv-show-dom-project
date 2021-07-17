//You can edit ALL of the code here
// const allEpisodes = getAllEpisodes();

//Level 350 get data from the Api instead of getAllEpisodes
let url = "https://api.tvmaze.com/shows/82/episodes";
function getFetchData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      makePageForEpisodes(data);
      selectMenu(data);
    })
    .catch((err) => console.log(err));
}
// window.onload = setup;
getFetchData(url);

// function setup() {
//   makePageForEpisodes(allEpisodes);
//   // searchEpisodes(allEpisodes);
//   selectMenu(allEpisodes);
// }

//LEVEL 100- Get Episodes from getAllEpisodes Function

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.classList.add("container");

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  const rowMain = document.getElementsByClassName("row");

  if (rowMain.length > 0) {
    rowMain[0].remove();
  }

  for (const episode of episodeList) {
    const columnDiv = oneEpisode(episode);
    rowDiv.appendChild(columnDiv);
  }

  rootElem.appendChild(rowDiv);

  function oneEpisode(episode) {
    const columnDiv = document.createElement("div");
    columnDiv.classList.add("col-md-4");

    const title = document.createElement("h4");

    if (episode.number > 9) {
      title.innerText = `${episode.name} - S0${episode.season}E${episode.number}`;
    } else {
      title.innerText = `${episode.name} - S0${episode.season}E0${episode.number}`;
    }

    const imgElem = document.createElement("img");
    imgElem.src = episode.image.medium;

    const summaryText = document.createElement("p");
    summaryText.innerHTML = episode.summary;

    columnDiv.append(title, imgElem, summaryText);

    return columnDiv;
  }

  //Level 200-Search Term

  const countEpisodes = document.querySelector(".displayResults");
  countEpisodes.innerText = `Display ${episodeList.length} of ${episodeList.length} episodes`;

  const searchInput = document.querySelector(".searchInput");
  searchInput.addEventListener("input", searchEpisodes);

  function searchEpisodes() {
    let value = searchInput.value.toLowerCase();
    const allColumns = document.querySelectorAll(".col-md-4");
    let count = 0;
    countEpisodes.innerText = "";

    allColumns.forEach((column) => {
      const columnValue = column.textContent.toLowerCase();
      if (columnValue.includes(value)) {
        column.style.display = "";
        count++;
        countEpisodes.innerText = `Display ${count} of ${allColumns.length} episodes`;
      } else {
        column.style.display = "none";
        countEpisodes.innerText = `Display ${count} of ${allColumns.length} episodes`;
      }
    });
  }
} //makePageForEpisodes closing

//Level 300-Select/Option Menu

function selectMenu(wholeEpisodes) {
  const selectBtn = document.querySelector(".selectButton");

  const optionEpisode = document.createElement("option");
  optionEpisode.value = "-1";
  optionEpisode.innerHTML = "Select an Episode";

  selectBtn.appendChild(optionEpisode);

  for (let i = 0; i < wholeEpisodes.length; i++) {
    const episode = wholeEpisodes[i];
    const option = document.createElement("option");
    option.value = `${i}`;

    if (episode.number > 9) {
      option.innerText = `${episode.name} - S0${episode.season}E${episode.number}`;
    } else {
      option.innerText = `${episode.name} - S0${episode.season}E0${episode.number}`;
    }

    selectBtn.appendChild(option);
  }

  selectBtn.addEventListener("change", searchValue);

  function searchValue(e) {
    const index = parseInt(e.target.value);
    index === -1
      ? makePageForEpisodes(wholeEpisodes)
      : makePageForEpisodes([wholeEpisodes[index]]);
  }
}
