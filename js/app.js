function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText)[2].data;
  makeShipDiv(userDatas);
  takeSelectedShipsInDivs(userDatas);
  bottomStatisticsDiv(userDatas);
  searchSpaceship(userDatas);
}
getData('/json/spaceships.json', successAjax);
// Style
document.title = 'Star Wars';
document.querySelector('.one-spaceship').style.backgroundImage = 'url("/img/vader.png")';
document.querySelector('.spaceship-list').style.backgroundImage = 'url("/img/background-vader.jpg")';
document.querySelector('.spaceship-list').style.backgroundSize = 'cover';


// Növekvő sorrendbe rendezzük cost_in_credits alapján.
function costAscDataSort(data) {
  for (var i = 0; i < data.length; i++) {
    for (var j = i + 1; j < data.length; j++) {
      if (data[j].cost_in_credits === null) {
        data.push(data[j]);
        data.splice([j], 1);
      }
      if (parseInt(data[i].cost_in_credits, 10) > parseInt(data[j].cost_in_credits, 10)) {
        [data[i], data[j]] = [data[j], data[i]];
      }
    }
  }
  return data;
}

// Törölni az összes olyan objektumot ahol a consumables értéke null.
function deleteObjectsWhereConsumablesNull(data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].consumables === null) {
      data.splice([i], 1);
      i--;
    }
  }
  return data;
}

// Minden null tulajdonságot unknownra állítani
function everyNullValueToUnknown(data) {
  for (var i = 0; i < data.length; i++) {
    for (var j in data[i]) {
      if (data[i][j] === null) {
        data[i][j] = 'unknown';
      }
    }
  }
  return data;
}

// Az így kapott hajók adatait kiíratni
function selectedShips(data) {
  everyNullValueToUnknown(deleteObjectsWhereConsumablesNull(costAscDataSort(data)));
}

// létrehozom a szükséges számú divet
function makeShipDiv(array) {
  selectedShips(array);
  for (var i = 0; i < array.length; i++) {
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', `ship${i + 1}`);
    newDiv.className = 'list-of-ships';
    document.querySelector('.spaceship-list').appendChild(newDiv);
  }
}

// Belerakom a szelektált hajók adatait a divekbe
function takeSelectedShipsInDivs(array) {
  selectedShips(array);
  var result = '';
  for (var i = 0; i < array.length; i++) {
    result += `<img class='shipImage' src = ${'/img/' + array[i].image} alt=${array[i].model} onerror="this.src = '/img/chewbacca.jpg'"><br>`;
    result += `<h3>${(array[i].model)}</h3>`;
    result += `${displayObject(array[i])} <br>`;
    shipsToList(result, `#ship${i + 1}`);
    result = '';
  }
}

function displayObject(array) {
  var result = '';
  for (var i in array) {
    if (Object.prototype.hasOwnProperty.call(array, i)) {
      result += [i] + ':' + array[i] + '<br>';
    }
  }
  return result;
}

function shipsToList(message, destination) {
  document.querySelector(destination).innerHTML = message;
}

// Statisztika

function oneManCrew(data) {
  var count = 0;
  for (var i = 0; i < data.length; i++) {
    if (parseInt(data[i].crew, 10) === 1) {
      count++;
    }
  }
  return count;
}

function biggestCargoShip(data) {
  var biggest = data[0];
  var biggestModel = '';
  for (var i = 0; i < data.length; i++) {
    if (parseInt(data[i].cargo_capacity, 10) > parseInt(biggest.cargo_capacity, 10)) {
      biggest = data[i];
      biggestModel = data[i].model;
    }
  }
  return biggestModel;
}

function sumPassengers(data) {
  var passengers = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].passengers !== 'unknown') {
      passengers += parseInt(data[i].passengers, 10);
    }
  }
  return passengers;
}

function longestShipsImage(data) {
  var longestShip = data[0];
  var longestShipImg = '';
  for (var i = 0; i < data.length; i++) {
    if (parseInt(data[i].lengthiness, 10) > parseInt(longestShip.lengthiness, 10)) {
      longestShip = data[i];
      longestShipImg = data[i].image;
    }
  }
  return longestShipImg;
}


function bottomStatisticsDiv(data) {
  var bottomDiv = document.createElement('div');
  bottomDiv.className = 'statistics';
  var spaceshiplist = document.querySelector('.spaceship-list');
  spaceshiplist.appendChild(bottomDiv);
  document.querySelector('.statistics').innerHTML = '<hr><h1>Statistics</h1>' +
  'Number of one man crew ships: ' + oneManCrew(data) + '<br>' +
  'Name of the ship which has the biggest cargo capacity: ' + biggestCargoShip(data) + '<br>' +
  'All the passengers of the ships: ' + sumPassengers(data) + '<br>' +
  'Image name of the longest ship: ' + longestShipsImage(data);
}

// keresés
var sideDiv = document.createElement('div');
var mainSide = document.querySelector('.one-spaceship');
sideDiv.className = 'oneSpaceshipDiv';
mainSide.appendChild(sideDiv);

function searchSpaceship(data) {
  document.querySelector('#search-button').onclick = function justBecauseOfEslint() {
    var inputValue = document.querySelector('#search-text').value.toLowerCase();
    for ( var i = 0; i < data.length; i++) {
      if (data[i].model.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) {
        document.querySelector('.oneSpaceshipDiv').innerHTML =
        displayObject(data[i]) + '<br>' +
        `<img class='sideImage' src = ${'/img/' + data[i].image} alt=${data[i].model} onerror="this.src = '/img/chewbacca.jpg'"><br>`;
      }
    }
  };
}
document.querySelector('.oneSpaceshipDiv').ondblclick = function () {
  document.querySelector('.oneSpaceshipDiv').innerHTML = '';
};

document.querySelector('.spaceship-list h1').innerHTML = `<img class="headImage" src=${'/img/star-wars-transparent.png'} alt="star-wars">`;
