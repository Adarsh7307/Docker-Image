# 👨‍💻 My Role in This Project

My primary role in this project was focused on **Dockerization, deployment, and infrastructure setup** rather than full application development.

I worked on taking the Hospital Management application, containerizing it with Docker, publishing the image to Docker Hub, and deploying it on an AWS EC2 instance so that it could be accessed publicly through a browser.

## My Key Responsibilities

### 1. Dockerizing the Application
I created the Docker setup required to containerize the Node.js + Express hospital project.

This included:
- writing the `Dockerfile`
- defining the working directory inside the container
- copying application files into the image
- installing Node.js dependencies using `npm install`
- exposing the application port (`3000`)
- defining the startup command to run the server using Node.js

### 2. Building the Docker Image
I built the Docker image locally from the application source code using Docker build commands.

Tasks performed:
- verified project files before build
- built the image from the Dockerfile
- tested whether the image was created successfully
- ensured the image could run the hospital app inside a container

### 3. Running and Testing the Container Locally
Before deployment, I tested the application locally using Docker containers.

This included:
- running the container using port mapping (`3000:3000`)
- checking whether the application was accessible in the browser
- verifying that the Node.js server was starting correctly inside the container
- checking logs to confirm the application was running successfully

### 4. Tagging and Publishing the Docker Image to Docker Hub
After verifying the image locally, I tagged it and pushed it to Docker Hub so that it could be pulled from any remote server.

Tasks performed:
- tagged the image with the Docker Hub repository name
- authenticated with Docker Hub
- pushed the image to the Docker Hub repository
- verified that the image was available remotely for deployment

Docker Hub image used:
`adarsh7307/hospital-app:latest`

### 5. AWS EC2 Deployment
I deployed the Dockerized application on an AWS EC2 Ubuntu instance.

Deployment tasks included:
- launching the EC2 instance
- connecting to the instance using SSH / EC2 Instance Connect
- installing Docker on the EC2 instance
- enabling and starting the Docker service
- configuring Docker permissions for the Ubuntu user
- pulling the Docker image from Docker Hub onto the EC2 server
- running the hospital container on the EC2 instance

### 6. Port Mapping and Application Exposure
I configured the container to expose the application on port `3000` and mapped it to the EC2 host machine.

This allowed the hospital application to be accessed from a browser using the EC2 public IP.

Example:
`http://13.203.209.179:3000`

### 7. AWS Security Group Configuration
I configured the EC2 security group to allow incoming traffic for the required ports.

Inbound rules configured:
- **22** for SSH access
- **80** for HTTP
- **443** for HTTPS
- **3000** for accessing the hospital application running inside the Docker container

This was necessary to make the application accessible from outside the EC2 instance.

### 8. Deployment Validation and Verification
After deployment, I verified that the application was working correctly by:

- checking running containers using `docker ps`
- viewing container logs using `docker logs`
- testing the public application URL in the browser
- confirming that the hospital dashboard was accessible from the deployed EC2 instance

### 9. Deployment Documentation
I documented the deployment workflow, Docker commands, EC2 setup steps, and screenshots of the running application for project proof and reproducibility.

This included:
- Docker build and run commands
- Docker Hub push/pull workflow
- EC2 deployment steps
- security group configuration
- browser access URL
- deployment screenshots for proof
