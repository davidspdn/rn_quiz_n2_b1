import { getDbConnection } from './dbservice.js';

/**
 * Insere dados mockados em todas as tabelas do banco
 * ATENÇÃO: Este arquivo irá LIMPAR todas as tabelas antes de inserir os dados mockados
 */
export async function inserirDadosMockados() {
    try {
        // Limpar todas as tabelas primeiro
        await limparTodasTabelas();
        
        // Inserir dados mockados
        await inserirTemasMockados();
        await inserirAlternativasMockadas();
        await inserirPerguntasMockadas();
        
        console.log('✅ Dados mockados inseridos com sucesso!');
        return { sucesso: true, message: 'Dados mockados inseridos com sucesso!' };
        
    } catch (error) {
        console.error('❌ Erro ao inserir dados mockados:', error);
        return { sucesso: false, message: 'Erro ao inserir dados mockados: ' + error.message };
    }
}

/**
 * Limpa todas as tabelas (cuidado - remove todos os dados!)
 */
export async function limparTodasTabelas() {
    let dbCx = null;
    
    try {
        dbCx = await getDbConnection();
        
        // Ordem importante: primeiro perguntas (tem FK), depois alternativas e temas
        await dbCx.execAsync('DELETE FROM Perguntas');
        await dbCx.execAsync('DELETE FROM Alternativa');
        await dbCx.execAsync('DELETE FROM Temas');
        
        // Reset dos auto-increment IDs (apenas se a tabela sqlite_sequence existir)
        try {
            const sequenceExists = await dbCx.getFirstAsync(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='sqlite_sequence'"
            );
            
            if (sequenceExists) {
                await dbCx.execAsync('UPDATE sqlite_sequence SET seq = 0 WHERE name = "Perguntas"');
                await dbCx.execAsync('UPDATE sqlite_sequence SET seq = 0 WHERE name = "Alternativa"');
                await dbCx.execAsync('UPDATE sqlite_sequence SET seq = 0 WHERE name = "Temas"');
                console.log('🔄 IDs auto-increment resetados');
            }
        } catch (resetError) {
            console.log('⚠️ Não foi possível resetar auto-increment (normal se tabelas são novas)');
        }
        
        console.log('🗑️ Todas as tabelas foram limpas');
        
    } catch (error) {
        console.error('❌ Erro ao limpar tabelas:', error);
        throw error;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

/**
 * Insere temas mockados
 */
async function inserirTemasMockados() {
    let dbCx = null;
    
    const temas = [
        { titulo: 'Geografia', descricao: 'Conhecimentos gerais sobre países, capitais e continentes' },
        { titulo: 'História', descricao: 'Fatos históricos importantes do Brasil e do mundo' },
        { titulo: 'Ciências', descricao: 'Biologia, física e química básica' },
        { titulo: 'Literatura', descricao: 'Autores clássicos e obras importantes' },
        { titulo: 'Matemática', descricao: 'Operações básicas e conceitos fundamentais' },
        { titulo: 'Esportes', descricao: 'Modalidades esportivas e curiosidades' },
        { titulo: 'Tecnologia', descricao: 'Programação, dispositivos e inovações' },
        { titulo: 'Cinema', descricao: 'Filmes, diretores e curiosidades do cinema' }
    ];
    
    try {
        dbCx = await getDbConnection();
        
        for (const tema of temas) {
            await dbCx.runAsync(
                'INSERT INTO Temas (titulo, descricao) VALUES (?, ?)',
                [tema.titulo, tema.descricao]
            );
        }
        console.log(`📚 ${temas.length} temas inseridos`);
        
    } catch (error) {
        console.error('❌ Erro ao inserir temas mockados:', error);
        throw error;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

/**
 * Insere alternativas mockadas
 */
async function inserirAlternativasMockadas() {
    let dbCx = null;
    
    const alternativas = [
        // Geografia
        'Brasil', 'Argentina', 'Chile', 'Peru',
        'Brasília', 'São Paulo', 'Rio de Janeiro', 'Belo Horizonte',
        'Ásia', 'Europa', 'África', 'Oceania',
        'Amazonas', 'Nilo', 'Mississippi', 'Yangtzé',
        'Itália', 'Espanha', 'Grécia', 'Turquia',
        'Vaticano', 'Mônaco', 'San Marino', 'Liechtenstein',
        'Índico', 'Atlântico', 'Pacífico', 'Ártico',
        'Everest', 'K2', 'Kilimanjaro', 'Aconcágua',
        
        // História
        '1822', '1889', '1500', '1888', '1891',
        'Getúlio Vargas', 'Juscelino Kubitschek', 'Dom Pedro II', 'Tiradentes',
        '1939-1945', '1914-1918', '1950-1953', '1960-1975',
        'Pedro Álvares Cabral', 'Cristóvão Colombo', 'Vasco da Gama', 'Américo Vespúcio',
        'Dom Pedro I', 'Dom João VI', 'Dom Miguel',
        'Salvador', 'Recife',
        'XV', 'XIV', 'XVI', 'XVII',
        
        // Ciências
        'Oxigênio', 'Hidrogênio', 'Carbono', 'Nitrogênio',
        'Coração', 'Fígado', 'Pulmões', 'Rins',
        'Fotossíntese', 'Respiração', 'Digestão', 'Circulação',
        'Einstein', 'Newton', 'Galileu', 'Darwin',
        '206', '198', '214', '220',
        'Mercúrio', 'Vênus', 'Terra', 'Marte',
        'H2O', 'CO2', 'H2SO4', 'NaCl',
        'Pele', 'Cérebro', 'Pulmão',
        
        // Literatura
        'Machado de Assis', 'José de Alencar', 'Clarice Lispector', 'Guimarães Rosa',
        'Dom Casmurro', 'O Cortiço', 'Iracema', 'O Guarani',
        'Romantismo', 'Realismo', 'Modernismo', 'Barroco',
        'Camões', 'Pessoa', 'Saramago', 'Eça de Queirós',
        'Teatro', 'Romance', 'Crônica', 'Poesia',
        'Gonçalves Dias', 'Castro Alves', 'Álvares de Azevedo', 'Casimiro de Abreu',
        
        // Matemática
        '10', '12', '15', '20',
        'Pitágoras', 'Euclides', 'Tales', 'Arquimedes',
        'Triângulo', 'Quadrado', 'Círculo', 'Retângulo',
        '3.14159', '2.71828', '1.41421', '1.73205',
        '56', '48', '54', '63',
        '8', '6', '7', '9',
        '90°', '45°', '180°', '360°',
        '25', '24', '30',
        
        // Esportes
        'Futebol', 'Basquete', 'Vôlei', 'Tênis',
        'Pelé', 'Ronaldinho', 'Kaká', 'Ronaldo',
        '11', '5', '6', '9',
        'Brasil', 'Alemanha', 'Argentina', 'França',
        'Badminton', 'Squash', 'Tênis de mesa',
        '48 minutos', '40 minutos', '60 minutos', '90 minutos',
        '3', '2',
        'Rio de Janeiro', 'Londres', 'Tóquio',
        
        // Tecnologia
        'JavaScript', 'Python', 'Java', 'C++',
        'Apple', 'Microsoft', 'Google', 'Samsung',
        '1990', '1989', '1991', '1993',
        'HTML', 'CSS', 'SQL', 'PHP',
        'Central Processing Unit', 'Computer Personal Unit', 'Central Program Unit', 'Control Processing Unit',
        'Android', 'iOS', 'Windows Phone', 'BlackBerry',
        'Guido van Rossum', 'Facebook',
        
        // Cinema
        'Steven Spielberg', 'Martin Scorsese', 'Quentin Tarantino', 'Christopher Nolan',
        'Titanic', 'Avatar', 'Vingadores', 'Star Wars',
        '1995', '1994', '1993', '1996',
        'Oscar', 'Globo de Ouro', 'Emmy', 'BAFTA',
        'Johnny Depp', 'Brad Pitt', 'Leonardo DiCaprio', 'Tom Cruise',
        'Parasita', '1917', 'Coringa', 'Era Uma Vez em Hollywood',
        'Peter Jackson', 'George Lucas', 'James Cameron',
        'Pixar', 'Disney', 'DreamWorks', 'Warner Bros'
    ];
    
    try {
        dbCx = await getDbConnection();
        
        for (const alternativa of alternativas) {
            await dbCx.runAsync(
                'INSERT INTO Alternativa (descricao) VALUES (?)',
                [alternativa]
            );
        }
        console.log(`🔤 ${alternativas.length} alternativas inseridas`);
        
    } catch (error) {
        console.error('❌ Erro ao inserir alternativas mockadas:', error);
        throw error;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

/**
 * Insere perguntas mockadas
 */
async function inserirPerguntasMockadas() {
    let dbCx = null;
    
    const perguntas = [
        // Geografia (tema_id: 1) - 8 perguntas
        {
            tema_id: 1,
            descricao: 'Qual é a capital do Brasil?',
            alternativa_correta: 'Brasília',
            alternativas_incorretas: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte']
        },
        {
            tema_id: 1,
            descricao: 'Qual o maior país da América do Sul?',
            alternativa_correta: 'Brasil',
            alternativas_incorretas: ['Argentina', 'Chile', 'Peru']
        },
        {
            tema_id: 1,
            descricao: 'Em qual continente fica a China?',
            alternativa_correta: 'Ásia',
            alternativas_incorretas: ['Europa', 'África', 'Oceania']
        },
        {
            tema_id: 1,
            descricao: 'Qual é o rio mais longo do mundo?',
            alternativa_correta: 'Nilo',
            alternativas_incorretas: ['Amazonas', 'Mississippi', 'Yangtzé']
        },
        {
            tema_id: 1,
            descricao: 'Qual país tem o formato de uma bota?',
            alternativa_correta: 'Itália',
            alternativas_incorretas: ['Espanha', 'Grécia', 'Turquia']
        },
        {
            tema_id: 1,
            descricao: 'Qual é o menor país do mundo?',
            alternativa_correta: 'Vaticano',
            alternativas_incorretas: ['Mônaco', 'San Marino', 'Liechtenstein']
        },
        {
            tema_id: 1,
            descricao: 'Em que oceano fica a Ilha de Madagascar?',
            alternativa_correta: 'Índico',
            alternativas_incorretas: ['Atlântico', 'Pacífico', 'Ártico']
        },
        {
            tema_id: 1,
            descricao: 'Qual é a montanha mais alta do mundo?',
            alternativa_correta: 'Everest',
            alternativas_incorretas: ['K2', 'Kilimanjaro', 'Aconcágua']
        },
        
        // História (tema_id: 2) - 8 perguntas
        {
            tema_id: 2,
            descricao: 'Em que ano o Brasil se tornou independente?',
            alternativa_correta: '1822',
            alternativas_incorretas: ['1889', '1500', '1888']
        },
        {
            tema_id: 2,
            descricao: 'Quem foi o primeiro presidente do Brasil?',
            alternativa_correta: 'Getúlio Vargas',
            alternativas_incorretas: ['Juscelino Kubitschek', 'Dom Pedro II', 'Tiradentes']
        },
        {
            tema_id: 2,
            descricao: 'Quando aconteceu a Segunda Guerra Mundial?',
            alternativa_correta: '1939-1945',
            alternativas_incorretas: ['1914-1918', '1950-1953', '1960-1975']
        },
        {
            tema_id: 2,
            descricao: 'Quem descobriu o Brasil?',
            alternativa_correta: 'Pedro Álvares Cabral',
            alternativas_incorretas: ['Cristóvão Colombo', 'Vasco da Gama', 'Américo Vespúcio']
        },
        {
            tema_id: 2,
            descricao: 'Em que ano foi proclamada a República no Brasil?',
            alternativa_correta: '1889',
            alternativas_incorretas: ['1822', '1888', '1891']
        },
        {
            tema_id: 2,
            descricao: 'Quem foi o imperador que abdicou do trono brasileiro?',
            alternativa_correta: 'Dom Pedro I',
            alternativas_incorretas: ['Dom Pedro II', 'Dom João VI', 'Dom Miguel']
        },
        {
            tema_id: 2,
            descricao: 'Qual foi a primeira capital do Brasil?',
            alternativa_correta: 'Salvador',
            alternativas_incorretas: ['Rio de Janeiro', 'São Paulo', 'Recife']
        },
        {
            tema_id: 2,
            descricao: 'Em que século aconteceu o Descobrimento da América?',
            alternativa_correta: 'XV',
            alternativas_incorretas: ['XIV', 'XVI', 'XVII']
        },
        
        // Ciências (tema_id: 3) - 8 perguntas
        {
            tema_id: 3,
            descricao: 'Qual gás é essencial para a respiração humana?',
            alternativa_correta: 'Oxigênio',
            alternativas_incorretas: ['Hidrogênio', 'Carbono', 'Nitrogênio']
        },
        {
            tema_id: 3,
            descricao: 'Qual órgão bombeia o sangue no corpo humano?',
            alternativa_correta: 'Coração',
            alternativas_incorretas: ['Fígado', 'Pulmões', 'Rins']
        },
        {
            tema_id: 3,
            descricao: 'Qual é o processo que as plantas fazem para produzir energia?',
            alternativa_correta: 'Fotossíntese',
            alternativas_incorretas: ['Respiração', 'Digestão', 'Circulação']
        },
        {
            tema_id: 3,
            descricao: 'Quantos ossos tem o corpo humano adulto?',
            alternativa_correta: '206',
            alternativas_incorretas: ['198', '214', '220']
        },
        {
            tema_id: 3,
            descricao: 'Qual é o planeta mais próximo do Sol?',
            alternativa_correta: 'Mercúrio',
            alternativas_incorretas: ['Vênus', 'Terra', 'Marte']
        },
        {
            tema_id: 3,
            descricao: 'Qual cientista propôs a Teoria da Evolução?',
            alternativa_correta: 'Darwin',
            alternativas_incorretas: ['Einstein', 'Newton', 'Galileu']
        },
        {
            tema_id: 3,
            descricao: 'Qual é a fórmula química da água?',
            alternativa_correta: 'H2O',
            alternativas_incorretas: ['CO2', 'H2SO4', 'NaCl']
        },
        {
            tema_id: 3,
            descricao: 'Qual é o maior órgão do corpo humano?',
            alternativa_correta: 'Pele',
            alternativas_incorretas: ['Fígado', 'Cérebro', 'Pulmão']
        },
        
        // Literatura (tema_id: 4) - 8 perguntas
        {
            tema_id: 4,
            descricao: 'Quem escreveu "Dom Casmurro"?',
            alternativa_correta: 'Machado de Assis',
            alternativas_incorretas: ['José de Alencar', 'Clarice Lispector', 'Guimarães Rosa']
        },
        {
            tema_id: 4,
            descricao: 'Qual é considerada a obra máxima de Machado de Assis?',
            alternativa_correta: 'Dom Casmurro',
            alternativas_incorretas: ['O Cortiço', 'Iracema', 'O Guarani']
        },
        {
            tema_id: 4,
            descricao: 'Qual movimento literário caracteriza-se pelo "amor impossível"?',
            alternativa_correta: 'Romantismo',
            alternativas_incorretas: ['Realismo', 'Modernismo', 'Barroco']
        },
        {
            tema_id: 4,
            descricao: 'Quem escreveu "Os Lusíadas"?',
            alternativa_correta: 'Camões',
            alternativas_incorretas: ['Pessoa', 'Saramago', 'Eça de Queirós']
        },
        {
            tema_id: 4,
            descricao: 'Qual obra retrata a vida nos cortiços do Rio de Janeiro?',
            alternativa_correta: 'O Cortiço',
            alternativas_incorretas: ['Dom Casmurro', 'Iracema', 'O Guarani']
        },
        {
            tema_id: 4,
            descricao: 'Quem escreveu "Grande Sertão: Veredas"?',
            alternativa_correta: 'Guimarães Rosa',
            alternativas_incorretas: ['Machado de Assis', 'José de Alencar', 'Clarice Lispector']
        },
        {
            tema_id: 4,
            descricao: 'Qual é o gênero literário de "Auto da Barca do Inferno"?',
            alternativa_correta: 'Teatro',
            alternativas_incorretas: ['Romance', 'Crônica', 'Poesia']
        },
        {
            tema_id: 4,
            descricao: 'Quem é considerado o precursor do Romantismo no Brasil?',
            alternativa_correta: 'Gonçalves Dias',
            alternativas_incorretas: ['Castro Alves', 'Álvares de Azevedo', 'Casimiro de Abreu']
        },
        
        // Matemática (tema_id: 5) - 8 perguntas
        {
            tema_id: 5,
            descricao: 'Quanto é 5 + 5?',
            alternativa_correta: '10',
            alternativas_incorretas: ['12', '15', '20']
        },
        {
            tema_id: 5,
            descricao: 'Quem criou o teorema que leva seu nome sobre triângulos?',
            alternativa_correta: 'Pitágoras',
            alternativas_incorretas: ['Euclides', 'Tales', 'Arquimedes']
        },
        {
            tema_id: 5,
            descricao: 'Qual é a forma geométrica com três lados?',
            alternativa_correta: 'Triângulo',
            alternativas_incorretas: ['Quadrado', 'Círculo', 'Retângulo']
        },
        {
            tema_id: 5,
            descricao: 'Qual é o valor aproximado de π (pi)?',
            alternativa_correta: '3.14159',
            alternativas_incorretas: ['2.71828', '1.41421', '1.73205']
        },
        {
            tema_id: 5,
            descricao: 'Quanto é 8 × 7?',
            alternativa_correta: '56',
            alternativas_incorretas: ['48', '54', '63']
        },
        {
            tema_id: 5,
            descricao: 'Qual é a raiz quadrada de 64?',
            alternativa_correta: '8',
            alternativas_incorretas: ['6', '7', '9']
        },
        {
            tema_id: 5,
            descricao: 'Quantos graus tem um ângulo reto?',
            alternativa_correta: '90°',
            alternativas_incorretas: ['45°', '180°', '360°']
        },
        {
            tema_id: 5,
            descricao: 'Qual é o resultado de 100 ÷ 4?',
            alternativa_correta: '25',
            alternativas_incorretas: ['20', '24', '30']
        },
        
        // Esportes (tema_id: 6) - 8 perguntas
        {
            tema_id: 6,
            descricao: 'Qual é o esporte mais popular do Brasil?',
            alternativa_correta: 'Futebol',
            alternativas_incorretas: ['Basquete', 'Vôlei', 'Tênis']
        },
        {
            tema_id: 6,
            descricao: 'Quem é considerado o maior jogador de futebol brasileiro?',
            alternativa_correta: 'Pelé',
            alternativas_incorretas: ['Ronaldinho', 'Kaká', 'Ronaldo']
        },
        {
            tema_id: 6,
            descricao: 'Quantos jogadores tem um time de futebol em campo?',
            alternativa_correta: '11',
            alternativas_incorretas: ['5', '6', '9']
        },
        {
            tema_id: 6,
            descricao: 'Qual país ganhou mais Copas do Mundo?',
            alternativa_correta: 'Brasil',
            alternativas_incorretas: ['Alemanha', 'Argentina', 'França']
        },
        {
            tema_id: 6,
            descricao: 'Em que esporte se usa uma raquete e uma peteca?',
            alternativa_correta: 'Badminton',
            alternativas_incorretas: ['Tênis', 'Squash', 'Tênis de mesa']
        },
        {
            tema_id: 6,
            descricao: 'Quantos pontos vale um touchdown no futebol americano?',
            alternativa_correta: '6',
            alternativas_incorretas: ['3', '7', '2']
        },
        {
            tema_id: 6,
            descricao: 'Qual é a duração de uma partida de basquete na NBA?',
            alternativa_correta: '48 minutos',
            alternativas_incorretas: ['40 minutos', '60 minutos', '90 minutos']
        },
        {
            tema_id: 6,
            descricao: 'Em que cidade foram realizadas as Olimpíadas de 2016?',
            alternativa_correta: 'Rio de Janeiro',
            alternativas_incorretas: ['São Paulo', 'Londres', 'Tóquio']
        },
        
        // Tecnologia (tema_id: 7) - 8 perguntas
        {
            tema_id: 7,
            descricao: 'Qual linguagem é mais usada para desenvolvimento web?',
            alternativa_correta: 'JavaScript',
            alternativas_incorretas: ['Python', 'Java', 'C++']
        },
        {
            tema_id: 7,
            descricao: 'Qual empresa criou o sistema operacional Windows?',
            alternativa_correta: 'Microsoft',
            alternativas_incorretas: ['Apple', 'Google', 'Samsung']
        },
        {
            tema_id: 7,
            descricao: 'Em que ano foi criada a World Wide Web?',
            alternativa_correta: '1991',
            alternativas_incorretas: ['1990', '1989', '1993']
        },
        {
            tema_id: 7,
            descricao: 'Qual linguagem de marcação é usada para criar páginas web?',
            alternativa_correta: 'HTML',
            alternativas_incorretas: ['CSS', 'SQL', 'PHP']
        },
        {
            tema_id: 7,
            descricao: 'Qual empresa criou o iPhone?',
            alternativa_correta: 'Apple',
            alternativas_incorretas: ['Samsung', 'Google', 'Microsoft']
        },
        {
            tema_id: 7,
            descricao: 'O que significa a sigla "CPU"?',
            alternativa_correta: 'Central Processing Unit',
            alternativas_incorretas: ['Computer Personal Unit', 'Central Program Unit', 'Control Processing Unit']
        },
        {
            tema_id: 7,
            descricao: 'Qual é o sistema operacional do Google para smartphones?',
            alternativa_correta: 'Android',
            alternativas_incorretas: ['iOS', 'Windows Phone', 'BlackBerry']
        },
        {
            tema_id: 7,
            descricao: 'Qual empresa criou a linguagem Python?',
            alternativa_correta: 'Guido van Rossum',
            alternativas_incorretas: ['Google', 'Microsoft', 'Facebook']
        },
        
        // Cinema (tema_id: 8) - 8 perguntas
        {
            tema_id: 8,
            descricao: 'Quem dirigiu o filme "Tubarão"?',
            alternativa_correta: 'Steven Spielberg',
            alternativas_incorretas: ['Martin Scorsese', 'Quentin Tarantino', 'Christopher Nolan']
        },
        {
            tema_id: 8,
            descricao: 'Qual filme arrecadou mais dinheiro na história do cinema?',
            alternativa_correta: 'Avatar',
            alternativas_incorretas: ['Titanic', 'Vingadores', 'Star Wars']
        },
        {
            tema_id: 8,
            descricao: 'Em que ano foi lançado o filme "Pulp Fiction"?',
            alternativa_correta: '1994',
            alternativas_incorretas: ['1995', '1993', '1996']
        },
        {
            tema_id: 8,
            descricao: 'Qual é o prêmio mais importante do cinema?',
            alternativa_correta: 'Oscar',
            alternativas_incorretas: ['Globo de Ouro', 'Emmy', 'BAFTA']
        },
        {
            tema_id: 8,
            descricao: 'Quem interpretou Jack Sparrow em "Piratas do Caribe"?',
            alternativa_correta: 'Johnny Depp',
            alternativas_incorretas: ['Brad Pitt', 'Leonardo DiCaprio', 'Tom Cruise']
        },
        {
            tema_id: 8,
            descricao: 'Qual filme ganhou o Oscar de Melhor Filme em 2020?',
            alternativa_correta: 'Parasita',
            alternativas_incorretas: ['1917', 'Coringa', 'Era Uma Vez em Hollywood']
        },
        {
            tema_id: 8,
            descricao: 'Quem dirigiu a trilogia "O Senhor dos Anéis"?',
            alternativa_correta: 'Peter Jackson',
            alternativas_incorretas: ['Steven Spielberg', 'George Lucas', 'James Cameron']
        },
        {
            tema_id: 8,
            descricao: 'Qual estúdio criou o filme "Toy Story"?',
            alternativa_correta: 'Pixar',
            alternativas_incorretas: ['Disney', 'DreamWorks', 'Warner Bros']
        }
    ];
    
    try {
        dbCx = await getDbConnection();
        
        for (const pergunta of perguntas) {
            // Buscar IDs das alternativas pelo texto
            const alternativaCorretaId = await buscarIdAlternativa(dbCx, pergunta.alternativa_correta);
            const alternativa2Id = await buscarIdAlternativa(dbCx, pergunta.alternativas_incorretas[0]);
            const alternativa3Id = await buscarIdAlternativa(dbCx, pergunta.alternativas_incorretas[1]);
            const alternativa4Id = await buscarIdAlternativa(dbCx, pergunta.alternativas_incorretas[2]);
            
            if (alternativaCorretaId && alternativa2Id && alternativa3Id && alternativa4Id) {
                await dbCx.runAsync(`
                    INSERT INTO Perguntas 
                    (tema_id, descricao, alternativa1_id, alternativa2_id, alternativa3_id, alternativa4_id, alternativa_correta_id) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `, [
                    pergunta.tema_id,
                    pergunta.descricao,
                    alternativaCorretaId,
                    alternativa2Id,
                    alternativa3Id,
                    alternativa4Id,
                    alternativaCorretaId
                ]);
            }
        }
        console.log(`❓ ${perguntas.length} perguntas inseridas (8 por tema)`);
        
    } catch (error) {
        console.error('❌ Erro ao inserir perguntas mockadas:', error);
        throw error;
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}

/**
 * Busca o ID de uma alternativa pelo texto
 */
async function buscarIdAlternativa(dbCx, descricao) {
    const result = await dbCx.getFirstAsync(
        'SELECT id FROM Alternativa WHERE descricao = ?',
        [descricao]
    );
    return result?.id || null;
}

/**
 * Função para verificar quantos registros existem em cada tabela
 */
export async function verificarDados() {
    let dbCx = null;
    
    try {
        dbCx = await getDbConnection();
        
        const temas = await dbCx.getFirstAsync('SELECT COUNT(*) as count FROM Temas');
        const alternativas = await dbCx.getFirstAsync('SELECT COUNT(*) as count FROM Alternativa');
        const perguntas = await dbCx.getFirstAsync('SELECT COUNT(*) as count FROM Perguntas');
        
        const resultado = {
            temas: temas ? temas.count : 0,
            alternativas: alternativas ? alternativas.count : 0,
            perguntas: perguntas ? perguntas.count : 0
        };
        
        console.log('📊 Dados no banco:', resultado);
        return resultado;
        
    } catch (error) {
        console.error('❌ Erro ao verificar dados:', error);
        return {
            temas: 0,
            alternativas: 0,
            perguntas: 0
        };
    } finally {
        if (dbCx) {
            await dbCx.closeAsync();
        }
    }
}