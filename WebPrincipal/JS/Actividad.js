'use strict';
import Servicio from "./Servicio.js";
export default class Actividad extends Servicio {
    constructor() {
        super();
    }

    obtenerActividades() {
        var myRequest = new Request(`http://localhost:53697/api/Actividad/Select`, { method: 'GET', body: null });
        return new Promise(function (resolve, reject) {
            this.http(myRequest).then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        }.bind(this));
    }

    agregarActividad(_actividad) {
        var myRequest = new Request(`http://localhost:53697/api/Actividad/Insert`, { method: 'POST', body: JSON.stringify(_actividad), headers: { "content-type":"application/json"} });
        return new Promise(function (resolve, reject) {
            this.http(myRequest).then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        }.bind(this));
    }

    eliminarActividad(_id) {
        var myRequest = new Request(`http://localhost:53697/api/Actividad/delete/${_id}`, { method: 'DELETE', body: null });
        return new Promise(function (resolve, reject) {
            this.http(myRequest).then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        }.bind(this));
    }

    editarActividad(_actividad) {
        var myRequest = new Request(`http://localhost:53697/api/Actividad/Update`, { method: 'PUT', body: JSON.stringify(_actividad), headers: { "content-type": "application/json" } });
        return new Promise(function (resolve, reject) {
            this.http(myRequest).then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        }.bind(this));
    }

}