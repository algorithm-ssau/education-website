export default class LocalStorageHelper {
  public static GetItem<T>(key: string): T | null {
    const storedJson = localStorage.getItem(key);
    if (!storedJson) return null;
    return JSON.parse(storedJson) as T;
  }

  public static SetItem<T>(key: string, value: T): void {
    const jsonToStore = JSON.stringify(value);
    localStorage.setItem(key, jsonToStore);
  }

  public static RemoveItem(key: string): void {
    localStorage.removeItem(key);
  }
}
