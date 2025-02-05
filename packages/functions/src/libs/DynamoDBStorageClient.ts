import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { StorageClient } from "./StorageClient";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export class DynamoDBStorageClient extends StorageClient {
  async saveItem(tableName: string, item: Record<string, any>): Promise<void> {
    await docClient.send(new PutCommand({ TableName: tableName, Item: item }));
  }

  async getLastItems(tableName: string, limit: number): Promise<Record<string, any>[]> {
    const result = await docClient.send(new ScanCommand({ TableName: tableName, Limit: limit }));
    return result.Items || [];
  }
}