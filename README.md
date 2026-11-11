# Project 4: CI/CD Pipeline with GitHub Actions & Docker (No Cloud Needed)

## 📌 Objective
Set up a complete CI/CD pipeline using **GitHub Actions** and **Docker** that automatically runs unit tests, builds a Docker image, pushes it to **Docker Hub**, and deploys the containerized web app locally without needing any cloud account.

---

## 🛠 Tools Used
- **Git & GitHub** (Source Code Management)
- **GitHub Actions** (CI/CD Automation)
- **Node.js & Express** (Sample Web Application)
- **Docker & Docker Compose** (Containerization & Local Deployment)
- **Docker Hub** (Free Container Registry)

---

## 📂 Project Files
- `app.js`: Simple Express web app serving a status page (`/`) and health endpoint (`/health`).
- `test.js`: Automated HTTP unit tests using Node.js built-in modules.
- `Dockerfile`: Builds a lightweight Node.js Alpine Docker image.
- `docker-compose.yml`: Pulls and deploys the container locally on port `3000`.
- `k8s-deployment.yaml`: Optional Kubernetes / Minikube manifest for local cluster deployment.
- `.github/workflows/ci-cd.yml`: GitHub Actions workflow (`test` -> `build-and-push`).
- `PROJECT_REPORT.md`: 1–2 page project report ready to save as PDF.

---

## 🚀 Step-by-Step Guide

### Step 1: Test Locally (Optional)
```bash
npm install
npm test
```

### Step 2: Configure GitHub Secrets
In your GitHub repository, go to **Settings > Secrets and variables > Actions** and add:
- `DOCKERHUB_USERNAME`: `vaishnaviiwarad`
- `DOCKERHUB_TOKEN`: Your Docker Hub Access Token (with Read & Write permissions)

### Step 3: Trigger CI/CD Pipeline
Push code to the `main` branch:
```bash
git add .
git commit -m "feat: deploy via GitHub Actions and Docker"
git push origin main
```
Check the **Actions** tab on GitHub to verify both **Run Tests** and **Build & Push Docker Image** succeed!

### Step 4: Pull & Run Deployed App Locally
Run with Docker Compose:
```bash
docker compose pull
docker compose up -d
```
*(Or using plain Docker: `docker run -d -p 3000:3000 vaishnaviiwarad/cicd-demo-app:latest`)*

Open **`http://localhost:3000`** in your browser to view the deployed application!
