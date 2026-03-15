/**实现 LRUCache 类：
LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。
如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。**/
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (this.map.has(key)) {
      const value = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, value);
      return value;
    } else {
      return -1;
    }
  }
  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
      this.map.set(key, value);
    } else {
      if (this.map.size <= this.capacity) {
        // 删除map的第一个key
        this.map.delete(this.map.keys().next().value);
        this.map.set(key, value);
      }
    }
  }
}
const cache = new LRUCache(5);
cache.put(1, 2);
const val = cache.get(2);
console.log("val", val);
