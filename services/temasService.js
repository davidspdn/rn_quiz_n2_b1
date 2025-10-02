import { getDbConnection } from './dbservice.js';

export async function obtemTodosTemas() {
    var retorno = [];
    var dbCx = null;
    
    try {
        dbCx = await getDbConnection();
        console.log('Conectado ao banco para obter temas');
        
        // Verificar se a tabela Temas existe
        const tabelaExiste = await dbCx.getFirstAsync(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='Temas'"
        );
        
        if (!tabelaExiste) {
            console.log('Tabela Temas não existe, retornando array vazio');
            return [];
        }
        
        // Verificar se a tabela tem dados antes de fazer SELECT
        const temDados = await dbCx.getFirstAsync('SELECT COUNT(*) as total FROM Temas');
        
        if (!temDados || temDados.total === 0) {
            console.log('Tabela Temas está vazia');
            return [];
        }
        
        const registros = await dbCx.getAllAsync('SELECT * FROM Temas ORDER BY titulo');
        console.log('Registros encontrados:', registros ? registros.length : 0);

        if (registros && Array.isArray(registros)) {
            for (const registro of registros) {
                // Validar se o registro tem os campos obrigatórios
                if (registro && registro.id && registro.titulo && registro.descricao) {
                    let obj = {
                        id: Number(registro.id), // Garantir que seja número
                        titulo: String(registro.titulo).trim(),
                        descricao: String(registro.descricao).trim()
                    }
                    retorno.push(obj);
                } else {
                    console.warn('Registro inválido encontrado:', registro);
                }
            }
        }

        console.log('Temas válidos carregados:', retorno.length);
        return retorno;
        
    } catch (error) {
        console.error('Erro ao obter temas:', error);
        // Em caso de erro, retornar array vazio ao invés de throw
        console.log('Retornando array vazio devido ao erro');
        return [];
    } finally {
        if (dbCx) {
            try {
                await dbCx.closeAsync();
                console.log('Conexão fechada com sucesso');
            } catch (closeError) {
                console.error('Erro ao fechar conexão:', closeError);
            }
        }
    }
}

export async function adicionaTema(tema) {
    let dbCx = null;
    
    try {
        // Validar dados de entrada
        if (!tema || !tema.titulo || !tema.descricao) {
            throw new Error('Dados do tema são obrigatórios');
        }
        
        dbCx = await getDbConnection();
        console.log('Adicionando tema:', tema.titulo);
        
        let query = 'INSERT INTO Temas (titulo, descricao) VALUES (?,?)';
        const result = await dbCx.runAsync(query, [tema.titulo.trim(), tema.descricao.trim()]);
        
        console.log('Tema adicionado, changes:', result.changes);
        return result.changes == 1;
        
    } catch (error) {
        console.error('Erro ao adicionar tema:', error);
        throw error;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function alteraTema(tema) {
    let dbCx = null;
    
    try {
        // Validar dados de entrada
        if (!tema || !tema.id || !tema.titulo || !tema.descricao) {
            throw new Error('Dados do tema são obrigatórios para alteração');
        }
        
        dbCx = await getDbConnection();
        console.log('Alterando tema ID:', tema.id);
        
        let query = 'UPDATE Temas SET titulo=?, descricao=? WHERE id=?';
        const result = await dbCx.runAsync(query, [tema.titulo.trim(), tema.descricao.trim(), tema.id]);
        
        console.log('Tema alterado, changes:', result.changes);
        return result.changes == 1;
        
    } catch (error) {
        console.error('Erro ao alterar tema:', error);
        throw error;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

export async function excluiTema(id) {
    let dbCx = null;
    
    try {
        // Validar ID
        if (!id || id <= 0) {
            throw new Error('ID do tema é obrigatório para exclusão');
        }
        
        dbCx = await getDbConnection();
        console.log('Excluindo tema ID:', id);
        
        // Primeiro verificar quantas perguntas serão excluídas
        let queryVerifica = 'SELECT COUNT(*) as total FROM Perguntas WHERE tema_id=?';
        const verificacao = await dbCx.getFirstAsync(queryVerifica, [id]);
        
        if (verificacao && verificacao.total > 0) {
            console.log(`Excluindo ${verificacao.total} perguntas associadas ao tema ID: ${id}`);
            
            // Primeiro excluir todas as perguntas associadas ao tema
            let queryExcluiPerguntas = 'DELETE FROM Perguntas WHERE tema_id=?';
            await dbCx.runAsync(queryExcluiPerguntas, [id]);
            console.log('Perguntas associadas excluídas com sucesso');
        }
        
        // Depois excluir o tema
        let query = 'DELETE FROM Temas WHERE id=?';
        const result = await dbCx.runAsync(query, [id]);
        
        console.log('Tema excluído, changes:', result.changes);
        return result.changes == 1;
        
    } catch (error) {
        console.error('Erro ao excluir tema:', error);
        throw error;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
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

export async function contarPerguntasDoTema(temaId) {
    let dbCx = null;
    
    try {
        dbCx = await getDbConnection();
        let query = 'SELECT COUNT(*) as total FROM Perguntas WHERE tema_id=?';
        const resultado = await dbCx.getFirstAsync(query, [temaId]);
        
        return resultado ? resultado.total : 0;
        
    } catch (error) {
        console.error('Erro ao contar perguntas do tema:', error);
        return 0;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}
