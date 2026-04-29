import { memo, FC } from "react";
import { Button, Field, Input, Stack, NativeSelect, createListCollection } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";

export const Register: FC = memo(() => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = handleSubmit(async (data) => {
        const registerDataUsers = await supabase.from("users").insert([{user_id: data.user_id, name: data.name, description: data.description, github_id: data.github_id || null, qiita_id: data.qiita_id || null, x_id: data.x_id || null}]);
        if (registerDataUsers.error) {
            throw new Error(registerDataUsers.error.message);
        }
        const registerDataUserSkill = await supabase.from("user_skill").insert([{user_id: data.user_id, skill_id: data.likeTechnology}]);
        if (registerDataUserSkill.error) {
            throw new Error(registerDataUserSkill.error.message);
        }
        navigate("/");
    });
    return (
        <form onSubmit={onSubmit}>
            <Stack gap="4" align="flex-start" maxW="sm">
                <Field.Root invalid={!!errors.user_id} data-testid="user-id">
                    <Field.Label>
                        好きな英単語 <Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="text" {...register("user_id", {required: "内容の入力は必須です", pattern: { value: /^[a-zA-Z]+$/, message: "英単語のみ入力してください",},
                    })} />
                    <Field.ErrorText>{errors.user_id?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.name} data-testid="name">
                    <Field.Label>お名前</Field.Label>
                    <Input type="text" {...register("name", {required: "内容の入力は必須です" })} />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.description} data-testid="description">
                    <Field.Label>自己紹介</Field.Label>
                    <Input type="text" {...register("description", {required: "内容の入力は必須です"})} />
                    <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.likeTechnology}>
                    <Field.Label>好きな技術</Field.Label>
                        <NativeSelect.Root>
                        <NativeSelect.Field {...register("likeTechnology", { required: "内容の入力は必須です" })}>
                            <option value="">Select option</option>
                            <option value="1">React</option>
                            <option value="2">TypeScript</option>
                            <option value="3">Github</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    <Field.ErrorText>{errors.likeTechnology?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.githubId}>
                    <Field.Label>GithubId</Field.Label>
                    <Input type="text" {...register("githubId")} />
                    <Field.ErrorText>{errors.githubId?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.qiitaId}>
                    <Field.Label>QiitaId</Field.Label>
                    <Input type="text" {...register("qiitaId")} />
                    <Field.ErrorText>{errors.qiitaId?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.xId}>
                    <Field.Label>XId</Field.Label>
                    <Input type="text" {...register("xId")} />
                    <Field.ErrorText>{errors.xId?.message}</Field.ErrorText>
                </Field.Root>
                <Button type="submit" data-testid="button">Submit</Button>
            </Stack>
        </form>
    )
});