class Character {
  constructor(
    name,
    gender,
    height,
    mass,
    hairColor,
    skinColor,
    eyeColor,
    movies,
    pictureUrl
  ) {
    this.name = name;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.hairColor = hairColor;
    this.skinColor = skinColor;
    this.eyeColor = eyeColor;
    this.movies = movies;
    this.pictureUrl = pictureUrl;
  }
}





compareHeight = (characterOne, characterTwo) => {
  if (characterOne.height > characterTwo.height) {
    return `${characterOne.name} is taller than ${characterTwo.name}`;
  } else if (characterOne.height < characterTwo.height) {
    return `${characterTwo.name} is taller than ${characterOne.name}`;
  } else {
    return `${characterOne.name} and ${characterTwo.name} are the same height`;
  }
};

compareMass = (characterOne, characterTwo) => {
  if (characterOne.mass > characterTwo.mass) {
    return `${characterOne.name} is heavier than ${characterTwo.name}`;
  } else if (characterOne.mass < characterTwo.mass) {
    return `${characterTwo.name} is heavier than ${characterOne.name}`;
  } else {
    return `${characterOne.name} and ${characterTwo.name} are the same weight`;
  }
};

compareHairColor = (characterOne, characterTwo) => {
  if (characterOne.hairColor === characterTwo.hairColor) {
    return `${characterOne.name} and ${characterTwo.name} have the same hair color`;
  } else {
    return `${characterOne.name} and ${characterTwo.name} have different hair colors`;
  }
};

compareSkinColor = (characterOne, characterTwo) => {
  if (characterOne.skinColor === characterTwo.skinColor) {
    return `${characterOne.name} and ${characterTwo.name} have the same skin color`;
  } else {
    return `${characterOne.name} and ${characterTwo.name} have different skin colors`;
  }
};

compareEyeColor = (characterOne, characterTwo) => {
  if (characterOne.eyeColor === characterTwo.eyeColor) {
    return `${characterOne.name} and ${characterTwo.name} have the same eye color`;
  } else {
    return `${characterOne.name} and ${characterTwo.name} have different eye colors`;
  }
};

compareMovies = (characterOne, characterTwo) => {
  if (characterOne.movies.length > characterTwo.movies.length) {
    return `${characterOne.name} has been in more movies than ${characterTwo.name}`;
  } else if (characterOne.movies.length < characterTwo.movies.length) {
    return `${characterTwo.name} has been in more movies than ${characterOne.name}`;
  } else {
    return `${characterOne.name} and ${characterTwo.name} have been in the same amount of movies`;
  }
};

compareGender = (characterOne, characterTwo) => {
  if (characterOne.gender === characterTwo.gender) {
    return `${characterOne.name} and ${characterTwo.name} have the same gender`;
  } else {
    return `${characterOne.name} and ${characterTwo.name} have different genders`;
  }
};

let loading = document.querySelector(".loading");
let header = document.querySelector("header");
let main = document.querySelector("main");
let footer = document.querySelector("footer");


header.style.display = "none";
main.style.display = "none";
footer.style.display = "none";
loading.innerHTML = `Waiting for characters to arrive...`;

let getCharacterData = async (url) => {
  let data = await fetch(url);
  let json = await data.json();
  return json;
};

