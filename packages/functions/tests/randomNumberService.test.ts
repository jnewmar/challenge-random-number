// src/tests/randomNumberService.test.ts
import { RandomNumberService } from "../src/services/randomNumberService";
import { StorageClient } from "../src/libs/StorageClient";

class MockStorageClient extends StorageClient {
  private db: Record<string, any>[] = [];

  async saveItem(tableName: string, item: Record<string, any>): Promise<void> {
    this.db.push(item);
  }

  async getLastItems(tableName: string, limit: number): Promise<Record<string, any>[]> {
    return this.db.sort((a, b) => b.id - a.id).slice(0, limit);
  }
}

describe("RandomNumberService", () => {
  let service: RandomNumberService;
  let mockStorageClient: MockStorageClient;

  beforeEach(() => {
    mockStorageClient = new MockStorageClient();
    service = new RandomNumberService(mockStorageClient, "RandomNumbers");
  });

  test("should generate and store a random number", async () => {
    const result = await service.generateAndStoreRandomNumber();
    expect(result).toHaveProperty("randomNumber");
    expect(typeof result.randomNumber).toBe("number");
  });

  test("should return last 5 generated numbers", async () => {
    for (let i = 0; i < 10; i++) {
      await service.generateAndStoreRandomNumber();
    }

    const numbers = await service.getLastGeneratedNumbers(5);
    expect(numbers.length).toBe(5);
    expect(numbers).toEqual(numbers.sort((a, b) => b - a));
  });

  test("should return empty array if no numbers exist", async () => {
    const numbers = await service.getLastGeneratedNumbers();
    expect(numbers).toEqual([]);
  });
});
