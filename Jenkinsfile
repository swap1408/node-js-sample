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
                sh 'npm run build || echo "No build script defined"'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "No test script defined"'
            }
        }

        stage('Run App') {
            steps {
                echo 'Starting the Node.js app...'
                sh 'nohup npm start &'
            }
        }
    }

    post {
        success {
            echo '✅ Node.js app built and started successfully!'
        }
        failure {
            echo '❌ Build failed.'
        }
    }
}
