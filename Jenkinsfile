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

        stage('Clean Old Containers & Images') {
            steps {
                sh '''
                    echo "🔍 Stopping containers running from image: $IMAGE_NAME"
                    docker ps -q --filter "ancestor=$IMAGE_NAME" | xargs -r docker stop

                    echo "🧹 Removing all containers from image: $IMAGE_NAME"
                    docker ps -a -q --filter "ancestor=$IMAGE_NAME" | xargs -r docker rm

                    echo "🧼 Removing old images with same name"
                    docker images "$IMAGE_NAME" --format "{{.ID}}" | xargs -r docker rmi -f || true

                    echo "🔌 Freeing up port $HOST_PORT if still bound"
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
            echo '✅ Build, cleanup, and deploy successful!'
        }
        failure {
            echo '❌ Build failed. Check console output for details.'
        }
    }
}
