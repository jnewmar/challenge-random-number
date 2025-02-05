import { StorageClient } from "../libs/StorageClient";

export class RandomNumberService {
  private storageClient: StorageClient;
  private tableName: string;

  constructor(storageClient: StorageClient, tableName: string) {
    this.storageClient = storageClient;
    this.tableName = tableName;
  }

  async generateAndStoreRandomNumber(): Promise<{ randomNumber: number }> {
    const randomNumber = Math.floor(Math.random() * 100000);
    const createdAt = Date.now();
    await this.storageClient.saveItem(this.tableName, { id: createdAt, number: randomNumber });
    return { randomNumber };
  }

  async getLastGeneratedNumbers(limit = 5): Promise<number[]> {
    const items = await this.storageClient.getLastItems(this.tableName, limit);
    return items.sort((a, b) => b.id - a.id).map(item => item.number);
  }
}