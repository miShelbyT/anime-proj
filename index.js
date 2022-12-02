// welcome to our fun review session where we will be creating an anime project

// we will be using a new external API / base URL: https://anime-server-films.onrender.com


const header = document.querySelector("header h3")
// const header = document.getElementById("header")
// const header = document.querySelectorAll("h3")[2]
header.innerText = "Anime!!!!!!"

const url = "https://ghibliapi.herokuapp.com"

const renderOneFilm = (movie, i) => {
  const li = document.createElement("li")
  li.textContent = `\u{1F3AC} #${i + 1}`;
  const list = document.querySelector("#list")
  list.append(li)
// fetchOneFilm function invocation => arguments real thing
  li.addEventListener("click", () => fetchOneFilm(movie, li))
}

//function declaration => parameters (placeholders)
function fetchOneFilm(film, li) {
  fetch(film)
  .then(r => r.json())
  .then(data => {
    li.innerText = data.title
    renderMovieInfo(data)
  })
}

function renderMovieInfo(selectedMovie) {

}



function fetchAnime() {
  fetch(`${url}/species?name=Human`)
  .then((r) => r.json())
  .then(data => data[0].films.forEach((film, i) => renderOneFilm(film, i)))
}


fetchAnime()