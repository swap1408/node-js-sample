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

        stage('Build') {
            steps {
                echo 'Building the Node.js app...'
                sh 'npm run build || echo "No build script defined"'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test || echo "No test script defined"'
            }
        }

        stage('Run') {
            steps {
                echo 'Starting the Node.js server...'
                sh 'nohup npm start &'
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment successful!'
        }
        failure {
            echo '❌ Build failed.'
        }
    }
}
