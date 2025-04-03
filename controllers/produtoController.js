const { getProdutosBD, addProdutoDB, updateProdutoDB, 
    deleteProdutoDB, getProdutoPorCodigoDB } = require('../usecases/produtoUseCases');

const getProdutos = async (request, response) => {
    await getProdutosBD()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json ({
            status: 'error',
            message : 'Erro ao consultar os produtos: ' + err
        }))
}

const addProduto = async (request, response) => {
    await addProdutoDB(request.body)
        .then(data => response.status(200).json({
            "status" : "success" , "message" : "Produto Criado",
            "objeto" : data
        }))
        .catch(err => response.status(400).json ({
            status: 'error',
            message : err
        }))
}

const updateProduto = async (request, response) => {
    await updateProdutoDB(request.body)
        .then(data => response.status(200).json({
            "status" : "success" , "message" : "Produto atualizado",
            "objeto" : data
        }))
        .catch(err => response.status(400).json ({
            status: 'error',
            message : err
        }))
}

const deleteProduto = async (request, response) => {
    await deleteProdutoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getProdutoPorCodigo= async (request, response) => {
    await getProdutoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}





module.exports = {
    getProdutos, addProduto, updateProduto, deleteProduto, getProdutoPorCodigo
}