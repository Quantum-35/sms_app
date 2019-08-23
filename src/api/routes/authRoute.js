import { Router } from 'express';

import AuthController from '../controllers/auth';
import { validateRequest, validateUsername, validateEmail }  from '../../middleware/validateRequest';


const authRoute = Router();
const { signup, login , verifyAccount, deleteContact} = AuthController;

authRoute.post('/signup', validateRequest('signup'), validateUsername, validateEmail, signup);
authRoute.post('/login', login);
authRoute.get('/verify-account', verifyAccount);
authRoute.delete('/delete/:id', deleteContact);

export default authRoute;