/**
 * Author: DIEGO CASALLAS
 * Date: 27/03/2024
 * Description: This class manages data from FIREBASE.
 */
class FirebaseGameUser {
  constructor(idTbody) {
    // Método constructor que recibe el ID del tbody
    this.objTbody = document.getElementById(idTbody);
    // URL de la base de datos Firebase
    this.URL = "https://adso-new-default-rtdb.asia-southeast1.firebasedatabase.app/users";
  }

  // Método para obtener todos los usuarios
  async getDataUsers() {
    try {
      const res = await fetch(this.URL + ".json");
      if (!res.ok) {
        console.log('Result: Problem');
        return;
      }
      const data = await res.json();
      this.setTableUser(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Método para obtener los datos de un usuario por su ID
  async getDataUser(id) {
    try {
      const res = await fetch(`${this.URL}/${id}.json`);
      if (!res.ok) {
        console.log('Result: Problem');
        return;
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  // Método para crear la tabla de usuarios en el HTML
  setTableUser(data) {
    let contRow = 1;
    let rowTable = "";
    let btnActions = "";
    for (const user in data) {
      let getId = `'${user}'`;
      btnActions = `<div class="btn-group " role="group" aria-label="Basic mixed styles example">
        <button type="button" onclick="showUser(${getId})" class="btn btn-info"><img class="img img-fluid" src="./assets/img/icons/eye-fill.svg"></button>
        <button type="button" onclick="editUser(${getId})" class="btn btn-warning"><img class="img img-fluid" src="./assets/img/icons/pencil-square.svg"></button>
        <button type="button" onclick="deleteUser(${getId})" class="btn btn-danger"><img class="img img-fluid" src="./assets/img/icons/trash3-fill.svg"></button>
        </div>`;
      rowTable += `<tr>
        <td>${contRow}</td>
        <td>${data[user].nombre}</td>
        <td>${data[user].nickname}</td>
        <td>${data[user].img}</td>
        <td class='text-center'>${data[user].valor}</td>
        <td class='text-center'>${btnActions}</td>
        </tr>`;
      contRow++;
    }
    this.objTbody.innerHTML = rowTable;
  }

  // Método para crear un nuevo usuario
  async setCreateUser(data) {
    try {
      const res = await fetch(this.URL + ".json", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        console.log('Result: Problem');
        return;
      }
      this.getDataUsers();
    } catch (error) {
      console.error(error);
    }
  }

  // Método para actualizar un usuario existente
  async setUpdateUser(id, data) {
    try {
      const res = await fetch(`${this.URL}/${id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        console.log('Result: Problem');
        return;
      }
      this.getDataUsers();
    } catch (error) {
      console.error(error);
    }
  }

  // Método para eliminar un usuario
  async setDeleteUser(id) {
    try {
      const res = await fetch(`${this.URL}/${id}.json`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        console.log('Result: Problem');
        return;
      }
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  }
}
