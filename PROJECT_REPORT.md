# PROJECT REPORT: CI/CD PIPELINE WITH GITHUB ACTIONS & DOCKER

**Internship Program:** Elevate Labs (2 Weeks Internship)  
**Domain:** DevOps & Cloud Engineering  
**Author:** Vaishnavi Warad  
**GitHub Repository:** https://github.com/vaishnaviiwarad/cicd-docker-project  
**Docker Hub Image:** https://hub.docker.com/r/vaishnaviiwarad/cicd-demo-app  

---

## 1. INTRODUCTION
In traditional software workflows, developers manually run tests on local machines, transfer files to servers, and configure runtime dependencies manually. This frequently leads to environment mismatches (*"it works on my machine"*), slow release cycles, and human deployment errors. Containerization addresses environment consistency by packaging application code and dependencies into standardized Docker images, while CI/CD pipelines automate testing and delivery.

The objective of this project is to build an end-to-end automated **Continuous Integration and Continuous Deployment (CI/CD)** pipeline for a Node.js web application (`cicd-docker-project`) using **GitHub Actions**, **Docker**, and **Docker Hub**, deployed locally via **Docker Compose** without requiring paid cloud servers.

---

## 2. ABSTRACT
This project demonstrates a complete, automated software delivery workflow built entirely with free tools. Whenever code is pushed to the `main` branch on GitHub, an automated **GitHub Actions** workflow (`ci-cd.yml`) executes two sequential jobs: running an automated HTTP unit test suite (`test.js`) and, upon success, building a lightweight `node:20-alpine` Docker container image and pushing it securely to **Docker Hub** (`vaishnaviiwarad/cicd-demo-app:latest`). Finally, the verified image is pulled and deployed locally via **Docker Compose**, serving a live status dashboard on `http://localhost:3000` with zero cloud infrastructure cost.

---

## 3. TOOLS USED
- **Git & GitHub:** Version control and remote source code hosting.
- **GitHub Actions:** Event-driven CI/CD automation engine configured via YAML (`.github/workflows/ci-cd.yml`).
- **Node.js (v20) & Express.js:** Backend runtime and web framework for the sample web app (`app.js`) and native HTTP test suite (`test.js`).
- **Docker & Docker Compose:** Containerization runtime to package (`Dockerfile`) and run (`docker-compose.yml`) the application locally.
- **Docker Hub (Free Tier):** Public container image registry storing versioned builds (`vaishnaviiwarad/cicd-demo-app:latest`).
- **Kubernetes / Minikube Manifest (Optional):** Declarative `k8s-deployment.yaml` included for local Kubernetes cluster deployment.

---

## 4. STEPS INVOLVED IN BUILDING THE PROJECT

### Step 1: Web Application & Automated Test Development
Developed an Express.js web application (`app.js`) serving a live deployment status dashboard at `/` (displaying app version and container hostname) and a JSON health check at `/health`. Implemented an automated HTTP test suite (`test.js`) using Node's built-in `http` and `assert` modules to verify `200 OK` responses before packaging.

### Step 2: Containerization (`Dockerfile` & `docker-compose.yml`)
Created a lightweight `Dockerfile` using `node:20-alpine`, copying `package.json`, installing production dependencies (`npm install --omit=dev`), and exposing port `3000`. Configured `docker-compose.yml` to pull and run `vaishnaviiwarad/cicd-demo-app:latest` on port `3000`.

### Step 3: Securing Registry Credentials with GitHub Secrets
Generated a `Repo Read & Write` Personal Access Token (PAT) on Docker Hub and stored `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` inside GitHub Encrypted Repository Secrets so credentials remain protected outside source code.

### Step 4: Configuring GitHub Actions CI/CD Workflow
Configured `.github/workflows/ci-cd.yml` triggered on `push` and `pull_request` to `main`:
1. **`test` Job:** Checks out code, sets up Node.js 20, installs dependencies, and runs `npm test`.
2. **`build-and-push` Job:** Depends on `test` (`needs: test`) and executes on pushes to `main`, authenticating with Docker Hub, building the Docker image, and pushing `vaishnaviiwarad/cicd-demo-app:latest`.

### Step 5: Local Deployment & Verification
Triggered the workflow via `git push -u origin main`, confirmed both CI/CD jobs passed with green checkmarks on GitHub Actions, and verified the published image on Docker Hub. Pulled and launched the container locally using `docker compose pull` and `docker compose up -d`, confirming the live container (`64cfceb25b2f`) serving successfully at `http://localhost:3000`.

---

## 5. CONCLUSION
This project successfully implements an automated, reproducible CI/CD pipeline using GitHub Actions, Docker, and Docker Hub without requiring paid cloud infrastructure. Automating testing, container image construction, registry publishing, and single-command local deployment eliminates manual configuration drift, accelerates release cycles, and validates code quality on every commit.
