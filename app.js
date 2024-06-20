const http = require('http');
let dataGlobal = [];

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Converte os dados de buffer para string
        });

        req.on('end', () => {
            try {
                const jsonData = JSON.parse(body); // Converte a string JSON em objeto JavaScript
                dataGlobal = jsonData; // Atualiza os dados globais
                console.log('Dados recebidos no POST:', dataGlobal);
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Received POST request\n');
            } catch (error) {
                console.error('Erro ao analisar JSON:', error);
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('Erro ao analisar JSON\n');
            }
        });
    } else if (req.method === 'GET') {
        console.log('GET request recebida');
        res.writeHead(200, {'Content-Type': 'application/json'});

        res.end(JSON.stringify(dataGlobal));
    } else {
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('Método não permitido\n');
    }
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running at http://35.87.83.18:${PORT}/`);
});
