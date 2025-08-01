pipeline {
    agent any

    parameters {
        choice(name: 'BRANCH_NAME', choices: ['dev', 'qa', 'main'], description: 'Select the branch to deploy')
    }

    environment {
        IMAGE_NAME = "node-app:${params.BRANCH_NAME}"
        CONTAINER_NAME = "node-app-${params.BRANCH_NAME}-container"
        CONTAINER_PORT = '80'

        // Unique HOST_PORT for each branch
        HOST_PORT = "${params.BRANCH_NAME}" == 'dev'  ? '8081' :
                    "${params.BRANCH_NAME}" == 'qa'   ? '8082' :
                    "${params.BRANCH_NAME}" == 'main' ? '8083' : '8090'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "📦 Checking out branch: ${params.BRANCH_NAME}"
                git branch: "${params.BRANCH_NAME}", url: 'https://github.com/swap1408/node-js-sample.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🔧 Building Docker image: ${IMAGE_NAME}"
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Clean Old Containers') {
            steps {
                echo "🧹 Cleaning up old containers: ${CONTAINER_NAME}"
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                """
            }
        }

        stage('Run Docker Container') {
            steps {
                echo "🚀 Running container: ${CONTAINER_NAME} on port ${HOST_PORT}"
                sh """
                    docker run -d -p ${HOST_PORT}:${CONTAINER_PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}
                """
            }
        }
    }

    post {
        always {
            echo "✅ Cleaning workspace..."
            cleanWs()
        }
    }
}
