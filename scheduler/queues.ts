import Bull from 'bull';

const queue = new Bull('daily-api-fetch');

export default queue; 