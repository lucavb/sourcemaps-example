import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestCounterMiddleware implements NestMiddleware {
    use({ cookies, originalUrl, headers }: Request, res: Response, next: NextFunction) {
        if (originalUrl.endsWith('.map')) {
            res.cookie('foo', 'bar');
            res.cookie('ghost', 'cookie');
            res.cookie('id', uuidv4());
            res.cookie('date', new Date().toISOString());
            if (headers['user-agent']) {
                res.cookie('user-agent', headers['user-agent']);
            }

            if (!!cookies && typeof cookies.counter === 'string') {
                try {
                    const intVal = parseInt(cookies.counter);
                    res.cookie('counter', intVal + 1);
                } catch (e) {}
            } else {
                res.cookie('counter', 1);
            }
        }

        next();
    }
}
