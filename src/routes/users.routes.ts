import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUsersService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const createUser = new CreateUsersService();

        const user = await createUser.execute({ name, email, password });

        delete user.password; // pra não mostrar a senha criada no body da resposta

        return res.json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (req, res) => {
        console.log(req.file);

        return res.json({ ok: true });
    },
);

export default usersRouter;
