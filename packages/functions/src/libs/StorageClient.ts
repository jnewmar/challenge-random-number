export abstract class StorageClient {
  abstract saveItem(tableName: string, item: Record<string, any>): Promise<void>;
  abstract getLastItems(tableName: string, limit: number): Promise<Record<string, any>[]>;
}
