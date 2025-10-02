import * as SQLite from 'expo-sqlite'; // npx expo install expo-sqlite
// para instalar:  
// npx expo install expo-sqlite
//https://docs.expo.dev/versions/latest/sdk/sqlite/

export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbQuiz.db');
    return cx;
}

export async function createTables() {
    let cx = null;
    
    try {
        const queryTemas = `CREATE TABLE IF NOT EXISTS Temas
            (
                id integer not null primary key,
                titulo varchar(50) not null,
                descricao varchar(255) not null
            )`;
        
        const queryPerguntas = `CREATE TABLE IF NOT EXISTS Perguntas
            (
                id integer not null primary key,
                tema_id integer not null,
                descricao varchar(255) not null,
                alternativa1_id integer not null,
                alternativa2_id integer not null,
                alternativa3_id integer not null,
                alternativa4_id integer not null,
                alternativa_correta_id integer not null,
                FOREIGN KEY (tema_id) REFERENCES Temas(id)
            )`;
        
        const queryAlternativas = `CREATE TABLE IF NOT EXISTS Alternativa
            (
                id integer not null primary key,
                descricao varchar(255) not null
            )`;
        
        cx = await getDbConnection();
        await cx.execAsync(queryTemas);
        await cx.execAsync(queryAlternativas);
        await cx.execAsync(queryPerguntas);
        
        console.log('✅ Tabelas criadas/verificadas com sucesso');
        
    } catch (error) {
        console.error('❌ Erro ao criar tabelas:', error);
        throw error;
    } finally {
        if (cx) {
            await cx.closeAsync();
        }
    }
};