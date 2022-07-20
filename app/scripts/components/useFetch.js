import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      setLoading(true);
      setData(null);
      setError(null);
      const source = axios.CancelToken.source();
      //console.log('Yeah!!!')
      axios.get(url, { cancelToken: source.token })
      .then(res => {
          setLoading(false);
          console.log('response', res)
          res.data.data && setData(res.data.data);
      })
      .catch(err => {
          setLoading(false)
          setError('An error occurred. Awkward..')
          console.log(error)
      })
      return () => {
          source.cancel();
      }
  }, [url])

  return { data, loading, error }
}
export default useFetch;