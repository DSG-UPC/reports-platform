import { useReducer, useEffect } from "react"

const initialState = {
  status: "idle",
  error: null,
  data: [],
  type: null,
}

export default function useFetchApi(url, type = "json") {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching" }
      case "FETCHED":
        return {
          ...initialState,
          status: "fetched",
          data: action.payload,
          type: action.datatype,
        }
      case "FETCH_ERROR":
        return { ...initialState, status: "error", error: action.payload }
      case "IDLE":
        return { ...initialState }
      default:
        return state
    }
  }, initialState)

  const reset = () => {
    dispatch({ type: "IDLE" })
  }

  useEffect(() => {
    let cancelRequest = false
    if (!url) {
      reset()
      return
    }

    const fetchData = async () => {
      dispatch({ type: "FETCHING" })
      try {
        const response = await fetch(url)
        if (type === "json") {
          const res = await response.json()
          if (res.status !== "success") throw new Error(res.message)
          if (cancelRequest) return
          dispatch({ type: "FETCHED", payload: res.data, datatype: "json" })
        } else if (type === "pdf") {
          const res = await response.blob()
          // TODO: when fetch gives back an json response with an error
          const fileurl = URL.createObjectURL(res)
          window.open(fileurl)
          if (cancelRequest) return
          dispatch({ type: "FETCHED", payload: null })
        }
      } catch (error) {
        if (cancelRequest) return
        dispatch({
          type: "FETCH_ERROR",
          payload: error.message,
          datatype: "pdf",
        })
      }
    }

    fetchData()

    return function cleanup() {
      cancelRequest = true
    }
  }, [url])

  return state
}
