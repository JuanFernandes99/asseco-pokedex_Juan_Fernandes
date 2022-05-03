"use strict";

const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";
const pokemonContainer = document.querySelector(".grid-container");

const renderPokemons = function (data, imagem) {
  const html = `
  <div class = "container">
    <div class="grid-item">${data.name}</div>
  <img class="center" src="${imagem}" > </div>
          `;
  pokemonContainer.insertAdjacentHTML("beforeend", html);
};

const getQuery = function () {
  const query = document.querySelector(".search__field").value;
  return query;
};

const Pokemons = async function () {
  try {
    const pokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");

    if (!pokemons.ok) throw new Error(`Problem with server ${pokemons.status}`);

    const response = await pokemons.json();

    console.log(response.results);
    response.results.forEach(async function (pokemon, index) {
      const pokemonImage = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${index + 1}/`
      );

      if (!pokemonImage.ok)
        throw new Error(`Problem with server ${pokemons.status}`);
      const responseImagem = await pokemonImage.json();
      console.log(responseImagem);
      renderPokemons(pokemon, responseImagem.sprites.front_default);
    });
  } catch (err) {
    console.log(`${err.message} 🤢🤢`);
  } finally {
  }
};

Pokemons();
