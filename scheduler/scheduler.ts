import cron from 'node-cron';
import queue from './queues';

cron.schedule('0 0 * * *', () => { // Run at 00:00 every day
  queue.add('daily-api-fetch');
});