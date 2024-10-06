import { type Request, type Response, Router } from 'express';

import validateSlackRequest from '../middlewares/validateSlackRequest.middleware';
import { splitSlackCommand } from '../service';
import { commandResolver } from '../service/slackCommands';

const router = Router();

router.post(
  '/environment',
  validateSlackRequest,
  async (req: Request, res: Response) => {
    const cmd = splitSlackCommand(req.body.text);

    let text = '';
    let response_type = 'in_channel';
    try {
      text = await commandResolver(cmd, req.body.user_name);
    } catch (e: unknown) {
      response_type = 'ephemeral';
      text = 'Unknown error';
      if (e instanceof Error) {
        text = e.message;
      }
    }

    res.json({
      response_type,
      text,
    });
  },
);

export default router;
