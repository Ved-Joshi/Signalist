import { MongoClient, Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var __mongo__: { client: MongoClient | null; promise: Promise<MongoClient> | null } | undefined;
}

globalThis.__mongo__ ??= { client: null, promise: null };

export const getMongoDb = async (): Promise<Db> => {
  const cache = globalThis.__mongo__!;
  if (cache.client) return cache.client.db();

  if (!cache.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI must be set within .env");
    cache.promise = new MongoClient(uri).connect();
  }

  const client = await cache.promise;
  cache.client = client;
  return client.db();
};
