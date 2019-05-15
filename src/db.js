import Dexie from 'dexie';

const db = new Dexie('DamageTrackerDb');
db.version(1).stores({ enemies: '++id' });

export default db;
