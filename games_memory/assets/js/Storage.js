class UserManagement {
  constructor() {
    this.STORAGE = window.localStorage;
    this.modelUsers = "users";
    this.usersData = JSON.parse(this.getDataStorage(this.modelUsers));
    this.newUser = "";
    this.getInput = null;
    this.createTableUser();
    document.getElementById('FormUser').addEventListener('submit', (event) => this.handleSubmit(event));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getInput = event.target.querySelector("input[type='text']");
    this.newUser = { username: this.getInput.value.toUpperCase(), points: 0 };
    this.usersData = this.validarYAgregarUsuario(this.usersData, this.newUser);
    this.setDataStorage(this.usersData);
    alert(`BIENVENIDO ${this.getInput.value.toUpperCase()}`);
    this.setLocation(`../../games.html?username=${this.getInput.value.toUpperCase()}&points=0`);
  }

  validarYAgregarUsuario(jsonData, nuevoUsuario) {
    if (Object.keys(jsonData).length === 0) {
      jsonData.users = [nuevoUsuario];
    } else {
      if (!jsonData.users) {
        jsonData.users = [];
      }
      const usuariosExistentes = jsonData.users.map(user => user.username);
      if (!usuariosExistentes.includes(nuevoUsuario.username)) {
        jsonData.users.push(nuevoUsuario);
      } else {
        console.log("El usuario ya existe en el JSON.");
      }
    }
    return jsonData;
  }

  setDataStorage(jsonData) {
    let getData = JSON.parse(this.getDataStorage(this.modelUsers));
    if (getData[this.modelUsers].length <= 10) {
      this.STORAGE.setItem(this.modelUsers, JSON.stringify(jsonData));
    }
  }

  setLocation(route) {
    location.href = route;
  }

  getDataStorage(obj) {
    let getData = this.STORAGE.getItem(obj);
    if (getData === null) {
      getData = '{"' + obj + '":[]}';
    }
    return getData;
  }

  createTableUser() {
    let getData = JSON.parse(this.STORAGE.getItem(this.modelUsers));
    let newOptions = '<option value="0" selected style="font-size: 1.5em;">SELECT PROFILE</option>';
    let contSelect = document.getElementById('selectProfile');
    if (getData !== null) {
      getData[this.modelUsers].forEach(element => {
        newOptions += '<option value="' + element.username + '">' + element.username + '</option>';
      });
    }
    contSelect.innerHTML = newOptions;
  }
}

new UserManagement();
