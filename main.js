const localstr = localStorage.getItem('todo')
const login = document.getElementById('login')
const todopage = document.getElementById('todoPage')

if (localstr === 'login') {
  todopage.remove()

  //

  const signUpBtn = document.getElementById('signUpBtn')
  loginBtn = document.getElementById('loginBtn')
  emailSignUp = document.getElementById('emailSignUp')
  passwordSignUp = document.getElementById('passwordSignUp')
  password = document.getElementById('password')
  email = document.getElementById('email')

  //

  const wrapper = document.querySelector('.wrapper'),
    signupHeader = document.querySelector('.signup header'),
    loginHeader = document.querySelector('.login header')

  loginHeader.addEventListener('click', () => {
    wrapper.classList.add('active')
  })
  signupHeader.addEventListener('click', () => {
    wrapper.classList.remove('active')
  })
  const f = localStorage.getItem('isRegister')

  if (f === 'true') {
    wrapper.classList.add('active')
  } else if (f === 'false') {
    wrapper.classList.remove('active')
  }

  //

  signUpBtn.addEventListener('click', () => {
    if (emailSignUp.value.length > 4 && passwordSignUp.value.length > 4) {
      fetch('http://127.0.0.1:3030/create_usr', {
        method: 'POST',
        body: JSON.stringify({
          email: emailSignUp.value,
          password: passwordSignUp.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 'ok') {
            alert('You are succes registered')
            localStorage.setItem('tokenUser', data.token)
            localStorage.setItem('isRegister', 'true')
          } else if (data.message === 'error') {
            alert('This user already added')
          }
        })
    } else {
      alert(
        `${email.value.length < 4 ? 'Email ' : ''}${
          password.value.length < 4 ? 'Password ' : ''
        }` + '4 tadan kam bolmasin',
      )
    }
  })

  loginBtn.addEventListener('click', () => {
    if (email.value.length > 4 && password.value.length > 4) {
      fetch('http://127.0.0.1:3030/login', {
        method: 'POST',
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })
        .then((res) => res.json())
        .then((message) => {
          if (message.message === 'success') {
            alert('succes')
            localStorage.setItem('todo', 'logout')
            localStorage.setItem('isRegister', 'false')
            location.reload()
          } else if (message.message === 'password wrong') {
            alert(message.message)
          } else if (message.message === 'User not found') {
            alert(message.message)
          }
        })
    } else {
      alert(
        `${email.value.length < 4 ? 'Email ' : ''}${
          password.value.length < 4 ? 'Password ' : ''
        }` + '4 tadan kam bolmasin',
      )
    }
  })
} else if (localstr === 'logout') {
  login.remove()

  const form = document.getElementById('form')
  const wrap = document.querySelector('.card-body')
  const active = document.getElementById('active')
  const all = document.getElementById('all')
  const complate = document.getElementById('complate')
  const logout = document.getElementById('logout')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    let value = e.target.value.value
    fetch('http://127.0.0.1:3030/createtodo', {
      method: 'POST',
      body: JSON.stringify({
        value,
        token: localStorage.getItem('tokenUser'),
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
  fetch(`http://127.0.0.1:3030/${local}`, {
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('tokenUser'),
    }),
  })
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

  function fetchData(data) {
    fetch('http://127.0.0.1:3030/updatetodo', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
} else {
  localStorage.setItem('todo', 'login')
}

// users
