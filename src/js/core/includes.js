import $ from 'jquery'

// Esse arry de callbacks será chamado quando uma requisição for feita de forma bem sucessida
const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}

// Essa função lerá todos os atributos que possuírem a proprieda personalizada "wm-include"
// presente no index.html , então o parent passado como parâmetro nessa função são todas as tags que 
// possuem essa propiedade
function load_includes(parent){
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i,e){
        // Atribuí a constante url o valor do atributo "wm-include"
        const url = $(e).attr('wm-include')
        
        // Uma vez que já tenho a url, fiz uma chamada ajax passando como parâmetro a url e uma
        // callback para quando a requisição for feita de forma bem sucessida.
        $.ajax({
            url,
            success(data){
                // pego o elemento atual e chamar a função html e setar o data dentro do html
                $(e).html(data)
                // logo depois excluí essa propriedade para que não haja nenhuma interpretação nova-
                //mente dela
                $(e).removeAttr('wm-include')

                loadHtmlSuccessCallbacks.forEach(
                    callback => callback(data))
                // Chamei a função load_include pelo fato dessa função ser recursiva
                load_includes(e)
            }
        })
    })
}

// Para invocar ela pela primeira vez, basta chamá-la passando vazio como parâmetro, porque daí ele 
// vai passar o body como primeiro parent
load_includes()