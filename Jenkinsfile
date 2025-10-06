pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'nodejs', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/swap1408/node-js-sample.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run App') {
            steps {
                echo 'Starting Node.js app...'
                sh 'nohup npm start &'
            }
        }
    }

    post {
        success {
            echo '✅ Node.js app started successfully!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
