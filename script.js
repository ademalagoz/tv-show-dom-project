
const allShows = getOneShow();

function getFetchData() {
  for (show of allShows) {
    fetch(`https://api.tvmaze.com/shows/${show.id}/episodes`)
      // console.log( fetch(url));
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        selectEpisodes(data);
        makePageForEpisodes(data); //undefined
        console.log(makePageForEpisodes(data));
      })
      .catch((err) => console.log(err));
  }

  showSelect(allShows);
}

// window.onload = setup;
getFetchData();

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
  const countEpisodes = document.querySelector(".displayResults");
  countEpisodes.innerText = `Display ${episodeList.length} of ${episodeList.length} episodes`;

  for (const episode of episodeList) {
    const columnDiv = oneEpisode(episode);
    rowDiv.appendChild(columnDiv);

    rootElem.appendChild(rowDiv);

    //creating one episode for each column-4
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
  }
} //makePageForEpisodes closing

//Level 200-Search Term

const searchInput = document.querySelector(".searchInput");
const displayEpisodes = document.querySelector(".displayResults");
searchInput.addEventListener("input", searchEpisodes);

function searchEpisodes() {
  let searchValue = searchInput.value.toLowerCase();
  const allColumns = document.querySelectorAll(".col-md-4");

  let count = 0;
  displayEpisodes.innerText = "";

  allColumns.forEach((column) => {
    const columnValue = column.textContent.toLowerCase();

    if (columnValue.includes(searchValue)) {
      column.style.display = "";
      count++;
      displayEpisodes.innerText = `Display ${count} of ${allColumns.length} episodes`;
    } else {
      column.style.display = "none";
      displayEpisodes.innerText = `Display ${count} of ${allColumns.length} episodes`;
    }
  });
}

//Level 300-Select/Option Menu

function selectEpisodes(wholeEpisodes) {
  const selectBtn = document.querySelector(".selectEpisodes");

  for (let i = 1; i < wholeEpisodes.length; i++) {
    let episode = wholeEpisodes[i];

    const optionValue = document.createElement("option");
    // optionValue.innerHTML = "Select Episode";

    optionValue.value = i;

    if (episode.number > 9) {
      optionValue.innerText = `${episode.name} - S0${episode.season}E${episode.number}`;
    } else {
      optionValue.innerText = `${episode.name} - S0${episode.season}E0${episode.number}`;
    }

    selectBtn.appendChild(optionValue);
  }

  selectBtn.addEventListener("change", getEpisodes);

  function getEpisodes(e) {
    const index = parseInt(e.target.value);
    index === -1
      ? makePageForEpisodes(wholeEpisodes)
      : makePageForEpisodes([wholeEpisodes[index]]);
  }
}

//Level 400-Display Show Menu

function showSelect(getShows) {
  const showBtn = document.querySelector(".selectShow");

  for (let i = 0; i < getShows.length; i++) {
    const show = getShows[i];
    const optionSelect = document.createElement("option");
    optionSelect.value = i;

    optionSelect.innerText = `${show.name}`;

    showBtn.appendChild(optionSelect);
  }

  showBtn.addEventListener("change", searchShowValue);

  function searchShowValue(e) {
    const index = parseInt(e.target.value);
    index === -1
      ? makePageForEpisodes(getShows)
      : makePageForEpisodes([getShows[index]]);
  }
}
