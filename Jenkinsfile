pipeline {
    agent { label 'agent-node' } // Change to your Jenkins agent label

    // 🔹 Define build parameters
    parameters {
        choice(name: 'BRANCH_NAME', choices: ['dev', 'qa', 'master'], description: 'Select the branch to deploy')
    }

    environment {
        IMAGE_NAME = 'node-app'
        CONTAINER_NAME = "node-app_${params.BRANCH_NAME}"
        CONTAINER_PORT = '80'
        HOST_PORT = '80'
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "🔁 Checking out branch: ${params.BRANCH_NAME}"
                sh """
                    rm -rf *
                    git clone --single-branch --branch ${params.BRANCH_NAME} https://github.com/swap1408/node-js-sample.git .
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🔧 Building Docker image: ${IMAGE_NAME}:${params.BRANCH_NAME}"
                sh "docker build -t ${IMAGE_NAME}:${params.BRANCH_NAME} ."
            }
        }

        stage('Clean Old Containers') {
            steps {
                echo "🧹 Removing existing container if any..."
                sh "docker rm -f ${CONTAINER_NAME} || true"
            }
        }

        stage('Run Docker Container') {
            steps {
                echo "🚀 Running container: ${CONTAINER_NAME}"
                sh """
                    docker run -d -p ${HOST_PORT}:${CONTAINER_PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}:${params.BRANCH_NAME}
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
