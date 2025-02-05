/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "challenge-random-number",
      removal: "remove",
      protect: false,
      home: "aws",
      providers: {
        aws: {
          profile: "default"
        }
      }
    };
  },
  async run() {
    const table = new sst.aws.Dynamo("RandomNumbers", {
      fields: {
        id: "number",
        number: "number"
      },
      primaryIndex: { hashKey: "id" },
      globalIndexes: {
        NumberIndex: { hashKey: "id", rangeKey: "number" },
      },
    });

    const api = new sst.aws.ApiGatewayV2("MyApi");

    api.route("GET /random", {
      handler: "packages/functions/src/controllers/randomNumberController.generateRandomNumberHandler",
      link: [table],
      permissions: [
        {
          actions: ["dynamodb:PutItem"],
          resources: ["arn:aws:dynamodb:us-east-1:*:table/*"]
        },
      ]
    });

    api.route("GET /random/logs", {
      handler: "packages/functions/src/controllers/randomNumberController.getLastRandomNumbersHandler",
      link: [table],
      permissions: [
        {
          actions: ["dynamodb:Query"],
          resources: ["arn:aws:dynamodb:us-east-1:*:table/*"]
        },
      ]
    });

    return {
      table: table.name,
    };
  },
});
