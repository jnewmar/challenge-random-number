# Random Number API

This project is a serverless application built with SST, providing an API to generate and retrieve random numbers using AWS DynamoDB and API Gateway.

## 🚀 Setup the Project Locally

To run the project in a local environment, use the following command:

```sh
npx sst dev --stage=local
```

This will start the SST development environment, allowing you to test the API locally.

## 🚀 Deploying the Application

To deploy the application to AWS, run:

```sh
npx sst deploy --stage=prod
```

This will deploy the infrastructure and application code to AWS.

## Running tests

```sh
npm test
```

## 📌 API Endpoints

### Generate a Random Number

- **Endpoint:** `GET /random`
- **Description:** Generates and stores a random number in DynamoDB.
- **Example Response:**
  ```json
  {
    "randomNumber": 58195
  }
  ```

### Retrieve Last 5 Random Numbers

- **Endpoint:** `GET /random/logs`
- **Description:** Retrieves the last five generated random numbers from DynamoDB.
- **Example Response:**
  ```json
  [80349, 26298, 18190, 98342, 61326]
  ```

## 🌍 Deployed API URLs

If deployed to AWS, the API can be accessed at:

- **Generate Random Number:** [https://8o4s075guh.execute-api.us-east-1.amazonaws.com/random](https://8o4s075guh.execute-api.us-east-1.amazonaws.com/random)
- **Retrieve Last 5 Numbers:** [https://8o4s075guh.execute-api.us-east-1.amazonaws.com/random/logs](https://8o4s075guh.execute-api.us-east-1.amazonaws.com/random/logs)

---

### 🛠 Technologies Used

- **SST (Serverless Stack)** for managing infrastructure.
- **AWS API Gateway** for handling API requests.
- **AWS DynamoDB** for storing random numbers.
- **AWS Lambda** for serverless function execution.
- **Node.js** for backend development.
- **Jest** for automated tests.

---
