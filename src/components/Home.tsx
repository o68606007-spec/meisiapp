import { memo, FC } from "react";
import { Input, Field, Stack, Button, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { supabase } from "../utils/supabase";
import { useNavigate, Link } from "react-router-dom";

export const Home: FC = memo(() => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const navigate = useNavigate();
    const onClick = handleSubmit( async () => {
        const input_id = getValues("ID");
        const id = await supabase.from("users").select("user_id").eq("user_id", input_id).single();
        if (id.error) {
            alert("名刺が見つかりませんでした。IDを確認してください。");
            throw new Error(id.error.message);
        }
        if (id) {
            navigate(`/cards/${id.data.user_id}`);
        }
    });
    return (
        <div>
            <h1 data-testid="title">デジタル名刺アプリ</h1>
            <form onSubmit={handleSubmit(onClick)}>
            <Stack gap="4" align="flex-start" maxW="sm">
                <Field.Root invalid={!!errors.ID} data-testid="id">
                    <Field.Label>ID</Field.Label>
                    <Input {...register("ID", {required: "内容の入力は必須です" })} />
                    <Field.ErrorText>{errors.ID?.message}</Field.ErrorText>
                </Field.Root>
                <Box display="flex" alignItems="center" justifyContent="center" data-testid="button">
                    <Button colorScheme="blue" size="sm" p="4" m="4" type="submit">
                        名刺を見る
                    </Button>
                </Box>
            </Stack>
            </form>
            <Link to="/cards/register" data-testid="register-link">
                名刺を登録する
            </Link>
        </div>
    )
});