import { getDbConnection } from './dbservice.js';

export async function obtemTodasAlternativas() {
    var retorno = [];
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM Alternativa ORDER BY id');
    await dbCx.closeAsync();

    for (const registro of registros) {        
        let obj = {
            id: registro.id,
            descricao: registro.descricao
        }
        retorno.push(obj);
    }

    return retorno;
}

export async function adicionaAlternativa(alternativa) {    
    let dbCx = await getDbConnection();    
    let query = 'INSERT INTO Alternativa (descricao) VALUES (?)';
    const result = await dbCx.runAsync(query, [alternativa.descricao]);    
    await dbCx.closeAsync();    
    return {
        sucesso: result.changes == 1,
        id: result.lastInsertRowId
    };    
}

export async function alteraAlternativa(alternativa) {
    let dbCx = await getDbConnection();
    let query = 'UPDATE Alternativa SET descricao=? WHERE id=?';
    const result = await dbCx.runAsync(query, [alternativa.descricao, alternativa.id]);
    await dbCx.closeAsync();
    return result.changes == 1;
}

export async function excluiAlternativa(id) {
    let dbCx = await getDbConnection();
    
    // Verificar se a alternativa está sendo usada em alguma pergunta
    let queryVerifica = `SELECT COUNT(*) as total FROM Perguntas 
                        WHERE alternativa1_id=? OR alternativa2_id=? OR 
                              alternativa3_id=? OR alternativa4_id=? OR 
                              alternativa_correta_id=?`;
    const verificacao = await dbCx.getFirstAsync(queryVerifica, [id, id, id, id, id]);
    
    if (verificacao.total > 0) {
        await dbCx.closeAsync();
        throw new Error('Não é possível excluir a alternativa pois ela está sendo usada em perguntas.');
    }
    
    let query = 'DELETE FROM Alternativa WHERE id=?';
    const result = await dbCx.runAsync(query, id);
    await dbCx.closeAsync();
    return result.changes == 1;    
}

export async function excluiTodasAlternativas() {
    let dbCx = await getDbConnection();
    
    // Primeiro excluir todas as perguntas para manter integridade referencial
    await dbCx.execAsync('DELETE FROM Perguntas');
    await dbCx.execAsync('DELETE FROM Alternativa');
    
    await dbCx.closeAsync();
}

export async function pesquisaAlternativa(id) {
    let dbCx = await getDbConnection();
    let query = 'SELECT * FROM Alternativa WHERE id=?';
    const result = await dbCx.getFirstAsync(query, id);
    await dbCx.closeAsync();
    return result;
}

export async function pesquisaAlternativaPorDescricao(descricao) {
    let dbCx = await getDbConnection();
    let query = 'SELECT * FROM Alternativa WHERE descricao LIKE ?';
    const registros = await dbCx.getAllAsync(query, [`%${descricao}%`]);
    await dbCx.closeAsync();
    
    var retorno = [];
    for (const registro of registros) {        
        let obj = {
            id: registro.id,
            descricao: registro.descricao
        }
        retorno.push(obj);
    }
    
    return retorno;
}

export async function obtemAlternativasPorIds(ids) {
    if (!ids || ids.length === 0) return [];
    
    let dbCx = await getDbConnection();
    const placeholders = ids.map(() => '?').join(',');
    let query = `SELECT * FROM Alternativa WHERE id IN (${placeholders})`;
    const registros = await dbCx.getAllAsync(query, ids);
    await dbCx.closeAsync();
    
    var retorno = [];
    for (const registro of registros) {        
        let obj = {
            id: registro.id,
            descricao: registro.descricao
        }
        retorno.push(obj);
    }
    
    return retorno;
}