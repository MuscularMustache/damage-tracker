import Dexie from 'dexie';

// ReactSampleDB
const db = new Dexie('DamageTrackerDb');
db.version(1).stores({ enemies: '++id' });

export default db;
