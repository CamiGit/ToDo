// Definicion de variables
let tareas = []
let totalTareas = 0
let tareasHechas = 0

// Obtenemos los elementos para poderlos manipular
const inputTarea = document.getElementById('nuevaTarea');
const selectCategoria = document.getElementById('tarea');
const otraCategoria = document.getElementById('otraCategoria');
const btnAgregar = document.getElementById('btnAgregar');
const errorMsg = document.getElementById('errorMsg');
const errorMsgEli = document.getElementById('errorMsgEli')
const listaTareas = document.getElementById('listaTareas');
const spanCompletadas = document.getElementById('completadas');
const spanTotal = document.getElementById('total');
const btnBorrarTareas = document.getElementById('btnBorrarTareas')

// Funcion agregar tarea, la cual almacena la tarea y la muestra en pantalla
function agregarTarea(){
    // Variables que almacenan los datos ingresados por el usuario
    const texto = inputTarea.value.trim();
    let categoria = selectCategoria.value;

    // Valida si el usuario selecciono otra categoria y si lo deja en blanco deja por defecto Otra
    if (categoria === "otra") {
        categoria = otraCategoria.value.trim() || "Otra";
    }

    // Valida si el usuario no ingreso la tarea de ser asi regresa el error
    if (texto == ""){
        errorMsg.style.display = "block";
        return;
    }

    // Cambia el estado del error para que el mensaje no sea visible
    errorMsg.style.display = "none";
    console.log("Tarea agregada: ", texto);

    // Formato para una nueva tarea
    const nuevaTarea = {
        texto: texto,
        categoria: categoria,
        hecha: false,
        urgente: false,
    }

    // Agrega nueva tarea al array tareas
    tareas.push(nuevaTarea);
    // Aumenta el contador del total de tareas
    totalTareas++;
    // Asignamos el valor totalTareas a spanTotal para que sea mostrado en pantalla
    spanTotal.textContent = totalTareas;
    // Reiniciamos las variables para que queden en blanco
    inputTarea.value = '';
    otraCategoria.value = '';
    otraCategoria.style.display = 'none';
    selectCategoria.value = '';
    // llamamos a la funcion renderizar tarea, la cual se le pasa la tarea asignada por el usuario como parametro
    renderizarTarea(nuevaTarea);
}

// Se encarga de mostrar la nueva tarea en pantalla
function renderizarTarea(tarea) {
    // Crea un elemento tipo lista en memoria
    const li = document.createElement('li');
    // Inserta los elementos HTML en la etiqueta li 
    li.innerHTML = `
        <span class="tarea">
        <strong>${tarea.categoria}</strong> - ${tarea.texto}
        </span>
        <button onclick="marcarHecha(this)">✅ Hecha</button>
        <button onclick="marcarUrgente(this)">⚠️ Urgente</button>
        <button onclick="eliminarTarea(this)">🗑️ Eliminar</button>
    `;

    // Agrega el elemento li dentro de la etiqueta ul listaTareas
    listaTareas.appendChild(li);
}

// Llama la función agregarTarea cuando el usuario da click sobre el boton
btnAgregar.onclick = agregarTarea;

// Valida si el usuario ingreso otra categoria mostrar en pantalla el campo donde el usuario ingresaria la nueva catetoria
selectCategoria.addEventListener("change", function() {
    if (selectCategoria.value === "otra") {
        otraCategoria.style.display = 'block';
    } else {
        otraCategoria.style.display = 'none';
    }
});

// Esta función marca como hecha la tarea y cambia el contador si la tarea esta hecha o no
function marcarHecha(btn) {
    // Valiable almacena el li padre del boton
    const li = btn.parentElement;
    // Almacena el estado de la clase
    const wasHecha = li.classList.contains('hecha');
    //  Cambia el estado de la clase
    li.classList.toggle('hecha');
    // Valida si la variable wasHecha es True resta al contador sino suma al contador
    if (wasHecha) {
        tareasHechas--;
    } else {
        tareasHechas++;
    }
    // Muestra en consola el numero de tareas hechas en la pantalla
    spanCompletadas.textContent = tareasHechas;
    console.log('Tarea marcada como hecha');
}

// Esta función marca como utgente y cambia el estado de la etiqueta li
function marcarUrgente(btn) {
    // Valiable almacena el li padre del boton
    const li = btn.parentElement;
    //  Cambia el estado de la clase
    li.classList.toggle('urgente');
    console.log('Tarea marcada como urgente');
}

// Esta función elimina la etiqueta li y muestra un mensaje confirmando la eliminación
function eliminarTarea(btn) {

    // Valida si el usuario confirma luego de seleccionar eliminar boton
    if (confirm('¿Seguro que quieres eliminar esta tarea?')) {
        // Valiable almacena el li padre del boton
        const li = btn.parentElement;
        // Almacena el estado de la clase
        const estaHecha = li.classList.contains('hecha');

        // valida si el esta de la tarea esta como hecha, resta uno a tareas hechas
        if (estaHecha) tareasHechas--;
        // resta una unidad al total de tareas ya que elimina una tarea este hecha o no
        totalTareas--;
        // Asigna nuevos valores a los contadores
        spanCompletadas.textContent = tareasHechas;
        spanTotal.textContent = totalTareas;
        // Borra el li creado de la tarea
        li.remove();
        console.log('Tarea eliminada');
    }
}

// Esta función elimina todas las tareas hechas en una sola ejecucción
function eliminarTareasHechas(){
    // Obtener las tareas hechas
    const tareasEliminar = document.querySelectorAll('li.hecha')
    // Esta variable almacena la cantidad de tareas marcadas como hechas
    const cantidad = tareasEliminar.length
    
    // Valida si el usuario no registro ninguna tarea como hecha
    if (cantidad == 0){
        errorMsgEli.style.display = "block";
        return;
    }
    // Cambia el estado del error
    errorMsgEli.style.display = "none"

    // Confirmacion de cantidad de tareas a eliminar por parte del usuario
    if (confirm(`Se eliminaran ${cantidad} tareas hechas, ¿Deseas continuar?`)){
        // Elimina los li seleccionados
        tareasEliminar.forEach(li => {
            li.remove()
        })

        // Actualiza el contador
        totalTareas -= cantidad
        tareasHechas = 0
        spanTotal.textContent = totalTareas
        spanCompletadas.textContent = tareasHechas

        console.log('Tareas hechas eliminadas');
        }
}

btnBorrarTareas.onclick = eliminarTareasHechas;