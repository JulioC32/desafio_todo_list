const listaTareas = document.getElementById('listaTareas');
const inputTarea = document.getElementById('nuevaTarea');
const btnAgregar = document.getElementById('agregarTarea');
const spanTotal = document.getElementById('totalTareas');
const spanRealizadas = document.getElementById('tareasRealizadas');


const tareas = [
    { id: 1, descripcion: "Hacer mercado", completada: false },
    { id: 2, descripcion: "Estudiar para la prueba", completada: false },
    { id: 3, descripcion: "Sacar a pasear a Tobby", completada: false }
];


function renderizarTareas() {
    listaTareas.innerHTML = '';
    tareas.forEach(tarea => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-container';
        taskDiv.innerHTML = `
            <div>${tarea.id}</div>
            <div class="${tarea.completada ? 'completed' : ''}">${tarea.descripcion}</div>
            <div>
                <input type="checkbox"
                       ${tarea.completada ? 'checked' : ''}
                       onchange="toggleTarea(${tarea.id})">
            </div>
            <div>
                <button class="btn-eliminar" onclick="eliminarTarea(${tarea.id})">×</button>
            </div>
        `;
        listaTareas.appendChild(taskDiv);
    });
    actualizarContadores();
}


function obtenerSiguienteId() {
    return tareas.length > 0 ? Math.max(...tareas.map(tarea => tarea.id)) + 1 : 1;
}

// Función para agregar una nueva tarea
function agregarTarea() {
    const descripcion = inputTarea.value.trim();
    if (descripcion) {
        const nuevaTarea = {
            id: obtenerSiguienteId(),
            descripcion: descripcion,
            completada: false
        };
        tareas.push(nuevaTarea);
        inputTarea.value = '';
        renderizarTareas();
    }
}


function eliminarTarea(id) {
    const index = tareas.findIndex(tarea => tarea.id === id);
    if (index !== -1) { 
        tareas.splice(index, 1);
        renderizarTareas();
    }
}


function toggleTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        renderizarTareas();
    }
}


function actualizarContadores() {
    spanTotal.textContent = tareas.length;
    const realizadas = tareas.filter(tarea => tarea.completada).length;
    spanRealizadas.textContent = realizadas;
}


btnAgregar.addEventListener('click', agregarTarea);
inputTarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});

renderizarTareas();