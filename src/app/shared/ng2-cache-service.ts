import { NgModule } from '@angular/core';
import { CacheLocalStorage } from './services/storage/local-storage/cache-local-storage.service';
import { CacheMemoryStorage } from './services/storage/memory/cache-memory.service';
import { CacheSessionStorage } from './services/storage/session-storage/cache-session-storage.service';
import { CacheStorageAbstract } from './services/storage/cache-storage-abstract.service';
import { CacheStoragesEnum } from './enums/cache-storages.enum';
import { CacheService } from './services/cache.service';



export { CacheService } from './services/cache.service';
@NgModule({
    providers: [CacheService, { provide: CacheStorageAbstract, useClass: CacheLocalStorage }]
})
export class LocalStorageServiceModule { }
