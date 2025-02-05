import { DynamoDBStorageClient } from "./DynamoDBStorageClient";
import { StorageClient } from "./StorageClient";
export class StorageClientFactory {
  static createClient(type: string): StorageClient {
    switch (type) {
      case "DynamoDB":
        return new DynamoDBStorageClient();
      default:
        throw new Error("Unsupported storage client type");
    }
  }
}