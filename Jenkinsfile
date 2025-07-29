pipeline {
    agent { label 'agent1' }

    environment {
        IMAGE_NAME = 'node-app'
        CONTAINER_PORT = '3000'
        HOST_PORT = '3000'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/swap1408/node-js-sample.git'
            }
        }

        stage('Clean Old Container') {
            steps {
                sh '''
                    # Stop and remove old container if exists
                    docker ps -q --filter "ancestor=$IMAGE_NAME" | xargs -r docker stop
                    docker ps -aq --filter "ancestor=$IMAGE_NAME" | xargs -r docker rm
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Run Container') {
            steps {
                sh "docker run -d -p $HOST_PORT:$CONTAINER_PORT $IMAGE_NAME"
            }
        }
    }

    post {
        failure {
            echo '❌ Build failed!'
        }
        success {
            echo '✅ Build completed successfully.'
        }
    }
}
