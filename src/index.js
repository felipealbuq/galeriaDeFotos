// Arquivos SASS
// Com o index.scss já definido, importei o arquivo aqui para que o webpack consiga monitorar 
//esses arquivos e gerar o arquvis css final
import './scss/index.scss'

// Dependências
// Com o include JS já implementado, há a necessidade de referenciar aqui nesse arquivo index.js para
// que de fato ele possa ser "encontrado"
import 'jquery'
import 'bootstrap'

// Meus arquivos JS
import './js/core/includes'
import './js/plugins/city_buttons'