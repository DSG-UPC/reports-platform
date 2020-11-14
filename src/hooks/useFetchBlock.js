import { useReducer, useEffect } from "react";
import ethers from "ethers";

const initialState = {
  status: "idle",
  error: null,
  data: [],
};

export default function useFetchBlock(blocknum) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching" };
      case "FETCHED":
        return { ...initialState, status: "fetched", data: action.payload };
      case "FETCH_ERROR":
        return { ...initialState, status: "error", error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!blocknum) return;

    const getBlock = async () => {
      dispatch({ type: "FETCHING" });

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const block = await provider.getBlockWithTransactions(Number(blocknum));
        if (block === null) throw new Error("Block not found");
        else if (cancelRequest) return;
        else dispatch({ type: "FETCHED", payload: block });
      } catch (error) {
        if (cancelRequest) return;
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    getBlock();

    return function cleanup() {
      cancelRequest = true;
    };
  }, []);

  return state;
}
