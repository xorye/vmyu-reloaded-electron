import { IDatabase } from './IDatabase';
import { LocalDatabase } from './LocalDatabase';

let database: IDatabase | undefined;

export function getDatabase(): IDatabase | undefined {
  if (false) {
    return undefined;
  } else {
    if (!database) {
      database = new LocalDatabase();
    }
    return database;
  }
}
