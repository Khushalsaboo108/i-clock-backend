import app from './app';
import 'dotenv/config';
import { connectToDatabase } from './config/dbConnect';

const PORT = Number(process.env.PORT) || 5000;

const start = async () => {
  try {
    const isConnected = await connectToDatabase();
    if (!isConnected) {
      console.warn('Server started, but database connection failed');
    }

    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
