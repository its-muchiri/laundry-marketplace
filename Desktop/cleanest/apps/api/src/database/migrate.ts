import { DataSource } from 'typeorm';
import dataSource from './data-source';

async function runMigrations() {
  console.log('🔄 Running database migrations...');

  try {
    await dataSource.initialize();
    console.log('✅ Database connected');

    const migrations = await dataSource.runMigrations();

    if (migrations.length === 0) {
      console.log('ℹ️  No pending migrations');
    } else {
      console.log(`✅ Applied ${migrations.length} migration(s):`);
      migrations.forEach(m => console.log(`   - ${m.name}`));
    }
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

runMigrations();
