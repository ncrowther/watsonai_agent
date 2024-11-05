# wxoaiagent
Watsonx AI agent


### Deploying to Code Engine

1.	Open Git Bash shell from VSC

2.	Login to IBM Cloud.

    ibmcloud login --sso

3.	In the IBM Cloud console, go to Manage > Account > Account resources > Resource groups.  Select the resource group for Code Engine. E.g. default

    ibmcloud target -g default

4.	Select the code engine project:  

    ibmcloud ce project select -n [PROJECT_NAME]

5.	Start Docker Desktop

    docker login -u ncrowthe -p C****!

7.	Within this folder, edit CEbuild.sh and CErun.sh and change the REGISTRY to your Docker registry.

8.	Using the same bash shell, deploy the sample application to your docker repo:

./CEbuild

9.	Deploy the application to Code Engine on IBM Cloud. From the app's folder do:

./CErun

10.	Open the URL using the IBM Cloud Code Engine route for the application

## Learn More about React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).