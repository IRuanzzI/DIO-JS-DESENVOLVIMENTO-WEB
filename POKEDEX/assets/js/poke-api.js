const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
        const pokemon = new Pokemon()
        pokemon.number = pokeDetail.order
        pokemon.name = pokeDetail.name
        
        const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
        const [type] = types
        
        pokemon.types = types
        pokemon.type = type

        pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

        return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 6, limit = 10) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest)=> Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
}

/*Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/6'),
    fetch('https://pokeapi.co/api/v2/pokemon/7'),
    fetch('https://pokeapi.co/api/v2/pokemon/8'),
    fetch('https://pokeapi.co/api/v2/pokemon/9'),
    fetch('https://pokeapi.co/api/v2/pokemon/10'),
    fetch('https://pokeapi.co/api/v2/pokemon/11'),
    fetch('https://pokeapi.co/api/v2/pokemon/12'),
    fetch('https://pokeapi.co/api/v2/pokemon/13'),
    fetch('https://pokeapi.co/api/v2/pokemon/14'),
    fetch('https://pokeapi.co/api/v2/pokemon/15')
])*/