const pokedexFirstGen = ['Bulbasaur','Ivysaur','Venusaur','Charmander','Charmeleon','Charizard','Squirtle','Wartortle','Blastoise','Caterpie','Metapod','Butterfree','Weedle','Kakuna','Beedrill','Pidgey','Pidgeotto','Pidgeot','Rattata','Raticate','Spearow','Fearow','Ekans','Arbok','Pikachu','Raichu','Sandshrew','Sandslash','Nidoran-f','Nidorina','Nidoqueen','nidoran-m','Nidorino','Nidoking','Clefairy','Clefable','Vulpix','Ninetales','Jigglypuff','Wigglytuff','Zubat','Golbat','Oddish','Gloom','Vileplume','Paras','Parasect','Venonat','Venomoth','Diglett','Dugtrio','Meowth','Persian','Psyduck','Golduck','Mankey','Primeape','Growlithe','Arcanine','Poliwag','Poliwhirl','Poliwrath','Abra','Kadabra','Alakazam','Machop','Machoke','Machamp','Bellsprout','Weepinbell','Victreebel','Tentacool','Tentacruel','Geodude','Graveler','Golem','Ponyta','Rapidash','Slowpoke','Slowbro','Magnemite','Magneton','Farfetchd','Doduo','Dodrio','Seel','Dewgong','Grimer','Muk','Shellder','Cloyster','Gastly','Haunter','Gengar','Onix','Drowzee','Hypno','Krabby','Kingler','Voltorb','Electrode','Exeggcute','Exeggutor','Cubone','Marowak','Hitmonlee','Hitmonchan','Lickitung','Koffing','Weezing','Rhyhorn','Rhydon','Chansey','Tangela','Kangaskhan','Horsea','Seadra','Goldeen','Seaking','Staryu','Starmie','Scyther','Jynx','Electabuzz','Magmar','Pinsir','Tauros','Magikarp','Gyarados','Lapras','Ditto','Eevee','Vaporeon','Jolteon','Flareon','Porygon','Omanyte','Omastar','Kabuto','Kabutops','Aerodactyl','Snorlax','Articuno','Zapdos','Moltres','Dratini','Dragonair','Dragonite','Mewtwo','Mew', 'Mr-mime'];

const pokedex = document.querySelector('#pokedex');

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

const createDisplay = ({ name, image, id }) => {
  const section = document.createElement('section');
  section.className = 'pokemon';

  const idParagraph = document.createElement('p');
  idParagraph.innerText = `#${id}`;
  const imageElement = document.createElement('img');
  imageElement.src = image;
  const idName = document.createElement('p');
  idName.innerText = name;
  
  section.appendChild(idParagraph);
  section.appendChild(imageElement);
  section.appendChild(idName);

  return section;
};


pokedexFirstGen.forEach(async (pokemon) => {
  const pokemonLower = pokemon.toLowerCase();
  const pokemonInfo = await fetchPokemon(pokemonLower);


  const sectionPokemon = createDisplay(pokemonInfo)

  pokedex.appendChild(sectionPokemon);
  
})

