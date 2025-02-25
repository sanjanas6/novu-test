import { StepTypeEnum, IWorkflowStepMetadata, JobStatusEnum } from '@novu/shared';
import { Types } from 'mongoose';

import { NotificationStepEntity } from '../notification-template';
import type { EnvironmentId } from '../environment';
import type { OrganizationId } from '../organization';
import type { ChangePropsValueType } from '../../types/helpers';

export { JobStatusEnum };

export class JobEntity {
  _id: string;
  identifier: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overrides: Record<string, Record<string, unknown>>;
  step: NotificationStepEntity;
  transactionId: string;
  _notificationId: string;
  subscriberId: string;
  _subscriberId: string;
  _environmentId: EnvironmentId;
  _organizationId: OrganizationId;
  providerId?: string;
  _userId: string;
  delay?: number;
  _parentId?: string;
  status: JobStatusEnum;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  createdAt: string;
  updatedAt: string;
  expireAt?: string;
  _templateId: string;
  digest?: IWorkflowStepMetadata & {
    events?: any[];
  };
  type?: StepTypeEnum;
  _actorId?: string;
}

export type JobDBModel = ChangePropsValueType<
  Omit<JobEntity, '_parentId' | '_actorId'>,
  '_notificationId' | '_subscriberId' | '_environmentId' | '_organizationId' | '_userId'
> & {
  _parentId?: Types.ObjectId;

  _actorId?: Types.ObjectId;
};
