/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ApiHeaderGuard extends AuthGuard('x-api-key') { }
