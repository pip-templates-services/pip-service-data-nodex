let EntitiesLambdaFunction = require('obj/src/containers/EntitiesLambdaFunction').EntitiesLambdaFunction;

exports.handler = new EntitiesLambdaFunction().getHandler();