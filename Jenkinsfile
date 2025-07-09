pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/swap1408/node-js-sample.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('node-app')
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker rm -f node-app || true'
                    sh 'docker run -d -p 3000:3000 --name node-app node-app'
                }
            }
        }
    }
}
