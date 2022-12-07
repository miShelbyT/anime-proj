const URL = 'https://anime-server-films.onrender.com'
const title = document.querySelector("#header h3");
const ul = document.getElementById("list");
const animeContainer = document.getElementById("anime");
const instructions = document.querySelector("#tooltip-text")
let currentFilm, movieList = [];

title.textContent = "Anime Store";
instructions.textContent = "\u{1F499} Welcome to the anime store. To use, click on a \u{1F3AC} item from the list or simply click the roulette button! \u{1F499}"

const init = () => {
  fetch(`${URL}/films`)
    .then((resp) => resp.json())
    .then((data) => {
      movieList = data
      data.forEach((film, i) => {setFilmLi(film, i)})
    })
    .catch(err => console.log(err))
};

init();

const setFilmLi = (film, i) => {
  const li = document.createElement("li");
  li.textContent = `\u{1F3AC} #${i + 1}`;
  li.addEventListener("click", () => {
    removeAnimeContent()
    renderFilmInfo(li, film)
    renderForm()
  });
  ul.append(li);
};

document.getElementById("roulette-btn").addEventListener("click", addRandomFilm)

function addRandomFilm() {
  const movieNum = Math.ceil(Math.random() * 16)
  const li = document.querySelector(`#list :nth-child(${movieNum})`)
  removeAnimeContent()
    renderFilmInfo(li, movieList[movieNum-1])
    renderForm()
}

function removeAnimeContent() {
  const placeholder = document.querySelector("#anime > h3")
  placeholder && placeholder.remove()
  Array.from(document.getElementById("name-dir").children).forEach(node => node.remove())
  Array.from(document.getElementById("photo-desc").children).forEach(node => node.remove())
  document.querySelector("form") && document.querySelector("form").remove()
}


function renderFilmInfo(element, film) {
  currentFilm = film
  element.textContent = film.title;
  const name = document.createElement("h2");
  const director = document.createElement("h3");
  const img = document.createElement("img");
  const small = document.createElement("small");
  const description = document.createElement("p");
  const nameDir = document.getElementById("name-dir");
  const photoDesc = document.getElementById("photo-desc");

  name.textContent = `Name: ${film.original_title}`;
  director.textContent = `Directed By: ${film.director}`;
  img.src = film.image;
  img.alt = film.title;
  small.textContent = `Released: ${film.release_date} * Running Time: ${film.running_time}`;

  description.textContent = film.description;
  document.getElementById("main").style.background = `url(${film.image})`

  nameDir.append(name, director);
  photoDesc.append(img, description);
  animeContainer.append(small);
}

function renderForm() {
  const form = document.createElement("form");
  const viewed = document.createElement("fieldset");
  viewed.innerHTML = `
<legend>Viewed This Movie?</legend>
<div>
  <input type="radio" id="yes" name="seen" value="yes" checked>
  <label for="yes">Yes</label>
</div>

<div>
  <input type="radio" id="no" name="seen" value="no">
  <label for="no">No</label>   
</div>

<div>
  <label for="comments">Comments:</label>   
  <input type="text" id="comments" name="comments">
</div>
<div>
  <button id="save-movie">Save To Favorites</button>
</div>
`;

  function getRadioValue() {
    let elements = document.getElementsByName("seen");
    for (const item of elements) {
      if (item.checked) return item.value === "yes";
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    saveFilm({})
    console.log(getRadioValue(), e.target.comments.value);
  });

  form.append(viewed);
  animeContainer.append(form);
}

async function saveFilm(film) {
  const resp = await fetch(`${URL}/films`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(film)
  })
  const result = await resp.json()
  console.log(result)
}