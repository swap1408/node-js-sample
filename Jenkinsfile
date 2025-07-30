pipeline {
    agent { label 'slave' }

    environment {
        IMAGE_NAME = 'node-app'
        CONTAINER_PORT = '80'
        HOST_PORT = '80'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Clean Old Containers & Images') {
            steps {
                sh '''
                    echo "🔍 Stopping containers running from image: $IMAGE_NAME"
                    docker ps -q --filter "ancestor=$IMAGE_NAME" | xargs -r docker stop

                    echo "🧹 Removing containers using the image"
                    docker ps -a -q --filter "ancestor=$IMAGE_NAME" | xargs -r docker rm

                    echo "🧼 Removing old versions of the image"
                    docker images "$IMAGE_NAME" --format "{{.ID}}" | xargs -r docker rmi -f || true

                    echo "🧽 Removing dangling images"
                    docker images -f "dangling=true" -q | xargs -r docker rmi -f || true

                    echo "🔌 Freeing port $HOST_PORT if any container is still using it"
                    docker ps --format '{{.ID}} {{.Ports}}' | grep ":$HOST_PORT" | cut -d' ' -f1 | xargs -r docker stop
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "🛠️ Building Docker image: $IMAGE_NAME"
                    docker build -t $IMAGE_NAME .
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                    echo "🚀 Running container on port $HOST_PORT"
                    docker run -d -p $HOST_PORT:$CONTAINER_PORT $IMAGE_NAME
                '''
            }
        }
    }

    post {
        failure {
            echo "❌ Build failed!"
        }
        success {
            echo "✅ Build and container deployment succeeded!"
        }
    }
}
