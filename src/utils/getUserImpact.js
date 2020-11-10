import {getDeviceImpact} from "utils";

export default function getUserImpact(devices) {
    let totalExtendedUsage = 0
    for (let device of devices) {
        const {extendedUsage} = getDeviceImpact(device)
        totalExtendedUsage += extendedUsage
    }
    return {totalExtendedUsage}
}
