import { getDbConnection } from './dbservice.js';

export async function obtemTodasAlternativas() {
    var retorno = [];
    var dbCx = null;
    
    try {
        dbCx = await getDbConnection();
        const registros = await dbCx.getAllAsync('SELECT * FROM Alternativa ORDER BY id');

        for (const registro of registros) {        
            let obj = {
                id: registro.id,
                descricao: registro.descricao
            }
            retorno.push(obj);
        }

        return retorno;
        
    } catch (error) {
        console.error('Erro ao obter alternativas:', error);
        return [];
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function adicionaAlternativa(alternativa) {
    let dbCx = null;
    
    try {
        if (!alternativa || !alternativa.descricao) {
            throw new Error('Dados da alternativa são obrigatórios');
        }
        
        dbCx = await getDbConnection();
        let query = 'INSERT INTO Alternativa (descricao) VALUES (?)';
        const result = await dbCx.runAsync(query, [alternativa.descricao.trim()]);
        
        return {
            sucesso: result.changes == 1,
            id: result.lastInsertRowId
        };
        
    } catch (error) {
        console.error('Erro ao adicionar alternativa:', error);
        throw error;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function alteraAlternativa(alternativa) {
    let dbCx = null;
    
    try {
        if (!alternativa || !alternativa.id || !alternativa.descricao) {
            throw new Error('Dados da alternativa são obrigatórios para alteração');
        }
        
        dbCx = await getDbConnection();
        let query = 'UPDATE Alternativa SET descricao=? WHERE id=?';
        const result = await dbCx.runAsync(query, [alternativa.descricao.trim(), alternativa.id]);
        
        return result.changes == 1;
        
    } catch (error) {
        console.error('Erro ao alterar alternativa:', error);
        throw error;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function excluiAlternativa(id) {
    let dbCx = null;
    
    try {
        if (!id || id <= 0) {
            throw new Error('ID da alternativa é obrigatório para exclusão');
        }
        
        dbCx = await getDbConnection();
        
        // Verificar se a alternativa está sendo usada em alguma pergunta
        let queryVerifica = `SELECT COUNT(*) as total FROM Perguntas 
                            WHERE alternativa1_id=? OR alternativa2_id=? OR 
                                  alternativa3_id=? OR alternativa4_id=? OR 
                                  alternativa_correta_id=?`;
        const verificacao = await dbCx.getFirstAsync(queryVerifica, [id, id, id, id, id]);
        
        if (verificacao && verificacao.total > 0) {
            throw new Error('Não é possível excluir a alternativa pois ela está sendo usada em perguntas.');
        }
        
        let query = 'DELETE FROM Alternativa WHERE id=?';
        const result = await dbCx.runAsync(query, [id]);
        
        return result.changes == 1;
        
    } catch (error) {
        console.error('Erro ao excluir alternativa:', error);
        throw error;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function excluiTodasAlternativas() {
    let dbCx = null;
    
    try {
        dbCx = await getDbConnection();
        
        // Primeiro excluir todas as perguntas para manter integridade referencial
        await dbCx.execAsync('DELETE FROM Perguntas');
        await dbCx.execAsync('DELETE FROM Alternativa');
        
        console.log('Todas as alternativas e perguntas foram excluídas');
        
    } catch (error) {
        console.error('Erro ao excluir todas alternativas:', error);
        throw error;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function pesquisaAlternativa(id) {
    let dbCx = null;
    
    try {
        if (!id || id <= 0) {
            return null;
        }
        
        dbCx = await getDbConnection();
        let query = 'SELECT * FROM Alternativa WHERE id=?';
        const result = await dbCx.getFirstAsync(query, [id]);
        
        return result || null;
        
    } catch (error) {
        console.error('Erro ao pesquisar alternativa:', error);
        return null;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function pesquisaAlternativaPorDescricao(descricao) {
    let dbCx = null;
    
    try {
        if (!descricao || descricao.trim() === '') {
            return [];
        }
        
        dbCx = await getDbConnection();
        let query = 'SELECT * FROM Alternativa WHERE descricao LIKE ?';
        const registros = await dbCx.getAllAsync(query, [`%${descricao.trim()}%`]);
        
        var retorno = [];
        if (registros && Array.isArray(registros)) {
            for (const registro of registros) {        
                let obj = {
                    id: registro.id,
                    descricao: registro.descricao
                }
                retorno.push(obj);
            }
        }
        
        return retorno;
        
    } catch (error) {
        console.error('Erro ao pesquisar alternativa por descrição:', error);
        return [];
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function obtemAlternativasPorIds(ids) {
    let dbCx = null;
    
    try {
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return [];
        }
        
        // Filtrar apenas IDs válidos
        const idsValidos = ids.filter(id => id && Number.isInteger(Number(id)) && Number(id) > 0);
        
        if (idsValidos.length === 0) {
            return [];
        }
        
        dbCx = await getDbConnection();
        const placeholders = idsValidos.map(() => '?').join(',');
        let query = `SELECT * FROM Alternativa WHERE id IN (${placeholders})`;
        const registros = await dbCx.getAllAsync(query, idsValidos);
        
        var retorno = [];
        if (registros && Array.isArray(registros)) {
            for (const registro of registros) {        
                let obj = {
                    id: registro.id,
                    descricao: registro.descricao
                }
                retorno.push(obj);
            }
        }
        
        return retorno;
        
    } catch (error) {
        console.error('Erro ao obter alternativas por IDs:', error);
        return [];
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}