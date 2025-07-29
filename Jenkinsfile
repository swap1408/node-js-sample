pipeline {
  agent {
    label 'agent1'
  }
  stages {
    stage('Clone Repo') {
      steps {
        git 'https://github.com/swap1408/node-js-sample.git'
      }
    }
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t node-app .'
      }
    }
    stage('Run Container') {
      steps {
        sh 'docker run -d -p 3000:3000 node-app'
      }
    }
  }
}
