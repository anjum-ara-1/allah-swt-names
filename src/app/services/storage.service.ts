import { Injectable } from '@angular/core';
import { DBConfig, NgxIndexedDBService } from 'ngx-indexed-db';

export const tableNames = {
  audio: 'Audio',
};

export const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 3,
  objectStoresMeta: [
    {
      store: 'Audio',
      storeConfig: {
        keyPath: 'name',
        autoIncrement: false,
      },
      storeSchema: [
        { name: 'inUse', keypath: 'inUse', options: { unique: false } },
      ],
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private db: NgxIndexedDBService) {}
  
  addOrUpdate<T>(tableName: string, obj: T) {
    return this.db.update(tableName, obj);
  }

  get(tableName: string, key: string | number) {
    return this.db.getByID(tableName, key);
  }
}
