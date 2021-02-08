/*
    TODO
    add location finder
    change pic on time of day
*/

const dateOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
}

document.getElementById('date').innerHTML = new Date().toLocaleDateString('en-US', dateOptions)


const add = document.getElementById('add')
const list = document.getElementById('list')
const input = document.getElementById('input')


function addTask(task, id, done, bin) {
    if (bin) return

    const mark = done ? 'lineThrough' : ''
    const completed = done ? 'fa-check-circle' : 'fa-circle-thin'
    
    const item = 
        `<li class="item" id="task-number-${id}">
            <i class="fa ${completed} co complete" id="${id}"></i>
            <p class="text ${mark}">${task}</p>
            <i class="fa fa-trash-o de delete" id="${id}"></i>
        </li>
        `

    list.insertAdjacentHTML('beforeend', item)
}


var id = 0, activeTasks = [] 
var data = localStorage.getItem('Task')

if (data) {
    activeTasks = JSON.parse(data)
    id = activeTasks.length
    loadList(activeTasks)
} else {
    id = 0
    activeTasks = []
}

function loadList(arr) {
    arr.forEach((item) => {
        addTask(item.task, item.id, item.done, item.bin)
    })
}


document.querySelector('.clear').addEventListener('click', () => {
    if (document.getElementsByClassName('item').length > 0) {
        if (window.confirm('Task list will be deleted')) {
            localStorage.clear()
            location.reload()
        }
    }
})


add.addEventListener('click', displayTask)
document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        displayTask()
    }
})


function displayTask() {
    let task = input.value
    if (task) {
        addTask(task, id, false, false)
        activeTasks.push({
            task: task,
            id: id,
            done: false,
            bin: false
        })
        localStorage.setItem('Task', JSON.stringify(activeTasks))
        id++
    } else {
        input.placeholder = '( ͠ಠ ͜ʖ ͠ಠ ) Task can\'t be empty!'
        setTimeout(() => { 
            input.placeholder = 'Add Task'
        }, 2400)
    }
    input.value = ''
    console.log(activeTasks)
}

function completeTask(element) {
    element.classList.toggle('fa-check-circle')
    element.classList.toggle('fa-circle-thin')
    element.parentNode.querySelector('.text').classList.toggle('lineThrough')
    activeTasks[element.id].done = activeTasks[element.id].done ? false : true
}

function deleteTask(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    activeTasks[element.id].bin = true
}

list.addEventListener('click', (event) => {
    let element = event.target

    if (element.attributes.class.value.includes('complete')) {
        completeTask(element)
    } else if (element.attributes.class.value.includes('delete')) {
        deleteTask(element)
    }

    localStorage.setItem('Task', JSON.stringify(activeTasks))
})