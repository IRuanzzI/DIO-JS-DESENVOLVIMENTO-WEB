
function convertPokemonToLi(pokemon) {
    return `
            <li class="pokemon" ${pokemon.type}>
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                
                    <div class="detail">

                        <ol class="types">
                            ${pokemon.types.map((type)=> `<li class="type">${type}</li>`).join('')}
                        </ol>

                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>

            </li>
        `
}

const pokemonList = document.getElementById('list');



pokeApi.getPokemons().then((pokemons = []) => {                      //Essa requisição mapeia os arrays da url e as transforma em strings. Após isso, adicona na lista em html. Essa é a versão mais simplificada e mais rápida.
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
})

/*pokeApi.getPokemons().then((pokemons = []) => {                  //Aqui seria o 'passo-a-passo de como funciona
    const listItems = []

   const newList = pokemons.map((pokemon) =>  convertPokemonToLi(pokemon))

    const newHtml = newList.join('')

    pokemonList.innerHTML += newHtml

    /*for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        listItems.push(convertPokemonToLi(pokemon))
    }

    console.log(listItems)

    pokemonList.innerHTML += convertPokemonToLi(pokemon)
})*/