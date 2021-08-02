const pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
    const promises = [];
    for(let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json())); // returns a promise
    }

    Promise.all(promises).then(results => {
        const pokemon = results.map(data => ({
            name: data.name,
            id: data.id,
            image: data.sprites.front_default,
            type: data.types.map(type => type.type.name).join(", "),
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map(p => `
    <li class="card">
        <img class="card-image" src="${p.image}"/>
        <h2 class="card-title">${p.id}: ${p.name}</h2>
        <p class="card-subtitle">Type: ${p.type}</p>
    </li>
    `).join(''); // Converting map to string
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon();