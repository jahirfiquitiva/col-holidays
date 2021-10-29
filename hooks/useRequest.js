import useSWR from 'swr';
import fetcher from '../lib/fetcher';

const useRequest = (url) => {
  const { data, error, mutate } = useSWR(url, fetcher);
  return {
    data,
    error,
    mutate,
    loading: !data && !error,
  };
};

export default useRequest;
