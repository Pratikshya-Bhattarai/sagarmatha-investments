@echo off
echo Starting NEPSE Application Locally...
echo.

echo Starting Django Backend...
cd django-backend
call venv\Scripts\activate
start "Django Backend" cmd /k "py manage.py runserver 8000"
cd ..

echo Starting Next.js Frontend...
cd nextjs-app
start "Next.js Frontend" cmd /k "npm run dev"
cd ..

echo.
echo Both servers are starting...
echo Django Backend: http://localhost:8000
echo Next.js Frontend: http://localhost:3000
echo Django Admin: http://localhost:8000/admin/
echo.
echo Press any key to exit...
pause
