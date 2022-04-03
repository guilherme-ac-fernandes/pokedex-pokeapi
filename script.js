// Constantes
const pokedex = document.querySelector('#pokedex');
const nameButton = document.querySelector('#name-button');
const idButton = document.querySelector('#id-button');
const homeButton = document.querySelector('#home');
const selectType = document.querySelector('#type');
const alertSection = document.querySelector('#alert');
const selectUl = document.querySelector('#types-selected');
const pokedexFirstGen = ['Bulbasaur','Ivysaur','Venusaur','Charmander','Charmeleon','Charizard','Squirtle','Wartortle','Blastoise','Caterpie','Metapod','Butterfree','Weedle','Kakuna','Beedrill','Pidgey','Pidgeotto','Pidgeot','Rattata','Raticate','Spearow','Fearow','Ekans','Arbok','Pikachu','Raichu','Sandshrew','Sandslash','Nidoran-f','Nidorina','Nidoqueen','nidoran-m','Nidorino','Nidoking','Clefairy','Clefable','Vulpix','Ninetales','Jigglypuff','Wigglytuff','Zubat','Golbat','Oddish','Gloom','Vileplume','Paras','Parasect','Venonat','Venomoth','Diglett','Dugtrio','Meowth','Persian','Psyduck','Golduck','Mankey','Primeape','Growlithe','Arcanine','Poliwag','Poliwhirl','Poliwrath','Abra','Kadabra','Alakazam','Machop','Machoke','Machamp','Bellsprout','Weepinbell','Victreebel','Tentacool','Tentacruel','Geodude','Graveler','Golem','Ponyta','Rapidash','Slowpoke','Slowbro','Magnemite','Magneton','Farfetchd','Doduo','Dodrio','Seel','Dewgong','Grimer','Muk','Shellder','Cloyster','Gastly','Haunter','Gengar','Onix','Drowzee','Hypno','Krabby','Kingler','Voltorb','Electrode','Exeggcute','Exeggutor','Cubone','Marowak','Hitmonlee','Hitmonchan','Lickitung','Koffing','Weezing','Rhyhorn','Rhydon','Chansey','Tangela','Kangaskhan','Horsea','Seadra','Goldeen','Seaking','Staryu','Starmie','Scyther','Jynx','Electabuzz','Magmar','Pinsir','Tauros','Magikarp','Gyarados','Lapras','Ditto','Eevee','Vaporeon','Jolteon','Flareon','Porygon','Omanyte','Omastar','Kabuto','Kabutops','Aerodactyl','Snorlax','Articuno','Zapdos','Moltres','Dratini','Dragonair','Dragonite','Mewtwo','Mew', 'Mr-mime'];

// Função que busca as informaçõe na API
const fetchPokemon = (pokemon) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) =>  response.json())
    .then((data) => {
      return {
        name: data.name,
        image: data.sprites.front_default,
        id: data.id,
        type: data.types.map((element) => element.type.name),
      };
    })
    .catch((error) => error);
};

// Função para padronização de string (Começa com letra maiúscula)
const stringChange = (name) => {
  return `${name[0].toUpperCase()}${name.slice(1)}`;
}

// Função que cria elemento contendo os tipos do pokemon
const typePokemon = (type) => {
  const ulFather = document.createElement('ul');
  ulFather.className = 'types';
  type.forEach((element) => {
    const div = document.createElement('li');
    div.innerText = stringChange(element);
    div.classList.add('type-item');
    div.classList.add(`${element}`);
    ulFather.appendChild(div)
  });
  return ulFather;
};

// Função que criar display de cada pokemon
const createDisplay = ({ name, image, id, type }) => {
  const section = document.createElement('section');
  section.className = 'pokemon';
  const nameChange = stringChange(name);
  // Criação dos elementos
  const idSpan = document.createElement('span');
  const imageElement = document.createElement('img');
  const idName = document.createElement('p');
  // Adição das informações
  idSpan.className = 'hidden';
  idSpan.innerText = id;
  imageElement.src = image;
  idName.innerText = nameChange;
  // Adiciona tipo do pokemon
  const typesLocation = typePokemon(type);
  // Adiciona no elemento pai
  section.appendChild(idSpan);
  section.appendChild(imageElement);
  section.appendChild(idName);
  section.appendChild(typesLocation);
  // Retorna o elemento
  return section;
};

