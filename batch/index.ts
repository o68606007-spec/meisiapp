import { deleteYesterdayData } from "./deleteYesterdayData";

deleteYesterdayData()
    .then(() => {
        console.log("Batch success");
    })
    .catch((err) => {
        console.error("Batch error:", err);
    });