const allShows = getAllShows();

function sortName() {
  return allShows.sort((firstShow, secondShow) =>
    firstShow.name > secondShow.name ? 1 : -1
  );
}
const sorting = sortName();

function setup() {
  showSelect(sorting);
  homePage(sorting);
}

function fetchEpisodes(showID) {
  fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      selectEpisodes(data);
      makePageForEpisodes(data);
    })
    .catch((err) => console.log(err));
}

window.onload = setup;

//LEVEL 100- Get episodes from getAllEpisodes Function
const displayResults = document.createElement("p");
displayResults.classList.add("results");

function makePageForEpisodes(episodeList) {
  const rootContainer = document.getElementById("root");
  rootContainer.classList.add("container");

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  const rowMain = document.getElementsByClassName("row");

  if (rowMain.length > 0) {
    rowMain[0].remove();
  }

  displayResults.innerText = `Display ${episodeList.length} of ${episodeList.length} episodes`;
  const navigation = document.querySelector(".navigation");
  navigation.appendChild(displayResults);

  for (const episode of episodeList) {
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
    rowDiv.appendChild(columnDiv);

    rootContainer.appendChild(rowDiv);
  }
} //makePageForEpisodes closing

//Level 200-Search Field

const searchInput = document.createElement("input");
searchInput.setAttribute("type", "Text");
searchInput.setAttribute("placeholder", "Search Term");
const navigation = document.querySelector(".navigation");
navigation.appendChild(searchInput);

searchInput.addEventListener("input", searchEpisodes);

function searchEpisodes() {
  let searchValue = searchInput.value.toLowerCase();
  const allColumns = document.querySelectorAll(".col-md-4");

  let count = 0;
  displayResults.innerText = "";

  allColumns.forEach((column) => {
    const columnValue = column.textContent.toLowerCase();

    if (columnValue.includes(searchValue)) {
      column.style.display = "";
      count++;
      displayResults.innerText = `Display ${count} of ${allColumns.length} episodes`;
    } else {
      column.style.display = "none";
      displayResults.innerText = `Display ${count} of ${allColumns.length} episodes`;
    }
  });

  const navigation = document.querySelector(".navigation");
  navigation.appendChild(displayResults);
} //Search Field Closing

//Level 300-Select Episode Menu

function selectEpisodes(wholeEpisodes) {
  const selectBtn = document.querySelector(".selectEpisodes");
  selectBtn.innerHTML = `<option value="">All Episodes</option>`;

  for (let i = 0; i < wholeEpisodes.length; i++) {
    let episode = wholeEpisodes[i];

    const optionElem = document.createElement("option");
    optionElem.value = i;

    if (episode.number > 9) {
      optionElem.innerText = `${episode.name} - S0${episode.season}E${episode.number}`;
    } else {
      optionElem.innerText = `${episode.name} - S0${episode.season}E0${episode.number}`;
    }

    selectBtn.appendChild(optionElem);
  }

  selectBtn.addEventListener("change", getOneEpisode);

  function getOneEpisode(e) {
    const index = parseInt(e.target.value);
    if (index) makePageForEpisodes([wholeEpisodes[index]]);
  }
} //Select Episode Closing

//Level 400-Show Select Menu

function showSelect(wholeShows) {
  const showBtn = document.querySelector(".selectShow");
  showBtn.innerHTML = `<option value="">All Shows</option>`;

  for (show of wholeShows) {
    const optionSelect = document.createElement("option");

    optionSelect.value = show.id;
    optionSelect.innerText = show.name;
    showBtn.appendChild(optionSelect);
  }

  showBtn.addEventListener("change", getOneShow);

  function getOneShow(e) {
    const index = parseInt(e.target.value);
    if (index) {
      fetchEpisodes(index);
    }
  }
} //Show Select Closing

//LEVEL 500- HomePage Function

function homePage(showList) {
  const rootContainer = document.getElementById("root");
  rootContainer.classList.add("container");

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  const rowMain = document.getElementsByClassName("row");

  if (rowMain.length > 0) {
    rowMain[0].remove();
  }

  displayResults.innerText = `Display ${showList.length} of ${showList.length} Shows`;
  const navigation = document.querySelector(".navigation");
  navigation.appendChild(displayResults);

  for (const show of showList) {
    const columnDiv = document.createElement("div");
    columnDiv.classList.add("col-md-4");
    rowDiv.appendChild(columnDiv);

    rootContainer.appendChild(rowDiv);
    const title = document.createElement("h4");
    title.innerText = `${show.name}`;

    const type = document.createElement("h6");
    type.innerText = `Genres: ${show.genres.join(", ")} \n Runtime: ${
      show.runtime
    } \n Rating: ${show.rating.average} `;

    const imgElem = document.createElement("img");
    imgElem.src = show.image.medium;
    const summaryText = document.createElement("p");
    summaryText.innerHTML = show.summary;

    columnDiv.append(title, type, imgElem, summaryText);
  }
} //homepage closing

// Back to homepage

const backBtn = document.querySelector(".btn");
backBtn.addEventListener("click", backHome);

function backHome() {
  document.location.reload();
}
