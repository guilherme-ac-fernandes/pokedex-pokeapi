// Constantes
const pokedex = document.querySelector('#pokedex');
const nameButton = document.querySelector('#name-button');
const idButton = document.querySelector('#id-button');
const title = document.querySelector('#inicial');
const pokedexFirstGen = ['Bulbasaur','Ivysaur','Venusaur','Charmander','Charmeleon','Charizard','Squirtle','Wartortle','Blastoise','Caterpie','Metapod','Butterfree','Weedle','Kakuna','Beedrill','Pidgey','Pidgeotto','Pidgeot','Rattata','Raticate','Spearow','Fearow','Ekans','Arbok','Pikachu','Raichu','Sandshrew','Sandslash','Nidoran-f','Nidorina','Nidoqueen','nidoran-m','Nidorino','Nidoking','Clefairy','Clefable','Vulpix','Ninetales','Jigglypuff','Wigglytuff','Zubat','Golbat','Oddish','Gloom','Vileplume','Paras','Parasect','Venonat','Venomoth','Diglett','Dugtrio','Meowth','Persian','Psyduck','Golduck','Mankey','Primeape','Growlithe','Arcanine','Poliwag','Poliwhirl','Poliwrath','Abra','Kadabra','Alakazam','Machop','Machoke','Machamp','Bellsprout','Weepinbell','Victreebel','Tentacool','Tentacruel','Geodude','Graveler','Golem','Ponyta','Rapidash','Slowpoke','Slowbro','Magnemite','Magneton','Farfetchd','Doduo','Dodrio','Seel','Dewgong','Grimer','Muk','Shellder','Cloyster','Gastly','Haunter','Gengar','Onix','Drowzee','Hypno','Krabby','Kingler','Voltorb','Electrode','Exeggcute','Exeggutor','Cubone','Marowak','Hitmonlee','Hitmonchan','Lickitung','Koffing','Weezing','Rhyhorn','Rhydon','Chansey','Tangela','Kangaskhan','Horsea','Seadra','Goldeen','Seaking','Staryu','Starmie','Scyther','Jynx','Electabuzz','Magmar','Pinsir','Tauros','Magikarp','Gyarados','Lapras','Ditto','Eevee','Vaporeon','Jolteon','Flareon','Porygon','Omanyte','Omastar','Kabuto','Kabutops','Aerodactyl','Snorlax','Articuno','Zapdos','Moltres','Dratini','Dragonair','Dragonite','Mewtwo','Mew', 'Mr-mime'];

// Função que busca as informaçõe na API
const fetchPokemon = (pokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  const pokemonInfo = fetch(url)
    .then((response) =>  response.json())
    .then((data) => {
      return {
        name: data.name,
        image: data.sprites.front_default,
        id: data.id,
      }
    })
    .catch((error) => error);
  return pokemonInfo;
};

// Função que criar display de cada pokemon
const createDisplay = ({ name, image, id }) => {
  const section = document.createElement('section');
  section.className = 'pokemon';
  const nameChange = `${name[0].toUpperCase()}${name.slice(1)}`;
  // Criação dos elementos
  const idSpan = document.createElement('span');
  const imageElement = document.createElement('img');
  const idName = document.createElement('p');
  // Adição das informações
  idSpan.className = 'hidden';
  idSpan.innerText = id;
  imageElement.src = image;
  idName.innerText = nameChange;
  // Adiciona no elemento pai
  section.appendChild(idSpan);
  section.appendChild(imageElement);
  section.appendChild(idName);
  // Retorna o elemento
  return section;
};

// Função que adiciona os pokemons a página HTML
const loadingPage = () => {
  pokedexFirstGen.forEach(async (pokemon) => {
    const pokemonLower = pokemon.toLowerCase();
    const pokemonInfo = await fetchPokemon(pokemonLower);
    const sectionPokemon = createDisplay(pokemonInfo);
    pokedex.appendChild(sectionPokemon);
  });
}

// Proveniente da documentação
// (link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
// Com simplificação do código
const sortFunction = (a, b) => {
  const nameA = a.name.toUpperCase(); 
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};

// Função que ordena por nome
const nameSort = (event) => {
  event.preventDefault();
  const [...allNames] = document.querySelectorAll('.pokemon p');
  const [...allId] = document.querySelectorAll('.pokemon span');
  const [...allImage] = document.querySelectorAll('.pokemon img');
  const array = allNames.map((item, index) => {
    return {
      name: item.innerText,
      image: allImage[index].src,
      id: allId[index].innerText,
    }
  });
  pokedex.innerHTML = '';
  const arraySortByName = array.sort(sortFunction);
  arraySortByName.forEach((element) => {
    const pokemon = createDisplay(element)
    pokedex.appendChild(pokemon);
  });
};

// Função que ordena por id
const idSort = (event) => {
  event.preventDefault();
  const [...allNames] = document.querySelectorAll('.pokemon p');
  const [...allId] = document.querySelectorAll('.pokemon span');
  const [...allImage] = document.querySelectorAll('.pokemon img');
  const array = allNames.map((item, index) => {
    return {
      name: item.innerText,
      image: allImage[index].src,
      id: allId[index].innerText,
    }
  });
  pokedex.innerHTML = '';
  const arraySortById = array.sort((a, b) => a.id - b.id);
  arraySortById.forEach((element) => {
    const pokemon = createDisplay(element)
    pokedex.appendChild(pokemon);
  });
};

// Função para retornar pokemon com ordem aleatória
const inicialStatus = () => {
  pokedex.innerHTML = '';
  pokedexFirstGen.forEach(async (pokemon) => {
    const pokemonLower = pokemon.toLowerCase();
    const pokemonInfo = await fetchPokemon(pokemonLower);
    const sectionPokemon = createDisplay(pokemonInfo)
    pokedex.appendChild(sectionPokemon);
  });
};

window.onload = async () => {
  loadingPage();
  nameButton.addEventListener('click', nameSort);
  idButton.addEventListener('click', idSort);
  title.addEventListener('click', inicialStatus);
};
