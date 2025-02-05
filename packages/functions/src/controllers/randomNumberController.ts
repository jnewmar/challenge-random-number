import { StorageClientFactory } from "../libs/StorageClientFactory";
import { RandomNumberService } from "../services/randomNumberService";
import { Resource } from "sst";
import { APIGatewayProxyResult } from "aws-lambda";

// TODO: put this into a config Service
const storageClient = StorageClientFactory.createClient("DynamoDB");
const randomNumberService = new RandomNumberService(storageClient, Resource.RandomNumbers.name);

export async function generateRandomNumberHandler(): Promise<APIGatewayProxyResult> {
  try {
    const result = await randomNumberService.generateAndStoreRandomNumber();
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    console.error("Error generating random number:", error);
    return { statusCode: 500, body: JSON.stringify({ message: "Internal Server Error" }) };
  }
}

export async function getLastRandomNumbersHandler(): Promise<APIGatewayProxyResult> {
  try {
    const result = await randomNumberService.getLastGeneratedNumbers(5);
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    console.error("Error fetching last random numbers:", error);
    return { statusCode: 500, body: JSON.stringify({ message: "Internal Server Error" }) };
  }
}