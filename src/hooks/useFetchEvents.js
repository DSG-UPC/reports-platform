import { useReducer, useEffect } from "react";
import ethers from "ethers";

const iface = new ethers.utils.Interface(
  require("contracts/StampProofs.json").abi
);

const initialState = {
  status: "idle",
  error: null,
  data: [],
};

export default function useFetchEvents(hash) {
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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (hash === "") return;
    //check valid hash
    const fetchEvents = async () => {
      dispatch({ type: "FETCHING" });

      try {
        const logs = await provider.getLogs({
          fromBlock: 0,
          topics: [
            ethers.utils.id("stampProof(bytes32,uint256)"),
            ethers.utils.hexZeroPad(hash, 32),
          ],
        });

        let index = 0;
        const events = logs.map((log) => {
          ++index;
          const event = iface.parseLog(log).args;
          return {
            i: index,
            hash: event.hash.substring(2),
            date: new Date(event.timestamp.toNumber() * 1000),
          };
        });
        if (logs.length === 0)
          throw new Error("No stamps found for this document");
        else dispatch({ type: "FETCHED", payload: events });
      } catch (error) {
        if (error.code && error.code === -32603) error.message = "Couldn't connect to the blockchain"
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    fetchEvents();
  }, [hash]);

  return { stamps: state };
}
