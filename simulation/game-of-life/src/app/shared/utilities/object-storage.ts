import * as deepmerge from 'deepmerge';

declare const localStorage: Storage;
declare const sessionStorage: Storage;

class ObjectStorage {
    constructor(private readonly storage: Storage) { }

    public getItem<T>(key: string, defaultData: T | (() => T) | null = null): T | null {
        if (!key) throw new Error(this.getItem.name + ' exception: No key specified.');

        try {
            const text = this.storage.getItem(key);
            const result = JSON.parse(text);

            if (result !== null) {

                if (defaultData === null) return result;
                if (defaultData instanceof Function) return result;
                if (typeof defaultData === 'string') return result;
                if (defaultData instanceof String) return result;

                return deepmerge(defaultData, result);
            }
        } catch {
        }

        if (defaultData instanceof Function) return defaultData();

        return defaultData;
    }

    public setItem<T>(key: string, value: T): void {
        if (!key) throw new Error(this.setItem.name + ' exception: No key specified.');

        const result: string = JSON.stringify(value);

        this.storage.setItem(key, result);
    }

    public removeItem(key: string): void {
        if (!key) throw new Error(this.removeItem.name + ' exception: No key specified.');

        this.storage.removeItem(key);
    }

    public clear(): void {
        this.storage.clear();
    }
}

export class LocalStorage {
    private static readonly storage = new ObjectStorage(localStorage);

    public static getItem<T>(key: string, defaultData: T | (() => T) | null = null): T | null {
        return this.storage.getItem<T>(key, defaultData);
    }

    public static setItem<T>(key: string, item: T): void {
        this.storage.setItem<T>(key, item);
    }

    public static removeItem(key: string) {
        this.storage.removeItem(key);
    }

    public static clear(): void {
        this.storage.clear();
    }
}

export class SessionStorage {
    private static readonly storage = new ObjectStorage(sessionStorage);

    public static getItem<T>(key: string, defaultData: T | (() => T) | null = null): T | null {
        return this.storage.getItem<T>(key, defaultData);
    }

    public static setItem<T>(key: string, item: T): void {
        this.storage.setItem<T>(key, item);
    }

    public static removeItem(key: string) {
        this.storage.removeItem(key);
    }

    public static clear(): void {
        this.storage.clear();
    }
}
