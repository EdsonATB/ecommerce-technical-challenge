import dotenv from 'dotenv';
import app from './app';
import prisma from './utils/prisma';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {
    try {
        
        //testar conexao
        await prisma.$connect();
        console.log("Database connected!");
        
        //iniciar server
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
            console.log(`API available at: http://localhost:${PORT}/api`);
            console.log(`Health check at: http://localhost:${PORT}/api/health`);
        });
    } catch (err) {
        console.error(`Failed to start server. ${err}`);
        process.exit(1);
    }
}

process.on('SIGINT', async () => {
    console.log('\n Shutting down...');
    await prisma.$disconnect();
    console.log('Database disconnected!');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n Shutting down...');
    await prisma.$disconnect();
    console.log('Database disconnected!');
    process.exit(0);
});

startServer();