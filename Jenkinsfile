pipeline {
    agent { label 'agent-node' }

    environment {
        IMAGE_NAME = 'node-app'
        CONTAINER_PORT = '80'
        HOST_PORT = '80'
    }

    stages {

        // ---------- DEV ----------
        stage('Deploy Dev') {
            steps {
                script {
                    deployBranch('dev')
                }
            }
        }

        // ---------- QA ----------
        stage('Deploy QA') {
            steps {
                script {
                    deployBranch('qa')
                }
            }
        }

        // ---------- MASTER ----------
        stage('Deploy Master') {
            steps {
                script {
                    deployBranch('master')
                }
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

def deployBranch(branchName) {
    echo "🚩 Deploying branch: ${branchName}"

    // Define a unique container name per branch
    def containerName = "node-app_${branchName}"

    sh """
        echo '📦 Checking out code from branch: ${branchName}'
        rm -rf *
        git clone --single-branch --branch ${branchName} https://github.com/swap1408/node-js-sample.git .
    """

    sh """
        echo '🔧 Building Docker image for ${branchName}...'
        docker build -t ${IMAGE_NAME}:${branchName} .
    """

    sh """
        echo '🧹 Removing old container: ${containerName}'
        docker rm -f ${containerName} || true
    """

    sh """
        echo '🚀 Running container: ${containerName}'
        docker run -d -p ${HOST_PORT}:${CONTAINER_PORT} --name ${containerName} ${IMAGE_NAME}:${branchName}
    """
}
