# PROJECT REPORT: CI/CD PIPELINE WITH GITHUB ACTIONS & DOCKER

**Domain:** DevOps Engineering  
**Internship Organization:** Elevate Labs  
**Author:** Vaishnavi Warad  

---

## 1. ABSTRACT
Modern software delivery requires rapid, reliable, and error-free deployment cycles. Manual testing and deployment introduce human error, environment inconsistencies, and slow release times. This project implements a complete **Continuous Integration and Continuous Deployment (CI/CD)** pipeline using **GitHub Actions** and **Docker**, operating entirely with free tools and local container execution without relying on paid cloud infrastructure. Every code commit pushed to the `main` branch automatically triggers an automated test suite, packages the Node.js web application into a portable Docker image, pushes the verified image to Docker Hub, and enables single-command local deployment using Docker Compose or Minikube.

---

## 2. INTRODUCTION
In traditional software workflows, developers manually run tests on their machines, copy files to servers, and configure runtime dependencies, often resulting in the classic *"it works on my machine"* problem. Containerization solves environment drift by bundling application code and dependencies into standardized Docker images, while CI/CD pipelines eliminate manual steps.

The objective of this project is to build an end-to-end automated pipeline for a Node.js web application (`cicd-docker-project`). By integrating **GitHub Actions** with **Docker Hub** and local deployment via **Docker Compose**, the project demonstrates real-world DevOps practices at zero infrastructure cost.

---

## 3. TOOLS USED
- **Git & GitHub:** Version control and source code repository hosting.
- **GitHub Actions:** Event-driven CI/CD automation server configured via YAML workflows.
- **Node.js (v20) & Express.js:** Lightweight runtime and web framework for the sample web application.
- **Docker & Docker Compose:** Containerization engine to package and deploy the application locally.
- **Docker Hub (Free Tier):** Cloud container registry for storing and distributing built Docker images.
- **Minikube (Optional):** Local Kubernetes cluster configuration (`k8s-deployment.yaml`) for container orchestration.

---

## 4. STEPS INVOLVED IN BUILDING THE PROJECT

### Step 1: Application & Automated Test Development
Built a Node.js Express web application (`app.js`) exposing an HTML deployment status dashboard (`/`) and a JSON health endpoint (`/health`). Wrote automated HTTP verification tests (`test.js`) using Node's native `http` and `assert` modules to validate response status codes and payloads before any image is built.

### Step 2: Containerization with Dockerfile & Docker Compose
Created a lightweight `Dockerfile` based on `node:20-alpine` to minimize image size, install production dependencies, and expose port `3000`. Configured `docker-compose.yml` to pull the pushed image (`vaishnaviiwarad/cicd-demo-app:latest`) and run the container locally with automatic restart policies. Also added `k8s-deployment.yaml` for optional Minikube deployment.

### Step 3: Securing Registry Credentials
Generated a Read/Write Personal Access Token (PAT) on Docker Hub and stored `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` securely inside GitHub Repository Encrypted Secrets so credentials are never exposed in source code or logs.

### Step 4: Configuring GitHub Actions CI/CD Workflow
Defined `.github/workflows/ci-cd.yml` triggered on `push` and `pull_request` events to the `main` branch with two sequential jobs:
1. **`test` Job:** Checks out source code, sets up Node.js 20, installs dependencies (`npm install`), and executes `npm test`.
2. **`build-and-push` Job:** Runs only if tests pass (`needs: test`) on a push to `main`. Authenticates with Docker Hub, builds the Docker image from the `Dockerfile`, and pushes the `latest` tag to Docker Hub.

### Step 5: Local Deployment & Verification
Executed `docker compose pull` and `docker compose up -d` locally via Docker Desktop to download the newly built image from Docker Hub and start the container. Verified live deployment by accessing `http://localhost:3000` and `http://localhost:3000/health` in the browser.

---

## 5. CONCLUSION
This project successfully demonstrates an automated, reproducible CI/CD pipeline using GitHub Actions, Docker, and Docker Hub without requiring any paid cloud servers. By automating code testing, container image creation, registry publishing, and local deployment, the workflow ensures faster release cycles, consistent runtime environments, and immediate feedback on code quality.
