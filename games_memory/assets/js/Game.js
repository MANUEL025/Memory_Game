class Game {
  constructor(contGame, level) {
    this.contGame = document.getElementById(contGame); 
    this.contCardGame;
    this.getServer = window.location.origin; 
    this.folderPath = "/games_memory"; 
    this.serverPath = this.getServer + this.folderPath; 
    this.uriJson = this.serverPath + "/assets/doc/User.json"; 
    this.pathImg = this.serverPath + "/assets/img/memory/"; 
    this.pathImgDafault = this.serverPath + "/assets/img/memory/img_default.jpg"; 
    this.longBootstrap = 12 / level; 
    this.newArrayGames = []; 
    this.arrayGamesCard = []; 
    this.getDataJson();
    this.num = level; 
    this.max = 19; 
    this.min = 0;
    this.maxCard = (this.num * this.num) / 2; 
    this.selected = true; 
    this.selectedCard = []; 
  }

  getDataJson() {
    fetch(this.uriJson)
      .then(response => response.json())
      .then(data => {
        this.setElements(data);
      });
  }

  getRandomArray(min, max, count) {
    let contentGame = [];
    let contentNum = [];
    if (min > max || count > max - min) {
      return false;
    }
    while (contentGame.length < count) {
      var num = Math.floor((Math.random() * (max - min)) + min);
      if (!contentNum.includes(num)) {
        contentGame.push(this.newArrayGames[num]);
        contentNum.push(num);
      }
    }
    this.arrayGamesCard = contentGame.concat(contentGame);
    return this.setShuffleArray(this.arrayGamesCard);
  }

  setShuffleArray(dataArrar) {
    return dataArrar.sort(() => Math.random() - 0.5);
  }

  setElements(arraJson) {
    let cards = "";
    let cardsAux = "";
    let cont = 0;
    let row = this.num - 1;
    this.contGame.innerHTML = "";
    this.newArrayGames = arraJson;
    const getNewArray = this.getRandomArray(this.min, this.max, this.maxCard);

    for (let i = 0; i < getNewArray.length; i++) {
      cardsAux += '<div class="col-' + this.longBootstrap + ' pt-2 mx-auto contCard" disabled><div class="card" ><img data-src="' + this.pathImg + getNewArray[i].img + '" src="' + this.pathImgDafault + '" class="card-img-top" alt="..."></div></div>';
      cont++;
      if (row == cont - 1) {
        cards += '<div class="row">' + cardsAux + '</div>';
        cont = 0;
        cardsAux = "";
      }
    }
    this.contGame.innerHTML = cards;
    this.changeElementImg();
  }

  changeElementImg() {
    this.contCardGame = document.querySelectorAll('.contCard');
    var pathDefault = this.pathImgDafault;
    for (let i = 0; i < this.contCardGame.length; i++) {
      const objImg = this.contCardGame[i].querySelector('img');
      this.contCardGame[i].addEventListener('click', () => {
        this.cardClickHandler(objImg, pathDefault);
      });
    }
  }

  cardClickHandler(objImg, pathDefault) {
    if (objImg.src == pathDefault) {
      objImg.src = objImg.dataset.src;
      this.setSelectCard(objImg);
    }
  }

  setSelectCard(obj) {
    if (this.selected) {
        this.selected = false;
        this.selectedCard[0] = obj.dataset.src;
    } else {
        this.selected = true; // Restablecer la bandera a true
        this.selectedCard[1] = obj.dataset.src;
        
        if (this.selectedCard.length === 2) {
            if (this.selectedCard[0] === this.selectedCard[1]) {
                setTimeout(() => {
                    document.querySelector('img[data-src="' + this.selectedCard[0] + '"]').style.visibility = 'hidden';
                    obj.style.visibility = 'hidden';
                    this.selectedCard = [];
                }, 500);
            } else {
                setTimeout(() => {
                    document.querySelector('img[data-src="' + this.selectedCard[0] + '"]').src = this.pathImgDafault;
                    obj.src = this.pathImgDafault;
                    this.selectedCard = [];
                    this.selected = true; 
                }, 500);
            }
        }
    }
}

}
