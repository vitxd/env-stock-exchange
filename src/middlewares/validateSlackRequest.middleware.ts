import { verifySlackRequest } from '@slack/bolt';
import { NextFunction, Request, Response } from 'express';
import qs from 'qs';

import { config } from '../../config';

const validateSlackRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const rawBody = qs.stringify(req.body, { format: 'RFC1738' });
  const options = {
    signingSecret: config.slackApp.signingSecret,
    body: rawBody,
    headers: {
      'x-slack-signature': (req.headers['x-slack-signature'] ?? '') as string,
      'x-slack-request-timestamp': +(
        req.headers['x-slack-request-timestamp'] || '0'
      ) as number,
    },
  };

  verifySlackRequest(options);

  next();
};

export default validateSlackRequest;
