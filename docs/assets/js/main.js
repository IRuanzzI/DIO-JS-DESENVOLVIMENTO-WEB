const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 150;
const limit = 50;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}
function filtrar() {
    var input, filter, ol, li, name, number, types;

    // Pegando os elementos em HTML
    input = document.getElementById('buscador');
    ol = document.getElementById('pokemonList');

    // Filtro
    filter = input.value.toUpperCase();

    // Pegar todas as LI´s da lista
    li = ol.getElementsByTagName('li');

    // Percorrer todos os Li´s
    for (let i = 0; i < li.length; i++) {
        // Pegar a tag com a classe 'name', 'number' e 'types' do elemento percorrido
        name = li[i].querySelector('.name');
        number = li[i].querySelector('.number');
        types = li[i].querySelectorAll('.type');

        // Verificar se os elementos name, number e types existem
        if (name && number && types.length > 0) {
            // Pegar os textos dentro das tags
            let nameValue = name.textContent || name.innerText;
            let numberValue = number.textContent || number.innerText;
            let typesValue = Array.from(types).map(type => type.textContent || type.innerText).join(' ');

            // Verificar se o que o usuário digitou coincide com o nome, número ou tipo
            if (nameValue.toUpperCase().indexOf(filter) > -1 ||
                numberValue.toUpperCase().indexOf(filter) > -1 ||
                typesValue.toUpperCase().indexOf(filter) > -1) {
                // Valor coincide, mostrar o item
                li[i].style.display = '';
            } else {
                // Valor não coincide, esconder o item
                li[i].style.display = 'none';
            }
        } else {
            // Se algum dos elementos não existir, esconder o item
            li[i].style.display = 'none';
        }
    }
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{

        loadPokemonItens(offset, limit);
    }    
})