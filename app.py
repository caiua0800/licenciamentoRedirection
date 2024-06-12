from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class RequestHandler(BaseHTTPRequestHandler):
    
    dataGLOBAL = []

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        json_data = json.loads(post_data)

        # Atualiza os dados globais com os dados recebidos no POST
        self.dataGLOBAL = json_data
        
        for obj in json_data:
            print(f"Nome: {obj['nome']}, Valor: {obj['valor']}, Choice: {obj['choice']}, Intervalo: {obj['intervalo']}")

        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(b'Received POST request')

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        # Retorna os dados armazenados na variável de classe
        response_data = self.dataGLOBAL
    
        self.wfile.write(json.dumps(response_data).encode('utf-8'))

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
