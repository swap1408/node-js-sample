pipeline {
    agent any

    parameters {
        choice(
            name: 'BRANCH',
            choices: ['dev', 'qa', 'main'],
            description: 'Select the branch to deploy'
        )
    }

    environment {
        IMAGE_NAME = 'node-app'
        CONTAINER_PORT = '80'
        HOST_PORT = '80'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "Checking out branch: ${params.BRANCH}"
                git branch: "${params.BRANCH}", url: 'https://github.com/swap1408/node-js-sample.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "Building Docker image: $IMAGE_NAME"
                    docker build -t $IMAGE_NAME .
                '''
            }
        }

        stage('Clean Old Containers') {
            steps {
                sh '''
                    echo "Stopping containers from image: $IMAGE_NAME"
                    docker ps -q --filter ancestor=$IMAGE_NAME | xargs -r docker stop || true

                    echo "Removing stopped containers"
                    docker ps -a -q --filter ancestor=$IMAGE_NAME | xargs -r docker rm || true
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                    echo "Running Docker container"
                    docker run -d -p $HOST_PORT:$CONTAINER_PORT --name ${IMAGE_NAME}_container $IMAGE_NAME
                '''
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
    }
}
