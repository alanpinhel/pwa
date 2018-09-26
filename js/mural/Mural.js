const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = (JSON.parse(localStorage.getItem('cartoes')) || [])
        .map(({conteudo, tipo}) => new Cartao(conteudo, tipo))
    
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});

    render()

    Filtro.on("filtrado", render)

    function salvaCartoes() {
        localStorage.setItem('cartoes', JSON.stringify(cartoes.map(
            ({conteudo, tipo}) => ({ conteudo, tipo })
        )))
    }

    function adiciona(cartao){
        if (!logado) {
            return false
        }
        
        cartoes.push(cartao)
        salvaCartoes()
        cartao.on("mudanca.**", render)
        cartao.on("remocao", ()=>{
            cartoes = cartoes.slice(0)
            cartoes.splice(cartoes.indexOf(cartao),1)
            render()
        })
        render()
        return true
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
