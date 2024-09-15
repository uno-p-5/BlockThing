import os
import sys
import json
import zipfile
import io
from http.server import SimpleHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
    excluded = {'server.py', '__pycache__'}

    def do_GET(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path == '/getFileBundle':
            self.get_file_bundle()
        elif parsed_path.path == '/listFiles':
            self.list_files()
        else:
            super().do_GET()

    def list_files(self):
        file_list = []
        for root, dirs, files in os.walk('.'):
            # Exclude specified directories
            dirs[:] = [d for d in dirs if d not in self.excluded]
            for file in files:
                if file not in self.excluded:
                    full_path = os.path.join(root, file)
                    relative_path = os.path.relpath(full_path, '.')
                    # Normalize path to use forward slashes
                    relative_path = relative_path.replace('\\', '/')
                    file_list.append(relative_path)
        response = json.dumps(file_list)
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(response)))
        self.end_headers()
        self.wfile.write(response.encode())

    def get_file_bundle(self):
        try:
            # Create a ZIP archive in memory
            zip_buffer = io.BytesIO()
            with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
                for root, dirs, files in os.walk('.'):
                    # Exclude specified directories
                    dirs[:] = [d for d in dirs if d not in self.excluded]
                    
                    # Add directory entries to the ZIP
                    for dir in dirs:
                        full_dir_path = os.path.join(root, dir)
                        relative_dir_path = os.path.relpath(full_dir_path, '.')
                        # use forward slashes cuz epic
                        relative_dir_path = relative_dir_path.replace('\\', '/') + '/'
                        zip_info = zipfile.ZipInfo(relative_dir_path)
                        # Set external attributes to indicate a directory (rwxr-xr-x)
                        zip_info.external_attr = (0o755 << 16) | 0x10
                        zip_file.writestr(zip_info, '')  # Empty content for directories

                    # Add file entries to the ZIP
                    for file in files:
                        if file not in self.excluded:
                            full_path = os.path.join(root, file)
                            relative_path = os.path.relpath(full_path, '.')
                            # use forward slashes cuz epic
                            relative_path = relative_path.replace('\\', '/')
                            zip_file.write(full_path, relative_path)
            zip_buffer.seek(0)
            zip_data = zip_buffer.getvalue()

            # Send zip as the response
            self.send_response(200)
            self.send_header('Content-Type', 'application/zip')
            self.send_header('Content-Disposition', 'attachment; filename="files.zip"')
            self.send_header('Content-Length', str(len(zip_data)))
            self.end_headers()
            self.wfile.write(zip_data)
        except Exception as e:
            self.send_error(500, f"Error creating ZIP archive: {e}")

def run(server_class=HTTPServer, handler_class=CustomHTTPRequestHandler):
    port = 3535
    server_address = ('0.0.0.0', port)
    httpd = server_class(server_address, handler_class)
    print(f"Serving HTTP on port {port} (http://localhost:{port}/)...")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
