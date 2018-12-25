# Streaming Service Web App 

A music service which allows easily share music across devices by storing it 
in a cloud and stream it. Developed as an alternative to traditional streaming 
services one of the main advantages of which besides a huge music library 
is ability to share music across devices. Ideal for those who have a local music 
collection and don't want to buy a subscription to the streaming service. Also, as service 
deployed decentralized, it's easy to share your server with your friends. Just send a link 
to your service to friends you want to invite and here it is! Use the same username to listen and 
modify one playlist or use different usernames to have individual playlists.

![alt text](https://raw.githubusercontent.com/mboldysh/streaming-service-webapp/master/images/screenshot1.png) 

## Deployment 

For now only AWS deployments scripts are supported. But you can write your own... 

To deploy to AWS: 

### 1. Deploy backend 

At first deploy backed infrastructure. Go to backend 
github [`repository`](https://github.com/mboldysh/streaming-service) and follow steps from deployment section.

### 2. Deploy Web App 

AWS CLI:

To deploy Web App you need to setup AWS CLI. Detailed information can be found
here: https://aws.amazon.com/cli/

Deploy stack: 

```console 
# clone project repository and open it 
git clone https://github.com/mboldysh/streaming-service-webapp 
cd streming-service-webapp 
# install dependencies
npm install
# After backend infrastructure were deployed load balancer address can be found in cloudforamation stack output.
#   1. Copy load balancer url from cloudformation stack output
#   2. Open src/api/index.js
#   3. Uncomment axios.default.baseURL line 
#   3. Paste load balancer url into it
#       axios.defaults.baseURL = `<load balancer url address>`;
# create production build 
npm run build 
# open cloudformation folder and deploy cloudformation template which creates s3 bucket for hosting web app.
cd cloudformation
aws --region <A name of region> cloudformation create-stack --stack-name streaming-service-webapp \
--template-body file://s3StaticWebsite.yml \
--parameters ParameterKey=UserName,ParameterValue=<A name of the AWS user> \
ParameterKey=BucketName,ParameterValue=<A name of a bucket which will store web app>
# After cloudformation stack will be deployed, the next step is to sync production build to bucket.
cd ../build
aws s3 sync . s3://<Name of bucket>
``` 

After these steps streaming service will be available at http://{bucketName}.s3-website.{region}.amazonaws.com where 
bucketName and region - variables specified in aws cloudformation deployment command.

## Development Setup 

Firstly, setup backend infrastructure. There are two options: 

1. Deploy backend infrastructure to AWS 
2. Setup local 

Both of them described in streaming-service repository README file. 

Secondly, setup webapp locally: 

```console 
# clone project repository and open it 
git clone https://github.com/mboldysh/streaming-service-webapp 
cd streming-service-webapp 
# install dependencies 
npm install
# Depends on which option you choose to setup backend infrastructure backend url needed to be setuped.
# If backend infrastructure setuped locally no additional actions is needed.
# If backend infrastructure deployed to AWS follow the next steps:
#   1. Copy load balancer url from cloudformation stack output
#   2. Open package.json
#   3. Paste load balancer url into proxy:
#       "proxy": "<load balancer url address>"
# run development server 
npm start 
``` 
Upon completing these steps application will be available at localhost:3000