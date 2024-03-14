class Game {
  constructor(contGame, level, prog, chor, speed, maxMilliseconds) {
    this.progCont = document.getElementById(prog);
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
    this.totalPointGame = 0;
    this.totalPoint = 0;
    this.contCardClass = "contCard";
    this.objChoronometer = new Choronometer(chor, speed, maxMilliseconds);
  }

  getDataJson() {
    fetch(this.uriJson)
      .then(response => response.json())
      .then(data => {
        this.setElements(data);
        // Iniciar el cronómetro después de obtener los datos del juego
        this.objChoronometer.startChoronometer();
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
      this.totalPointGame += getNewArray[i].valor;
      cardsAux += '<div class="col-' + this.longBootstrap + ' pt-1 mx-auto ' + this.contCardClass + '"><div class="card" ><img data-value="' + getNewArray[i].valor + '" data-src="' + this.pathImg + getNewArray[i].img + '" src="' + this.pathImgDafault + '" class="card-img-top" alt="..."></div></div>';
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
    this.contCardGame = document.querySelectorAll('.' + this.contCardClass);
    var pathDefault = this.pathImgDafault;
    for (let i = 0; i < this.contCardGame.length; i++) {
      const objImg = this.contCardGame[i].querySelector('img');
      this.contCardGame[i].addEventListener('click', () => {
        if (objImg.src == pathDefault) {
          objImg.src = objImg.dataset.src;
          this.setSelectCard(objImg);
        }
      });
    }
  }

  setSelectCard(obj) {
    let selectedPoint = 0;
    if (this.selected) {
      this.selected = false;
      this.selectedCard[0] = obj;
    } else {
      this.selectedCard[1] = obj;
      this.selected = true;
    }
    if (this.selectedCard.length > 1) {
      if (this.selectedCard[0].dataset.src == this.selectedCard[1].dataset.src) {
        this.selectedCard[0].parentElement.removeEventListener('click', () => { });
        this.selectedCard[1].parentElement.removeEventListener('click', () => { });
        selectedPoint = this.selectedCard[0].dataset.value;
        
        this.totalPoint += parseInt(selectedPoint);
        const progress = ((this.totalPoint) / (this.totalPointGame / 2)) * 100;
        this.setProgressData(progress);
        this.selectedCard = [];
       
        this.objChoronometer.setGameProgress(progress);
        // Si el progreso es 100%, detener el cronómetro
        if (progress === 100) {
          this.objChoronometer.stopChoronometer();
        }
      } else {
        this.selectedCard[0].src = this.pathImgDafault;
        this.selectedCard[1].src = this.pathImgDafault;
        this.selectedCard = [];
      }
    }
  }

  setProgressData(dataProgress) {
    this.progCont.innerText = parseInt(dataProgress) + "%";
    this.progCont.style.width = dataProgress + "%";

  }
  
}
function resetProgressBar() {
  document.getElementById('progressbarId').innerText = "0%";
  document.getElementById('progressbarId').style.width = "0%";
}
