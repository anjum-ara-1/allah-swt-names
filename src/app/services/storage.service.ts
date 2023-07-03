import { Injectable } from '@angular/core';
import { DBConfig, NgxIndexedDBService } from 'ngx-indexed-db';

export const tableNames = {
  misc: 'misc',
  audio: 'Audio'
};

export const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 4,
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
    {
      store: tableNames.misc,
      storeConfig: { keyPath: 'name', autoIncrement: false },
      storeSchema: [
        { name: 'tag', keypath: 'tag', options: { unique: false } },
      ]
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
  addOrUpdateName<T>(tableName: string, obj: T) {
    return this.db.update(tableName, obj);
  }

  get<T>(tableName: string, key: string | number) {
    return this.db.getByID<T>(tableName, key);
  }
  
  deleteRecord(tableName: string, key: string | number) {
    return this.db.deleteByKey(tableName, key);
  }

  getByKey<T>(storeName: string, key: IDBValidKey) {
    return this.db.getByKey<T>(storeName, key);
  }
  
  addRecord<T>(tableName: string, obj: T) {
    return this.db.add<T>(tableName, obj);
  }
 
}
