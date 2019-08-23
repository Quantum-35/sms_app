import express from 'express';

import authRoute from './authRoute';
import messages from './message';

const api = express();

api.use('/auth', authRoute);
api.use('/messages', messages);

export default api;