import React, { useState } from 'react';

function App() {
  const [pokemon1, setPokemon1] = useState('charizard');
  const [pokemon2, setPokemon2] = useState('venusaur');
  const [pokemon1Type, setPokemon1Type] = useState('fire');
  const [pokemon2Type, setPokemon2Type] = useState('grass');
  const [endResult, setEndResult] = useState('');

  const handlePokemon1Change = (event) => {
    setPokemon1(event.target.value);
  };

  const handlePokemon2Change = (event) => {
    setPokemon2(event.target.value);
  };

  const getWeaknesses = (type) => {
    switch (type) {
        case 'normal':
          return ['Fighting'];
        case 'fire':
          return ['Water', 'Ground', 'Rock'];
        case 'water':
          return ['Electric', 'Grass'];
        case 'electric':
          return ['Ground'];
        case 'grass':
          return ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'];
        case 'ice':
          return ['Fire', 'Fighting', 'Rock', 'Steel'];
        case 'fighting':
          return ['Flying', 'Psychic', 'Fairy'];
        case 'poison':
          return ['Ground', 'Psychic'];
        case 'ground':
          return ['Water', 'Grass', 'Ice'];
        case 'flying':
          return ['Electric', 'Ice', 'Rock'];
        case 'psychic':
          return ['Bug', 'Ghost', 'Dark'];
        case 'bug':
          return ['Fire', 'Flying', 'Rock'];
        case 'rock':
          return ['Water', 'Grass', 'Fighting', 'Ground', 'Steel'];
        case 'ghost':
          return ['Ghost', 'Dark'];
        case 'dragon':
          return ['Ice', 'Dragon', 'Fairy'];
        case 'dark':
          return ['Fighting', 'Bug', 'Fairy'];
        case 'steel':
          return ['Fire', 'Fighting', 'Ground'];
        case 'fairy':
          return ['Poison', 'Steel'];
        default:
          return [];
      }
    };

    

    
    const findEndResult = () => {
      var weaknesses = getWeaknesses(pokemon1Type);
      let matchFound = false;
      console.log('findEndResult');
      console.log(weaknesses.length);

      for (let i = 0; i < weaknesses.length; i++) {
        console.log(i + 'o' + '\n')
        if (weaknesses[i].toLowerCase() === pokemon2Type.toLowerCase()) {
          setEndResult(pokemon2);
          matchFound = true;
          break; // Exit the loop early if a match is found
      }
  }

  if (!matchFound){
      weaknesses = getWeaknesses(pokemon2Type);

      for (let i = 0; i < weaknesses.length; i++) {
        if (weaknesses[i].toLowerCase() === pokemon1Type.toLowerCase()) {
          setEndResult(pokemon1);
          matchFound = true;
          break; // Exit the loop early if a match is found
        }
      }
      }
      if (!matchFound) {
        setEndResult('stalemate'); // Set stalemate if no match is found
      }
    }


    function doAFetch() {
      fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon1)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          return response.types[0].type.name;
        })
        .then(response => {
          setPokemon1Type(response);
          console.log(response);
          return response;
        });
    
      fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon2)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          return response.types[0].type.name;
        })
        .then(response => {
          setPokemon2Type(response);
          console.log(response);
          return response;
        })
        .then(() => {
          findEndResult();
        })
        .catch(error => {
          console.log('That didn\'t work. Here\'s an error:', error);
        });
    }; 


  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10%', justifyContent: 'center', marginTop: '1%' }}>
        <input
          type="text"
          value={pokemon1}
          onChange={handlePokemon1Change}
          placeholder="Enter Pokemon 1"
        />
        <input
          type="text"
          value={pokemon2}
          onChange={handlePokemon2Change}
          placeholder="Enter Pokemon 2"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '2%' }}>
        <img src={'https://freepngimg.com/thumb/pokemon/37475-6-pikachu-transparent-image.png'} alt="Sitting Pikachu" style={{ maxWidth: '300px' }} />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', gap: '10%', marginTop: '2%', justifyContent: 'center'}}>
      <p style={{ marginBottom: '5px', fontSize: '18px', fontWeight: 'bold', color: '#77CC55' }}>
        Pokemon 1 type: {pokemon1Type}
      </p>
      <p style={{ marginBottom: '5px', fontSize: '18px', fontWeight: 'bold', color: '#55AAFF' }}>
        Pokemon 2 type: {pokemon2Type}
      </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
        <button onClick={doAFetch}>Battle!</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
        {endResult}
      </div>
    </div>
  );
}

export default App;

