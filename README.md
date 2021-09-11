## Introduction

The DataAnalyzer microservice provides REST APIs. The APIs are being used by the client Apps. The responsibility of this microservice is to provide analytics of user behavioral data. It calculates average clicks count user performs during a given time period and also provides average time user spent on a specific screen. More info can be found by checking the swagger UI.

## Architecture diagram of the whole system

![Architecture diagram](./docs/image/ArchDiagram.png)

## Sequence diagram of the whole system

![Sequence diagram](./docs/image/SequenceDiagram.png)

#### Datastores
1. Amazon DynamoDB - This is the main database of this microservice. The database are being updated by DataProcessor Lambda function(see the above diagrams). Data analyzer reads the aggregated data from database and provides to the clients.


#### Environmental variables      
| ENV Variable | Description |
| ------------ | ----------- |
| NODE_ENV | Environment in which microservice will run. |
| PORT | The port where the service will be listening to |
| LOG_LEVEL | Log level |
| AWS_ACCESS_KEY_ID | AWS credential to access S3 |
| AWS_SECRET_ACCESS_KEY | AWS credential to access S3 |

#### Run service locally
###### In order to run service, follow these simple steps:
    1. npm install
    2. Provide list of env variables in 'root/.env-dev' file with following format: envVar=value
    3. npm start

#### Deployment
##### Production 
- The service is deployed with k8s using AWS EKS
##### Local
- The service is running with Docker and integrated with LocalStack in order to use AWS DynamoDB

#### Available APIs
After running the service locally, go to your browser and see the APIs with this Url: http://localhost:8080/swagger

#### Maintainer contact
- vahagsaribeyan@gmail.com
