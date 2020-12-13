import { useReducer, useEffect } from "react"

const initialState = {
  status: "idle",
  error: null,
  data: [],
}

export default function useFetch(url, options) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching" }
      case "FETCHED":
        return {
          ...initialState,
          status: "fetched",
          data: action.payload,
        }
      case "FETCH_ERROR":
        return { ...initialState, status: "error", error: action.payload }
      case "IDLE":
        return { ...initialState }
      default:
        return state
    }
  }, initialState)

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCHING" })
      try {
        const response = await fetch(url, options)
        const res = await response.json()
        if (res.status !== "success") throw new Error(res.message)
        dispatch({ type: "FETCHED", payload: res.data })
      } catch (error) {
        dispatch({
          type: "FETCH_ERROR",
          payload: error.message,
        })
      }
    }

    fetchData()
  }, [url])

  return state
}
