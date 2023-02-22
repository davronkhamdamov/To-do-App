const form = document.getElementById('form')
const wrap = document.querySelector('.card-body')
const active = document.getElementById('active')
const all = document.getElementById('all')
const complate = document.getElementById('complate')
const todopage = document.getElementById('todoPage')
const login = document.getElementById('login')
const localstr = localStorage.getItem('todo')

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

let local = localStorage.getItem('token')

if (!local) {
  localStorage.setItem('token', 'gettodoall')
}
fetch(`http://127.0.0.1:3030/${local}`)
  .then((res) => res.json())
  .then((data) => {
    writeUI(data)
    active.addEventListener('click', () => {
      localStorage.setItem('token', 'gettodoactive')
      window.location.reload()
    })
    complate.addEventListener('click', () => {
      localStorage.setItem('token', 'gettodocompl')
      window.location.reload()
    })
    all.addEventListener('click', () => {
      localStorage.setItem('token', 'gettodoall')
      window.location.reload()
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

if (localstr === 'login') {
  todopage.remove()
} else if (localstr === 'logout') {
  login.remove()
}
localStorage.setItem('todo', 'login')

// users

const signUpBtn = document.getElementById('signUpBtn')
loginBtn = document.getElementById('loginBtn')
emailSignUp = document.getElementById('emailSignUp')
passwordSignUp = document.getElementById('passwordSignUp')
password = document.getElementById('password')
email = document.getElementById('email')

//

signUpBtn.addEventListener('click', () => {
  // emailSignUp.value
})
