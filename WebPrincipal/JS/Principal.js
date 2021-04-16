'use strict';
import Actividad from "./Actividad.js";

var objArrayActividades, objActividad, tblActividades, btnGuardar, btnEliminar, btnRecargar, btnCancelar, txtTerminado, txtDescripcion, banderaEsEdicion, objModelActividad;

OnInit();

function OnInit() {
    objArrayActividades = "";
    objActividad = new Actividad();
    tblActividades = document.getElementById('tblActividades');
    btnGuardar = document.getElementById("btnGuardar");
    btnEliminar = document.getElementById("btnEliminar");
    btnRecargar = document.getElementById("btnRecargar");
    btnCancelar = document.getElementById("btnCancelar");
    txtTerminado = document.getElementById("txtTerminado");
    txtTerminado.value = "";
    txtDescripcion = document.getElementById("txtDescripcion");
    txtDescripcion.value = "";
    banderaEsEdicion = false;
    objModelActividad = {
        "id": null,
        "descripcion": null,
        "fechaRegistro": null,
        "fechaModificado": null,
        "terminado": null
    };
    objActividad.obtenerActividades().then((response) => {
        response.forEach(elem => {
            objArrayActividades += `<tr data-actividad='${JSON.stringify(elem)}'><td>${elem.id}</td><td>${elem.descripcion}</td><td>${elem.terminado}</td><td>${elem.fechaRegistro}</td><td>${elem.fechaModificado}</td></tr>`;
        });
        tblActividades.innerHTML = "";
        tblActividades.innerHTML = objArrayActividades;
    }).catch(error => {

    });
}

tblActividades.addEventListener("click", function (e) {
    e = e || window.event;
    var data = [];
    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    let productoSeleccionado = JSON.parse(target.dataset.actividad);
    objModelActividad = productoSeleccionado;
    txtId.value = objModelActividad.id;
    document.getElementById("txtTerminado").checked = objModelActividad.terminado;
    txtDescripcion.value = objModelActividad.descripcion;
    banderaEsEdicion = true;
    btnCancelar.style.display = 'inline';
});

btnGuardar.addEventListener("click", function (evet) {
    event.preventDefault();
    if (txtDescripcion.value) {
        if (!banderaEsEdicion) {
            // insert
            let actividad = {
                "descripcion": txtDescripcion.value,
                "terminado": document.getElementById("txtTerminado").checked
            };
            objActividad.agregarActividad(actividad).then((response) => {
                OnInit();
            }).catch(error => {
            });
            ClearSelect();
        } else {
            //update
            let actividad = {
                "id": objModelActividad.id,
                "descripcion": txtDescripcion.value,
                "terminado": document.getElementById("txtTerminado").checked
            };
            objActividad.editarActividad(actividad).then((response) => {
                OnInit();
            }).catch(error => {
            });
            ClearSelect();
        }
    }
});

btnEliminar.addEventListener("click", function (evet) {
    event.preventDefault();
    if (objModelActividad.id) {
        if (confirm(`¿Desea eliminar la actividad: ${txtDescripcion.value} ?`)) {
            objActividad.eliminarActividad(objModelActividad.id).then((response) => {
                OnInit();
            }).catch(error => {
            });
            ClearSelect();
        }
    }
});

btnRecargar.addEventListener("click", function (evet) {
    event.preventDefault();
    OnInit();
});

btnCancelar.addEventListener("click", function (evet) {
    event.preventDefault();
    ClearSelect();
});

function ClearSelect() {
    banderaEsEdicion = false;
    txtId.value = "";
    txtDescripcion.value = "";
    document.getElementById("txtTerminado").checked = false;
    btnCancelar.style.display = 'none';
}