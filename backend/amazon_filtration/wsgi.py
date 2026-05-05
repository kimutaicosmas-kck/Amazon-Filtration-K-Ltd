"""
WSGI config for amazon_filtration project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'amazon_filtration.settings')

application = get_wsgi_application()
