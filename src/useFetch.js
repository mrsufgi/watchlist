import { useCallback, useState } from 'react';

function useFetch(request) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();
  const handler = useCallback(
    async (...args) => {
      if (isLoading) return;
      setIsLoading(true);
      const response = await request(...args);
      setResult(response);
      setIsLoading(false);
      return response;
    },
    [isLoading, request],
  );
  return [handler, result, isLoading];
}

export default useFetch;
