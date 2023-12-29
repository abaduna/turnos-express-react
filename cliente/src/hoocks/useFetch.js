import { useCallback, useEffect, useReducer, useState } from "react";
import { API } from "../API";
import { fechReducer, initialState } from "../reducer/fecht";
import { FETCH_DATA } from "./../action/Fetch";

export const useFetch = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  const [state, dispatch] = useReducer(fechReducer, initialState);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let { data } = await API.get(endpoint);
      dispatch({ type: FETCH_DATA.SET_DATA, payload: data });
      console.log(data);
    } catch (error) {
      dispatch({ type: FETCH_DATA.SET_ERROR });
    } 
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [endpoint,fetchData]);

  return { state, fetchData }
};