let showData = async () => {
  
  
    const characterUrls = [
    "https://swapi.dev/api/people/1/",
    "https://swapi.dev/api/people/4/",
    "https://swapi.dev/api/people/3/",
    "https://swapi.dev/api/people/14/",
    "https://swapi.dev/api/people/13/",
    "https://swapi.dev/api/people/10/",
    "https://swapi.dev/api/people/20/",
  ];

  const characters = [];

  for (const url of characterUrls) {
    const data = await getCharacterData(url);
    const character = new Character(
      data.name,
      data.gender,
      data.height,
      data.mass,
      data.hair_color,
      data.skin_color,
      data.eye_color,
      data.films
    );
    characters.push(character);
  }


  let characterOneList = document.querySelector("#characterOneList");
  let dropDownCharacterOne = document.querySelector("#dropDownCharacterOne");
  let compareBtns = document.querySelector("#compareButton");
  let horiLine = document.querySelector("#horiLine");
  compareBtns.style.display = "none";
    horiLine.style.display = "none";
    loading.style.display = "none";
    header.style.display = "flex";
    main.style.display = "flex";
    footer.style.display = "flex";


  dropDownCharacterOne.addEventListener("change", function () {
    let selectedOption =
      dropDownCharacterOne.options[dropDownCharacterOne.selectedIndex]
        .innerHTML;
    let picture =
      dropDownCharacterOne.options[dropDownCharacterOne.selectedIndex].value;

    horiLine.style.display = "block";

    characters.forEach((character) => {
      if (character.name === selectedOption) {
        characterOneList.innerHTML = `<p class="characterName">${character.name}</p>
            <img class="characterPic" src="assets/images/${picture}">
            `;
      }
    });
  });

  let characterTwoList = document.querySelector("#characterTwoList");
  let dropDownCharacterTwo = document.querySelector("#dropDownCharacterTwo");
  let compareButton = document.querySelector("#compare-button");

  dropDownCharacterTwo.addEventListener("change", function () {
    let selectedOption1 =
      dropDownCharacterTwo.options[dropDownCharacterTwo.selectedIndex]
        .innerHTML;
    let pictureTwo =
      dropDownCharacterTwo.options[dropDownCharacterTwo.selectedIndex].value;



    characters.forEach((character) => {
      if (character.name === selectedOption1) {
        characterTwoList.innerHTML = `<p class="characterName">${character.name}</p>
            <img class="characterPic" src="assets/images/${pictureTwo}">
            `;
      }
    });
  });

  compareButton.addEventListener("click", function () {
    if (
      dropDownCharacterOne.value &&
      dropDownCharacterTwo.value
    ) {
        
      let selectedOption =
        dropDownCharacterOne.options[dropDownCharacterOne.selectedIndex]
          .innerHTML;
      let selectedOptionTwo =
        dropDownCharacterTwo.options[dropDownCharacterTwo.selectedIndex]
          .innerHTML;
      let compareOneList = document.querySelector("#compareOneList");
      let compareTwoList = document.querySelector("#compareTwoList");
      let character = characters.find(
        (character) => character.name === selectedOption
      );
      let characterTwo = characters.find(
        (characterTwo) => characterTwo.name === selectedOptionTwo
      );
      let str = character.gender;
      let upperCase1 = str.charAt(0).toUpperCase() + str.slice(1);

      console.log(character);
      console.log(characterTwo);
      characters.forEach((character) => {
        if (character.name === selectedOption) {
          compareOneList.innerHTML = `<p>Name: ${character.name}</p>
            <p>Gender: ${upperCase1}</p>
            <p id="firstHeight">Height: ${character.height}</p>
            <p id="firstMass">Mass: ${character.mass}</p>
            <p id="firstHair">Haircolor: ${character.hairColor}</p>
            <p id="firstSkin">Skincolor: ${character.skinColor}</p>
            <p>Eyecolor: ${character.eyeColor}</p>
            <p>How many movies: ${character.movies.length}</p>
            `;
          return character;
        }
      });


      if (characterTwo.gender === "n/a") {
          console.log("hej")
          characterTwo.gender = "Unknown";
          }
      let str2 = characterTwo.gender;
      let upperCase = str2.charAt(0).toUpperCase() + str2.slice(1);

     
      if (characterTwo.hairColor === "none") {
        characterTwo.hairColor = "Bold";
        }


      characters.forEach((characterTwo) => {
        if (characterTwo.name === selectedOptionTwo) {
          compareTwoList.innerHTML = `<p>Name: ${characterTwo.name}</p>
            <p>Gender: ${upperCase}</p>
            <p id="secondHeight">Height: ${characterTwo.height}</p>
            <p id="secondMass">Mass: ${characterTwo.mass}</p>
            <p id="secondHair">Haircolor: ${characterTwo.hairColor}</p>
            <p id="secondSkin">Skincolor: ${characterTwo.skinColor}</p>
            <p>Eyecolor: ${characterTwo.eyeColor}</p>
            <p>How many movies: ${characterTwo.movies.length}</p>
            `;
          return characterTwo;
        }
        compareBtns.style.display = "grid";
      });


      
      let compareResult = document.querySelector("#compareResult");
      character.mass = parseInt(character.mass);
        characterTwo.mass = parseInt(characterTwo.mass);
        character.height = parseInt(character.height);
        characterTwo.height = parseInt(characterTwo.height);
      
      
      let compareButton = document.querySelector("#compareButton");
      compareButton.addEventListener("click", function () {
        compareResult.innerHTML = `<li>${compareHeight(character, characterTwo)}</li>
        <li>${compareMass(character, characterTwo)}</li>
        <li>${compareHairColor(character, characterTwo)}</li>
        <li>${compareSkinColor(character, characterTwo)}</li>
        <li>${compareGender(character, characterTwo)}</li>
        <li>${compareMovies(character, characterTwo)}</li>
        `;
      });

    } 
    
    else {
      alert("Please select two characters");
    }
  });
  let resetBtn = document.querySelector("#reset-button");
  resetBtn.addEventListener("click", function () {
    location.reload();
  });
};

showData();
