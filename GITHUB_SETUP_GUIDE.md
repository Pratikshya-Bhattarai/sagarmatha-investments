# 🐙 GitHub Repository Setup Guide

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **"New repository"**
3. **Repository name**: `sagarmatha-investments`
4. **Description**: `NEPSE Market Analytics Application with Django Backend and Next.js Frontend`
5. **Visibility**: Public (or Private if you prefer)
6. **Initialize**: Don't initialize with README (we already have one)
7. Click **"Create repository"**

## Step 2: Push Your Code to GitHub

```bash
# Add remote origin (replace with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/sagarmatha-investments.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Verify Repository

1. Go to your GitHub repository
2. Verify all files are uploaded:
   - `django-backend/` - Django REST API
   - `nextjs-app/` - Next.js frontend
   - `README.md` - Project documentation
   - `SUPABASE_DATABASE_SCHEMA.sql` - Database schema
   - `COMPLETE_DEPLOYMENT_GUIDE.md` - Deployment instructions

## Step 4: Set Up Branch Protection (Optional)

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch
3. Require pull request reviews
4. Require status checks

## Step 5: Configure GitHub Actions (Optional)

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: 3.10
    - name: Install dependencies
      run: |
        cd django-backend
        pip install -r requirements-minimal.txt
    - name: Run tests
      run: |
        cd django-backend
        python manage.py test

  test-frontend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Install dependencies
      run: |
        cd nextjs-app
        npm install
    - name: Run tests
      run: |
        cd nextjs-app
        npm run build
```

## Step 6: Deploy to Production

### Backend (PythonAnywhere)
1. Follow `PYTHONANYWHERE_DEPLOYMENT_STEPS.md`
2. Clone your GitHub repository
3. Configure environment variables
4. Deploy Django backend

### Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `nextjs-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: `https://pratikshyab.pythonanywhere.com/api/v1`
5. Deploy

### Database (Supabase)
1. Follow `SUPABASE_SETUP_INSTRUCTIONS.md`
2. Run the database schema
3. Configure connection settings

## Step 7: Update Documentation

### Update README.md
- Add live demo links
- Update deployment instructions
- Add screenshots
- Update API documentation

### Add Contributing Guidelines
Create `CONTRIBUTING.md`:

```markdown
# Contributing to Sagarmatha Investments

## How to Contribute

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Development Setup

1. Clone the repository
2. Set up backend (Django)
3. Set up frontend (Next.js)
4. Configure database (Supabase)
5. Run tests

## Code Style

- Follow PEP 8 for Python
- Use TypeScript for frontend
- Write tests for new features
- Update documentation
```

## Step 8: Set Up Issues and Projects

### Create Issue Templates
Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug report
about: Create a report to help us improve
title: ''
labels: bug
assignees: ''
---

**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior.

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. Windows, macOS, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

## Step 9: Add License

Create `LICENSE`:

```text
MIT License

Copyright (c) 2024 Sagarmatha Investments

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Step 10: Final Repository Structure

Your GitHub repository should have:

```
sagarmatha-investments/
├── .github/
│   ├── workflows/
│   │   └── ci.yml
│   └── ISSUE_TEMPLATE/
│       └── bug_report.md
├── django-backend/
│   ├── nepse/
│   ├── sagarmatha_backend/
│   ├── requirements.txt
│   └── manage.py
├── nextjs-app/
│   ├── src/
│   ├── package.json
│   └── next.config.ts
├── .gitignore
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── SUPABASE_DATABASE_SCHEMA.sql
├── COMPLETE_DEPLOYMENT_GUIDE.md
├── PYTHONANYWHERE_DEPLOYMENT_STEPS.md
└── SUPABASE_SETUP_INSTRUCTIONS.md
```

## 🎉 Success!

Your GitHub repository is now set up with:
- ✅ Complete NEPSE application code
- ✅ Comprehensive documentation
- ✅ Deployment guides
- ✅ CI/CD pipeline (optional)
- ✅ Issue templates
- ✅ Contributing guidelines
- ✅ MIT License

## 🔗 Next Steps

1. **Deploy Backend**: Follow `PYTHONANYWHERE_DEPLOYMENT_STEPS.md`
2. **Deploy Frontend**: Deploy to Vercel
3. **Set Up Database**: Follow `SUPABASE_SETUP_INSTRUCTIONS.md`
4. **Test Everything**: Verify all features work
5. **Go Live**: Share your NEPSE application! 🚀

Your complete NEPSE application is now on GitHub and ready for deployment! 🎉
