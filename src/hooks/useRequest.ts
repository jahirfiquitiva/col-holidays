import useSWR from 'swr';
import { MutatorCallback, SWRConfiguration, Fetcher } from 'swr/dist/types';

import fetcher from '@/lib/fetcher';

interface SwrData<T = unknown> {
  data?: T | null;
  loading: boolean;
  error?: string | unknown | null;
  mutate?: (
    data?: T | Promise<T> | MutatorCallback<T>,
    shouldRevalidate?: boolean,
  ) => Promise<T | undefined>;
}

const useRequest = <T>(
  url: string,
  config:
    | SWRConfiguration<T, Error, Fetcher<T, string>>
    | undefined = undefined,
): SwrData<T> => {
  const { data, error, mutate } = useSWR<T>(url, fetcher, config);
  return {
    data,
    error,
    mutate,
    loading: !data && !error,
  };
};

export default useRequest;
