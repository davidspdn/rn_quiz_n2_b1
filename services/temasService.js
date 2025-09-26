import { getDbConnection } from './dbservice.js';

export async function obtemTodosTemas() {
    var retorno = [];
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM Temas ORDER BY titulo');
    await dbCx.closeAsync();

    for (const registro of registros) {        
        let obj = {
            id: registro.id,
            titulo: registro.titulo,
            descricao: registro.descricao
        }
        retorno.push(obj);
    }

    return retorno;
}

export async function adicionaTema(tema) {    
    let dbCx = await getDbConnection();    
    let query = 'INSERT INTO Temas (titulo, descricao) VALUES (?,?)';
    const result = await dbCx.runAsync(query, [tema.titulo, tema.descricao]);    
    await dbCx.closeAsync();    
    return result.changes == 1;    
}

export async function alteraTema(tema) {
    let dbCx = await getDbConnection();
    let query = 'UPDATE Temas SET titulo=?, descricao=? WHERE id=?';
    const result = await dbCx.runAsync(query, [tema.titulo, tema.descricao, tema.id]);
    await dbCx.closeAsync();
    return result.changes == 1;
}

export async function excluiTema(id) {
    let dbCx = await getDbConnection();
    
    // Primeiro verificar se existem perguntas associadas ao tema
    let queryVerifica = 'SELECT COUNT(*) as total FROM Perguntas WHERE tema_id=?';
    const verificacao = await dbCx.getFirstAsync(queryVerifica, id);
    
    if (verificacao.total > 0) {
        await dbCx.closeAsync();
        throw new Error('Não é possível excluir o tema pois existem perguntas associadas a ele.');
    }
    
    let query = 'DELETE FROM Temas WHERE id=?';
    const result = await dbCx.runAsync(query, id);
    await dbCx.closeAsync();
    return result.changes == 1;    
}

export async function excluiTodosTemas() {
    let dbCx = await getDbConnection();
    
    // Primeiro excluir todas as perguntas para manter integridade referencial
    await dbCx.execAsync('DELETE FROM Perguntas');
    await dbCx.execAsync('DELETE FROM Temas');
    
    await dbCx.closeAsync();
}

export async function pesquisaTema(id) {
    let dbCx = await getDbConnection();
    let query = 'SELECT * FROM Temas WHERE id=?';
    const result = await dbCx.getFirstAsync(query, id);
    await dbCx.closeAsync();
    return result;
}

export async function pesquisaTemaPorTitulo(titulo) {
    let dbCx = await getDbConnection();
    let query = 'SELECT * FROM Temas WHERE titulo LIKE ?';
    const registros = await dbCx.getAllAsync(query, [`%${titulo}%`]);
    await dbCx.closeAsync();
    
    var retorno = [];
    for (const registro of registros) {        
        let obj = {
            id: registro.id,
            titulo: registro.titulo,
            descricao: registro.descricao
        }
        retorno.push(obj);
    }
    
    return retorno;
}