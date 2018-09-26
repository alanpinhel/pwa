const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = pegaCartoesUsuario()
    cartoes.forEach(preparaCartao)

    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
  
    render()

    Filtro.on("filtrado", render)
  
    login.on('login', () => {
        cartoes = pegaCartoesUsuario()
        render()
    })

    login.on('logout', () => {
        cartoes = []
        render()
    })

    function pegaCartoesUsuario() {
        return (JSON.parse(localStorage.getItem(usuario)) || [])
            .map(({conteudo, tipo}) => new Cartao(conteudo, tipo))
    }

    function preparaCartao(cartao) {
        cartao.on("mudanca.**", salvaCartoes)
        cartao.on("remocao", () => {
            cartoes = [].concat(cartoes)
            cartoes.splice(cartoes.indexOf(cartao), 1)
            salvaCartoes()
            render()
        })
    }

    function salvaCartoes() {
        localStorage.setItem(usuario, JSON.stringify(cartoes.map(
            ({conteudo, tipo}) => ({ conteudo, tipo })
        )))
    }

    function adiciona(cartao){
        if (!logado) {
            return false
        }
        
        cartoes.push(cartao)
        salvaCartoes()
        cartao.on("mudanca.**", () => render)
        preparaCartao(cartao)
        render()
        return true
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
