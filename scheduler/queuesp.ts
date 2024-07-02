import queue from './queues';
import fetchApiData from './jobs';

queue.process('daily-api-fetch', fetchApiData);