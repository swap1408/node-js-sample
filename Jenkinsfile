pipeline {
    agent { label 'agent-node' }

    parameters {
        choice(name: 'BRANCH_NAME', choices: ['dev', 'qa', 'master'], description: 'Select the Git branch to build and deploy')
    }

    environment {
        IMAGE_NAME = "node-app:${params.BRANCH_NAME}"
        CONTAINER_NAME = "node-app-${params.BRANCH_NAME}-container"
        HOST_PORT = '80'
        CONTAINER_PORT = '80'
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
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                echo "🚀 Running container: ${CONTAINER_NAME}"
                sh "docker run -d -p ${HOST_PORT}:${CONTAINER_PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}"
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
