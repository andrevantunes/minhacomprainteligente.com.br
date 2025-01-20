import { Session } from 'src/session/entities/session.entity';
import { Users } from '../../../users/entities/user.entity';

export type JwtPayloadType = Pick<Users, 'id' | 'role'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
