const { pool } = require('../config');
const Categoria = require('../entities/categoria');

//ASYNC PARA NAO TRAVAR O PROCESSAMENTO
const getCategoriasDB = async () => {
    try {

        const { rows } = await pool.query('SELECT * from categorias ORDER BY nome');
        return rows.map((categoria) => new Categoria(categoria.codigo, categoria.nome));

    }catch (err) {
        throw "ERRO: " + err;
    }
}

const addCategoriaDB = async (body) => {
    try {
        
        const {nome} = body;
        const results = await pool.query(`INSERT into categorias (nome) 
            VALUES ($1) returning codigo, nome`, [nome]);

        const categoria = results.rows[0];
        return new Categoria(categoria.codigo, categoria.nome);

    } catch (err) {
        throw "Erro ao inserir a categoria!" + err;
    }
}

const updateCategoriaDB = async (body) => {
    try {
        
        const {codigo, nome} = body;
        const results = await pool.query(`UPDATE categorias set nome = $1 
            WHERE codigo = $2 returning codigo, nome`, [nome,codigo]);
        
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}
            para ser alterado`;
        }

        const categoria = results.rows[0];
        return new Categoria(categoria.codigo, categoria.nome);

    } catch (err) {
        throw "Erro ao alterar a categoria!" + err;
    }
}


const deleteCategoriaDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM categorias where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Categoria removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a categoria: " + err;
    }     
}

const getCategoriaPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM categorias where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const categoria = results.rows[0];
            return new Categoria(categoria.codigo, categoria.nome); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a categoria: " + err;
    }     
}



module.exports = { 
    getCategoriasDB, addCategoriaDB, updateCategoriaDB, 
    getCategoriaPorCodigoDB, deleteCategoriaDB
}