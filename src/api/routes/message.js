import { Router } from 'express';

import MessageController from '../controllers/message';
import { validateRequest } from '../../middleware/validateRequest';

const messageRoute = Router();

const { getAllSmsSentByContact, getAllSmsSentToContact, sendSMStoContacts } = MessageController;

messageRoute.get('/sent', getAllSmsSentByContact);
messageRoute.get('/received', getAllSmsSentToContact);
messageRoute.post('/', validateRequest('message'), sendSMStoContacts);

export default messageRoute;