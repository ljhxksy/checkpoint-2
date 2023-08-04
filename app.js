const baseURL = "https://pokeapi.co/api/v2/pokemon/";

const DEFAULT_VALUE = "__";

// populate the search bar
fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
.then(response => response.json())
.then(data => {
    data.results.forEach((pokemon) => {
        const option = document.createElement('option');
        option.text = pokemon.name;
        document.getElementById('pokemonSelect').add(option);
    });
})
.catch(error => console.error('Error fetching data:', error.message));


// poke-img
const pokeImage = document.querySelector('.poke-img');

// poke-info
const pokeName = document.querySelector('.name');
const type = document.querySelector('.type');
const height = document.querySelector('.height');
const weight = document.querySelector('.weight');
const bio = document.querySelector('.bio');

document.getElementById('pokemonSelect').addEventListener("change", (event) => {
    fetch(`${baseURL}${event.target.value.trim()}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        pokeImage.src = data.sprites.front_default;

        // truyen du lieu vao html
        pokeName.innerHTML = data.name || DEFAULT_VALUE;
        type.innerHTML = data.types[0].type.name || DEFAULT_VALUE;
        height.innerHTML = data.height/10 || DEFAULT_VALUE;
        weight.innerHTML = data.weight || DEFAULT_VALUE;
        bio.innerHTML = data.flavor_text_entries;
    })
    .catch(err => console.error(err));

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${event.target.value.trim()}`)
    .then(response => response.json())
    .then(data => {
        bio.innerHTML = data.flavor_text_entries[0].flavor_text;
    })
    .catch(err => console.error(err));
})




  