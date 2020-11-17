import { useReducer, useEffect } from "react"
import ethers from "ethers"

const initialState = {
  status: "idle",
  error: null,
  data: [],
}

const iface = new ethers.utils.Interface(
  require("contracts/DepositDevice.json").abi
)

export default function useFetchBlockLogs(blocknum) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching" }
      case "FETCHED":
        return { ...initialState, status: "fetched", data: action.payload }
      case "FETCH_ERROR":
        return { ...initialState, status: "error", error: action.payload }
      default:
        return state
    }
  }, initialState)

  useEffect(() => {
    let cancelRequest = false
    if (!blocknum) return

    const getBlockLogs = async () => {
      dispatch({ type: "FETCHING" })

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const logs = await provider.getLogs({
          fromBlock: Number(blocknum),
          toBlock: Number(blocknum),
        })
        const events = logs.map((log) => {
          return iface.parseLog(log).args
        })
        if (events === null) throw new Error("Events not found in this block")
        else if (cancelRequest) return
        else dispatch({ type: "FETCHED", payload: events })
      } catch (error) {
        if (cancelRequest) return
        dispatch({ type: "FETCH_ERROR", payload: error.message })
      }
    }

    getBlockLogs()

    return function cleanup() {
      cancelRequest = true
    }
  }, [])

  return state
}
