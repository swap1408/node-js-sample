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
                    echo "🔍 Checking for old containers on port $HOST_PORT..."

                    # Stop running containers using the same port
                    CONTAINERS=$(docker ps -q --filter "publish=$HOST_PORT")
                    if [ -n "$CONTAINERS" ]; then
                        echo "⚠️ Stopping containers: $CONTAINERS"
                        docker stop $CONTAINERS
                    fi

                    # Remove all containers using the same port (even stopped)
                    ALL_CONTAINERS=$(docker ps -a -q --filter "publish=$HOST_PORT")
                    if [ -n "$ALL_CONTAINERS" ]; then
                        echo "🧹 Removing containers: $ALL_CONTAINERS"
                        docker rm $ALL_CONTAINERS
                    fi
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
            echo '✅ Build and deployment successful!'
        }
        failure {
            echo '❌ Build failed. Please check error logs.'
        }
    }
}
