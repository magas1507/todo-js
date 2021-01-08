const formulario = document.getElementById('formulario')
const listaTarea = document.getElementById('lista-tareas');
const input = document.getElementById('input')

//cada vez que usamos un templete accedo a su contenido 
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
let tareas = {
  1605990629039:{
    id: 1605990629039,
    texto: 'Tarea #1',
    estado: false
  },
  1605990682337:{
    id: 1605990682337,
    texto: 'Tarea #2',
    estado: false
  }
}

//console.log(Date.now())
//mostrar tareas ya agregadas y verificar que todo el dom este cargado

document.addEventListener('DOMContentLoaded', () => {
  pintarTareas()
})

listaTarea.addEventListener('click', (e) => {btnAccion(e)})

formulario.addEventListener('submit', e => {
  
  e.preventDefault()
  //maneras de tomar el valor del imput
  /* console.log(e.target[0].value)
  console.log(e.target.querySelector('input').value)
  console.log(input.value)
   */
  setTarea(e)
})

const setTarea = e => {
  const texto = e.target.querySelector('input').value
    
  if (texto.trim() === '') {
      console.log('está vacio')
      return
  }
  
  const tarea = {
      id: Date.now(),
      texto: texto,
      estado: true
  }

  console.log('constante tarea',tarea)

  //agregamos la tarea
  tareas[tarea.id] = tarea
  console.log('la tare a fue agregada',tareas)
  
  //para que se borre luego de que escribo 
  
  formulario.reset()
  pintarTareas()
  e.target.querySelector('input').focus()
}

 const pintarTareas = () =>{
   //limpiamos para evitar repetir
   console.log('entra a pintar tareas ')
   listaTarea.innerHTML = ""

  Object.values(tareas).forEach(tarea => {
    //para pintar hay que realizar el clone en el template
    
     const clone = template.cloneNode(true)
     console.log('imprimo el clone del tmplate ',clone)
     clone.querySelector('p').textContent = tarea.texto
      console.log('imprimo el parrafo ',  clone.querySelector('p').textContent = tarea.texto)
     clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
     console.log( 'dataset 1', clone.querySelectorAll('.fas')[0].dataset.id = tarea.id)
     console.log( 'dataset 1', clone.querySelectorAll('.fas')[0].dataset.estado = tarea.estado)
    // clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
     //console.log( 'dataset 2', clone.querySelectorAll('.fas')[1].dataset.id = tarea.id)
     fragment.appendChild(clone)
  })
  //evitar el reflow
  listaTarea.appendChild(fragment) 
 }

 const btnAccion = e => {
   console.log("entra al btnaccion")
    //console.log(e.target.classList.contains('fa-check-circle'))
  
    if (e.target.classList.contains('fa-check-circle')) {
      console.log('estado',tareas[e.target.dataset.id].estado = true)
      tareas[e.target.dataset.id].estado = true
      pintarTareas()
  }
    //evita que si tengo otros addListener se activen, solo los que estan drentro del contenedor
    e.stopPropagation()
 }