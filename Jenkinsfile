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

        stage('Clean Old Containers') {
            steps {
                sh '''
                    echo "🔍 Stopping any running containers using image: $IMAGE_NAME..."
                    docker ps -q --filter "ancestor=$IMAGE_NAME" | xargs -r docker stop

                    echo "🧹 Removing all containers (running or exited) using image: $IMAGE_NAME..."
                    docker ps -a -q --filter "ancestor=$IMAGE_NAME" | xargs -r docker rm

                    echo "🔌 Freeing up port $HOST_PORT if still bound..."
                    docker ps --format "{{.ID}}: {{.Ports}}" | grep ":$HOST_PORT" | cut -d: -f1 | xargs -r docker stop
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
        success {
            echo '✅ Build and container deployed successfully!'
        }
        failure {
            echo '❌ Build failed. Please check logs and running containers.'
        }
    }
}
