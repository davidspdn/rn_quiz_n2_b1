import { getDbConnection } from './dbservice.js';
import { pesquisaTema } from './temasService.js';
import { obtemAlternativasPorIds } from './alternativasService.js';

export async function obtemTodasPerguntas() {
    var retorno = [];
    var dbCx = null;
    
    try {
        dbCx = await getDbConnection();
        const registros = await dbCx.getAllAsync(`
            SELECT p.*, t.titulo as tema_titulo 
            FROM Perguntas p 
            INNER JOIN Temas t ON p.tema_id = t.id 
            ORDER BY t.titulo, p.id
        `);

        if (registros && Array.isArray(registros)) {
            for (const registro of registros) {        
                let obj = {
                    id: registro.id,
                    tema_id: registro.tema_id,
                    tema_titulo: registro.tema_titulo,
                    descricao: registro.descricao,
                    alternativa1_id: registro.alternativa1_id,
                    alternativa2_id: registro.alternativa2_id,
                    alternativa3_id: registro.alternativa3_id,
                    alternativa4_id: registro.alternativa4_id,
                    alternativa_correta_id: registro.alternativa_correta_id
                }
                retorno.push(obj);
            }
        }

        return retorno;
        
    } catch (error) {
        console.error('Erro ao obter todas perguntas:', error);
        return [];
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function obtemPerguntasPorTema(tema_id) {
    var retorno = [];
    var dbCx = null;
    
    try {
        if (!tema_id || tema_id <= 0) {
            return [];
        }
        
        dbCx = await getDbConnection();
        const registros = await dbCx.getAllAsync(`
            SELECT p.*, t.titulo as tema_titulo 
            FROM Perguntas p 
            INNER JOIN Temas t ON p.tema_id = t.id 
            WHERE p.tema_id = ?
            ORDER BY p.id
        `, [tema_id]);

        if (registros && Array.isArray(registros)) {
            for (const registro of registros) {        
                let obj = {
                    id: registro.id,
                    tema_id: registro.tema_id,
                    tema_titulo: registro.tema_titulo,
                    descricao: registro.descricao,
                    alternativa1_id: registro.alternativa1_id,
                    alternativa2_id: registro.alternativa2_id,
                    alternativa3_id: registro.alternativa3_id,
                    alternativa4_id: registro.alternativa4_id,
                    alternativa_correta_id: registro.alternativa_correta_id
                }
                retorno.push(obj);
            }
        }

        return retorno;
        
    } catch (error) {
        console.error('Erro ao obter perguntas por tema:', error);
        return [];
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function adicionaPergunta(pergunta) {    
    let dbCx = await getDbConnection();
    
    // Verificar se o tema existe
    const tema = await pesquisaTema(pergunta.tema_id);
    if (!tema) {
        await dbCx.closeAsync();
        throw new Error('Tema não encontrado.');
    }
    
    // Verificar se todas as alternativas existem
    const alternativasIds = [
        pergunta.alternativa1_id,
        pergunta.alternativa2_id,  
        pergunta.alternativa3_id,
        pergunta.alternativa4_id
    ];
    
    const alternativas = await obtemAlternativasPorIds(alternativasIds);
    if (alternativas.length !== 4) {
        await dbCx.closeAsync();
        throw new Error('Uma ou mais alternativas não foram encontradas.');
    }
    
    // Verificar se a alternativa correta está entre as alternativas da pergunta
    if (!alternativasIds.includes(pergunta.alternativa_correta_id)) {
        await dbCx.closeAsync();
        throw new Error('A alternativa correta deve estar entre as alternativas da pergunta.');
    }
    
    let query = `INSERT INTO Perguntas 
                (tema_id, descricao, alternativa1_id, alternativa2_id, 
                 alternativa3_id, alternativa4_id, alternativa_correta_id) 
                VALUES (?,?,?,?,?,?,?)`;
    
    const result = await dbCx.runAsync(query, [
        pergunta.tema_id, 
        pergunta.descricao,
        pergunta.alternativa1_id,
        pergunta.alternativa2_id,
        pergunta.alternativa3_id,
        pergunta.alternativa4_id,
        pergunta.alternativa_correta_id
    ]);    
    
    await dbCx.closeAsync();    
    return result.changes == 1;    
}

export async function alteraPergunta(pergunta) {
    let dbCx = await getDbConnection();
    
    // Verificar se o tema existe
    const tema = await pesquisaTema(pergunta.tema_id);
    if (!tema) {
        await dbCx.closeAsync();
        throw new Error('Tema não encontrado.');
    }
    
    // Verificar se todas as alternativas existem
    const alternativasIds = [
        pergunta.alternativa1_id,
        pergunta.alternativa2_id,  
        pergunta.alternativa3_id,
        pergunta.alternativa4_id
    ];
    
    const alternativas = await obtemAlternativasPorIds(alternativasIds);
    if (alternativas.length !== 4) {
        await dbCx.closeAsync();
        throw new Error('Uma ou mais alternativas não foram encontradas.');
    }
    
    // Verificar se a alternativa correta está entre as alternativas da pergunta
    if (!alternativasIds.includes(pergunta.alternativa_correta_id)) {
        await dbCx.closeAsync();
        throw new Error('A alternativa correta deve estar entre as alternativas da pergunta.');
    }
    
    let query = `UPDATE Perguntas SET 
                tema_id=?, descricao=?, alternativa1_id=?, alternativa2_id=?, 
                alternativa3_id=?, alternativa4_id=?, alternativa_correta_id=? 
                WHERE id=?`;
    
    const result = await dbCx.runAsync(query, [
        pergunta.tema_id, 
        pergunta.descricao,
        pergunta.alternativa1_id,
        pergunta.alternativa2_id,
        pergunta.alternativa3_id,
        pergunta.alternativa4_id,
        pergunta.alternativa_correta_id,
        pergunta.id
    ]);
    
    await dbCx.closeAsync();
    return result.changes == 1;
}

export async function excluiPergunta(id) {
    let dbCx = null;
    
    try {
        if (!id || id <= 0) {
            throw new Error('ID da pergunta é obrigatório para exclusão');
        }
        
        dbCx = await getDbConnection();
        let query = 'DELETE FROM Perguntas WHERE id=?';
        const result = await dbCx.runAsync(query, [id]);
        
        return result.changes == 1;
        
    } catch (error) {
        console.error('Erro ao excluir pergunta:', error);
        throw error;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function excluiTodasPerguntas() {
    let dbCx = null;
    
    try {
        dbCx = await getDbConnection();
        await dbCx.execAsync('DELETE FROM Perguntas');
        console.log('Todas as perguntas foram excluídas');
        
    } catch (error) {
        console.error('Erro ao excluir todas perguntas:', error);
        throw error;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function pesquisaPergunta(id) {
    let dbCx = null;
    
    try {
        if (!id || id <= 0) {
            return null;
        }
        
        dbCx = await getDbConnection();
        let query = `
            SELECT p.*, t.titulo as tema_titulo 
            FROM Perguntas p 
            INNER JOIN Temas t ON p.tema_id = t.id 
            WHERE p.id=?
        `;
        const result = await dbCx.getFirstAsync(query, [id]);
        
        return result || null;
        
    } catch (error) {
        console.error('Erro ao pesquisar pergunta:', error);
        return null;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function obtemPerguntaCompleta(id) {
    const pergunta = await pesquisaPergunta(id);
    if (!pergunta) return null;
    
    // Buscar as alternativas da pergunta
    const alternativasIds = [
        pergunta.alternativa1_id,
        pergunta.alternativa2_id,
        pergunta.alternativa3_id,
        pergunta.alternativa4_id
    ];
    
    const alternativas = await obtemAlternativasPorIds(alternativasIds);
    
    return {
        ...pergunta,
        alternativas: alternativas
    };
}

export async function verificaResposta(perguntaId, alternativaId) {
    const pergunta = await pesquisaPergunta(perguntaId);
    if (!pergunta) {
        throw new Error('Pergunta não encontrada.');
    }
    
    return pergunta.alternativa_correta_id === alternativaId;
}