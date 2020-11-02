import {useState, useEffect} from "react"
import ethers from "ethers"

const provider = new ethers.providers.Web3Provider(
  window.ethereum
);
const iface = new ethers.utils.Interface(
  require("contracts/StampProofs.json").abi
);

export default function useGetEvents() {
    const [hash, setHash] = useState("")
    const [success, setSuccess] = useState(null);
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const getLogs = async() => {
        // const network = await provider.getNetwork()
        // console.log(network)
        setLoading(true)
        setSubmitted(false)
        try {
          const logs = await provider.getLogs({
            fromBlock: 0,
            topics: [
              ethers.utils.id("stampProof(bytes32,uint256)"),
              ethers.utils.hexZeroPad(hash, 32),
            ],
          });
          console.log(logs)
          let index = 0;
          const _events = logs.map((log) => {
            ++index;
            const event = iface.parseLog(log).args;
            return {
              i: index,
              hash: event.hash.substring(2),
              date: new Date(event.timestamp.toNumber() * 1000),
            };
          });
          setEvents(_events)
          setSuccess(logs.length !== 0)
          if (logs.length === 0) setError("No stamps found for this document");     
        } catch {
          setSuccess(false)
          setError("Couldn't connect to eReuse blockchain through Metamask")
        }
        setLoading(false)
        setSubmitted(true)
    }
    
    useEffect(() => {
        if (hash !== "") getLogs()
    }, [hash]);

    return [
      loading,
      submitted,
      success,
      events,
      error,
      setHash,
    ];
}
