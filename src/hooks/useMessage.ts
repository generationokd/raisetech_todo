import { useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

type Props = {
  title: string;
  status: 'success' | 'error';
  duration: number;
};

export const useMessage = () => {
  const toast = useToast();
  const showMessage = useCallback(
    (props: Props) => {
      const { title, status, duration } = props;
      toast({
        title,
        status,
        position: 'top',
        duration,
        isClosable: true,
      });
    },
    [toast]
  );
  return { showMessage };
};
