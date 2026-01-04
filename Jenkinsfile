pipeline {
  agent any
  stages {
    stage('step2') {
      steps {
        echo 'hello jenkins'
        sh '''npm install
npm run build'''
      }
    }

  }
}