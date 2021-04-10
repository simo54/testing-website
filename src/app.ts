import { IPokemon } from "./interfaces";

const container: HTMLElement = document.getElementById("app")!;
const pokemons: number = 10;

const showPokemon = (pokemon: IPokemon): void => {
  let output: string = `
            <div class="card">
                <span class="card--id">#${pokemon.id}</span>
                <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
                <h1 class="card--name">${pokemon.name}</h1>
                <span class="card--details">${pokemon.type}</span>
            </div>
        `;
  container.innerHTML += output;
};

const fetchData = (): void => {
  for (let i: number = 1; i <= pokemons; i++) {
    getPokemon(i);
  }
};

const getPokemon = async (id: number): Promise<void> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: any = await data.json();
  const pokemonType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(", ");

  const transformedPokemon: IPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType,
  };

  showPokemon(transformedPokemon);
};

fetchData();
