import { supabase } from "../utils/supabase.js";

import { Users } from "../domain/GetTableDomain.js";

export const getTableLib = async (id: string) => {
    const res = await supabase.from("users").select(`*, user_skill (skill_id, skills (*))`).eq("user_id", id);
    if (res.error) {
        throw new Error(res.error.message);
    }
    const data = res.data.map((data) => {
        return Users.newUsers(data.user_id, data.name, data.description, data.github_id, data.qiita_id, data.x_id, data.user_skill);
    })
    return data;
}