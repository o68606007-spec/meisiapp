import { deleteYesterdayData } from "./deleteYesterdayData.js";

deleteYesterdayData()
    .then(() => {
        console.log("Batch success");
    })
    .catch((err) => {
        console.error("Batch error:", err);
    });