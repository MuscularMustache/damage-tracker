import Dexie from 'dexie';

const db = new Dexie('DamageTrackerDb');
db.version(1).stores({
  enemies: '++id',
  dmEnemies: '++id'
});

export default db;
