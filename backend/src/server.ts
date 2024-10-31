import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';
import { purchaseHandler } from './purchase-handler';

const app = new Koa();
const router = new Router();
const PORT = 3000;

app.use(bodyParser());
app.use(logger());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

// Routes
router.post('/purchase', purchaseHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
