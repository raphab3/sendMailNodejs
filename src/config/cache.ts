import Redis from "ioredis";

class cache {
  redis = new Redis(
    process.env.REDIS_PORT,
    { keyPrefix: "cache:" }
  )




  async get(key: Redis.KeyType) {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  set(key: Redis.KeyType, value: any, timeExp: string | number | undefined) {
    return this.redis.set(key, JSON.stringify(value), "EX", timeExp);
  }

  del(key: Redis.KeyType) {
    return this.redis.del(key);
  }

  async delPrefix(prefix: any) {
    const keys = (await this.redis.keys(`cache:${prefix}:*`)).map((key) =>
      key.replace("cache:", "")
    );

    return this.redis.del(keys);
  }
}
export default new cache();
