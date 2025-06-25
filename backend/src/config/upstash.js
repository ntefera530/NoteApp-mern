import {Ratelimit} from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import dotenv from 'dotenv';

dotenv.config();    

//creates a ratelimiter that allows 10 requests per minute
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, '1 m'),
    analytics: true,
});

export default ratelimit;