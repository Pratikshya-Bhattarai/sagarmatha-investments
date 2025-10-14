"""
WSGI config for sagarmatha_backend project on PythonAnywhere.
"""

import os
import sys

# Add your project directory to the Python path
path = '/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend'
if path not in sys.path:
    sys.path.append(path)

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sagarmatha_backend.settings_pythonanywhere')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
