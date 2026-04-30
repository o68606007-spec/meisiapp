import { supabase } from "../src/utils/supabase";


export const deleteYesterdayData = async () => {
    const now = new Date();
    // 今日の0時
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 昨日の0時
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const from = yesterday.toISOString();
    const to = today.toISOString();
    const deleteUserSkill = await supabase.from("user_skill").delete().gte("created_at", from).lt("created_at", to);
    if (deleteUserSkill.error) {
        throw new Error(deleteUserSkill.error.message);
    }
    const deleteUser = await supabase.from("users").delete().gte("created_at", from).lt("created_at", to);
    if (deleteUser.error) {
        throw new Error(deleteUser.error.message);
    }

    console.log("Delete completed");
}