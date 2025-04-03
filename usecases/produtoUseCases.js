const { pool } = require('../config');
const Produto = require('../entities/produto')

const getProdutosBD = async () => {
    try{

        const { rows } = await pool.query('SELECT * FROM produtos ORDER BY nome');
        return rows.map((produto) => new Produto(produto.codigo, produto.nome));

    }catch (err){
        throw "ERRO: " + err;
    }
}

const addProdutoDB = async (body) => {
    try {
        const {nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria} = body

        const results = await pool.query(`INSERT into produtos (nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria)
                VALUES ($1, $2, $3, $4, $5, $6, $7) returning codigo, nome`,
            [nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria]);

            const produto = results.rows[0];
            return new Produto(produto.codigo, produto.nome);
    }catch (err) {
        throw "Erro ao adicionar o produto! " + err;
    }
}

const updateProdutoDB = async (body) => {
    try {
        
        const {codigo, nome} = body;
        const results = await pool.query(`UPDATE produtos set nome = $1 
            WHERE codigo = $2 returning codigo, nome`, [nome,codigo]);
        
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}
            para ser alterado`;
        }

        const produto = results.rows[0];
        return new Produto(produto.codigo, produto.nome);

    } catch (err) {
        throw "Erro ao alterar o produto!" + err;
    }
}

const deleteProdutoDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM produtos where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Produto removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o produto: " + err;
    }     
}

const getProdutoPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM produtos where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const produto = results.rows[0];
            return new Produto(produto.codigo, produto.nome); 
        }       
    } catch (err) {
        throw "Erro ao recuperar o produto: " + err;
    }     
}

module.exports = {
    getProdutosBD, addProdutoDB, updateProdutoDB, 
    deleteProdutoDB, getProdutoPorCodigoDB
}

