// Database setup script - creates contact_submissions table
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function setupDatabase() {
    const databaseUrl = process.env.NETLIFY_DATABASE_URL || process.env.NEON_DATABASE_URL;

    if (!databaseUrl) {
        console.error('❌ NETLIFY_DATABASE_URL environment variable not set!');
        console.log('\nPlease set it in your .env file or Netlify dashboard:');
        console.log('NETLIFY_DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require');
        process.exit(1);
    }

    const sql = neon(databaseUrl);

    try {
        console.log('🔧 Creating contact_submissions table...');

        await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        service VARCHAR(100),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

        console.log('✅ Table created successfully!');

        // Test query
        const result = await sql`SELECT COUNT(*) as count FROM contact_submissions`;
        console.log(`📊 Current submissions in database: ${result[0].count}`);

    } catch (error) {
        console.error('❌ Error setting up database:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    setupDatabase();
}

module.exports = { setupDatabase };
