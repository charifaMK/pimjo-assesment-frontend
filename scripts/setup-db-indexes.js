const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');

async function setupIndexes() {
  try {
    console.log('Setting up database indexes for better auth performance...');
    
    const client = createClient({
      url: process.env.TURSO_CONNECTION_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    // read and execute the migration file
    const migrationPath = path.join(__dirname, '../db/migrations/add_indexes.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // execute each sql statement individually
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      await client.execute(statement);
    }

    console.log('✅ Database indexes created successfully!');
    console.log('Your authentication performance should now be significantly improved.');
    
    await client.close();
  } catch (error) {
    console.error('❌ Error setting up indexes:', error);
    process.exit(1);
  }
}

setupIndexes();