"""
WSGI config for Sagarmatha Investments Backend production deployment.
Optimized for PythonAnywhere.
"""

import os
import sys

# Add the project directory to Python path
project_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_dir)

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sagarmatha_backend.settings_production')

# Import Django WSGI application
from django.core.wsgi import get_wsgi_application

# Create WSGI application
application = get_wsgi_application()

# Health check endpoint for load balancers
def health_check(environ, start_response):
    """Simple health check for load balancers"""
    status = '200 OK'
    headers = [('Content-Type', 'text/plain')]
    start_response(status, headers)
    return [b'OK']

# Mount health check at /health/
if environ.get('PATH_INFO') == '/health/':
    return health_check(environ, start_response)
