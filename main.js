const form = document.getElementById('form')
const wrap = document.querySelector('.card-body')
const active = document.getElementById('active')
const all = document.getElementById('all')
const complate = document.getElementById('complate')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let value = e.target.value.value
  fetch('http://127.0.0.1:3030/createtodo', {
    method: 'POST',
    body: JSON.stringify({
      value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const check = data.find((e) => 'error' === e && alert('error'))
      if (check) {
        writeUI(data)
      } else {
        alert('This to do already added')
      }
    })
})

let dataq = []
fetch('http://127.0.0.1:3030/gettodo')
  .then((res) => res.json())
  .then((data) => {
    writeUI(data)
    active.addEventListener('click', () => {
      let filter = data.filter((e) => !e.isComplate && e)
      dataq = filter
      writeUI(dataq)
    })
    complate.addEventListener('click', () => {
      let filter = data.filter((e) => e.isComplate && e)
      dataq = filter
      writeUI(dataq)
    })
    all.addEventListener('click', () => {
      dataq = data
      writeUI(dataq)
    })
  })

function writeUI(data) {
  wrap.innerHTML = ''
  data?.forEach((e) => {
    let card = document.createElement('div')
    card.innerHTML = `
    <div class="todo-list">
      <div class="todo-item">
      <div class="checker">
      <span>
        <input class="check" name='${e.todo}' type="checkbox" ${
      e.isComplate && 'checked'
    } />
      </span>
      </div>
        <span>${e?.todo}</span>
      <a
      href="javascript:void(0);"
      class="float-right remove-todo-item"
      >
      <i class="fa-solid fa-trash"></i>
      </a>
    </div>
  </div>`
    wrap.appendChild(card)
  })
  let check = document.querySelectorAll('.check')
  check.forEach((e) => {
    e.addEventListener('click', (e) => {
      fetchData(e.target.name, e)
    })
  })
}

function fetchData(data, w) {
  console.log(data)
  fetch('http://127.0.0.1:3030/updatetodo', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
