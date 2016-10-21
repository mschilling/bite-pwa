from http.server import HTTPServer, BaseHTTPRequestHandler
import ssl


httpd = HTTPServer(('localhost', 443), BaseHTTPRequestHandler)

httpd.socket = ssl.wrap_socket (httpd.socket, 
        keyfile="ssl/key.pem", 
        certfile='ssl/cert.pem', server_side=True)

httpd.serve_forever()