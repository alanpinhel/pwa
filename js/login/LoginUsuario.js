let logado = JSON.parse(localStorage.getItem('logado'))
let usuario
let login = new EventEmitter2();

LoginUsuario_render({
  logado,
  usuario: localStorage.getItem('nomeUsuario'),
  onLogin: (nomeUsuario) => {
    logado = true
    localStorage.setItem('logado', logado)
    localStorage.setItem('nomeUsuario', nomeUsuario)
    usuario = nomeUsuario
    login.emit('login')
  },
  onLogout: () => {
    logado = false
    localStorage.setItem('logado', logado)
    localStorage.removeItem('nomeUsuario')
    login.emit('logout')
  }
})