const createDisplayAfterButton = ({ name, image, id, type }) => {
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
  // Adiciona tipo do pokemon
  const ulFather = document.createElement('ul');
  ulFather.className = 'types';
  ulFather.innerHTML = type;
  // Adiciona no elemento pai
  section.appendChild(idSpan);
  section.appendChild(imageElement);
  section.appendChild(idName);
  section.appendChild(ulFather);
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
};

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

// Função que busca todas as informaões presente na página
const getAllInfoFromPage = () => {
  const [...allNames] = document.querySelectorAll('.pokemon p');
  const [...allId] = document.querySelectorAll('.pokemon span');
  const [...allImage] = document.querySelectorAll('.pokemon img');
  const [...allType] = document.querySelectorAll('.pokemon ul');
  const array = allNames.map((item, index) => {
    return {
      name: item.innerText,
      image: allImage[index].src,
      id: allId[index].innerText,
      type: allType[index].innerHTML,
    }
  });
  return array;
};

// Função que ordena por nome
const nameSort = (event) => {
  event.preventDefault();
  const array = getAllInfoFromPage();
  pokedex.innerHTML = '';
  const arraySortByName = array.sort(sortFunction);
  arraySortByName.forEach((element) => {
    const pokemon = createDisplayAfterButton(element)
    pokedex.appendChild(pokemon);
  });
};

// Função que ordena por id
const idSort = (event) => {
  event.preventDefault();
  const array = getAllInfoFromPage();
  pokedex.innerHTML = '';
  const arraySortById = array.sort((a, b) => a.id - b.id);
  arraySortById.forEach((element) => {
    const pokemon = createDisplayAfterButton(element)
    pokedex.appendChild(pokemon);
  });
};

// Função para retornar pokemon com ordem aleatória
const inicialStatus = () => {
  alertSection.innerHTML = '';
  pokedex.innerHTML = '';
  pokedexFirstGen.forEach(async (pokemon) => {
    const pokemonLower = pokemon.toLowerCase();
    const pokemonInfo = await fetchPokemon(pokemonLower);
    const sectionPokemon = createDisplay(pokemonInfo)
    pokedex.appendChild(sectionPokemon);
  });
  selectUl.innerHTML = '';
};

// Função que retorna o valor do select 
const typePokemonValue = () => {
  return selectType.options[selectType.selectedIndex].value;
};

// Função que cria os tipos selecionar abaixo do select
const createSelectItem = (typePokemon) => {
  if (selectUl.childNodes.length < 2) {
    const type = document.createElement('li');
    type.innerText = stringChange(typePokemon);
    type.classList.add('type-ul');
    type.classList.add(`${typePokemon}`);
    selectUl.appendChild(type);
  };
};

// Função para mostrar mensagem de alerta se não houver pokemon dos tipos selecionados
const alertMessage = (local) => {
  if (local.length === 0) {
    alertSection.innerHTML = '';
    const paragraph = document.createElement('p');
    paragraph.innerText = 'Não consta Pokemon nos tipos selecionados!';
    alertSection.appendChild(paragraph);
  };
};

// Função que filtra os pokemon por tipo
const filterTypes = async (event) => {
  event.preventDefault();
  const typePokemon = typePokemonValue();
  const array = getAllInfoFromPage();
  pokedex.innerHTML = '';
  const arraySortFilter = array.filter((element) => element.type.includes(typePokemon));
  arraySortFilter.forEach((element) => {
    const pokemon = createDisplayAfterButton(element)
    pokedex.appendChild(pokemon);
  });
  selectType.value = '';
  createSelectItem(typePokemon);
  alertMessage(arraySortFilter);
};

window.onload = async () => {
  loadingPage();
  // Botões e funcionalidades dinâmicas
  nameButton.addEventListener('click', nameSort);
  idButton.addEventListener('click', idSort);
  homeButton.addEventListener('click', inicialStatus);
  selectType.addEventListener('change', filterTypes);
  selectUl.addEventListener('click', inicialStatus);
};
