import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUpdateIntegrationBodyDto } from '@novu/shared';

import { errorMessage } from '../../utils/notifications';
import { updateIntegration } from '../integration';
import type { IntegrationEntity } from '../../pages/integrations/types';
import { successMessage } from '../../utils/notifications';
import { QueryKeys } from '../query.keys';

export const useUpdateIntegration = (integrationId: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateIntegrationMutation, isLoading: isLoadingUpdate } = useMutation<
    IntegrationEntity,
    { error: string; message: string; statusCode: number },
    {
      id: string;
      data: IUpdateIntegrationBodyDto;
    }
  >(({ id, data }) => updateIntegration(id, data), {
    onSuccess: async () => {
      await queryClient.refetchQueries({
        predicate: ({ queryKey }) =>
          queryKey.includes(QueryKeys.integrationsList) || queryKey.includes(QueryKeys.activeIntegrations),
      });
      successMessage('Instance configuration updated');
    },
    onError: (e: any) => {
      errorMessage(e.message || 'Unexpected error');
    },
  });

  const onUpdateIntegration = async (data: IUpdateIntegrationBodyDto) => {
    await updateIntegrationMutation({
      id: integrationId,
      data: { ...data, check: false },
    });
  };

  return {
    onUpdateIntegration,
    isLoadingUpdate,
  };
};
