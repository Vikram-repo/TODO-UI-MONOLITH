pipeline {
    agent any
    stages {
        stage ('install_dependecny') {
            steps {
                sh 'npm install'
            }
        }
        stage ('build_project') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
