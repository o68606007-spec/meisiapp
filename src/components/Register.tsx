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
                    <label>
                        好きな英単語 <Field.RequiredIndicator />
                    </label>
                    <Input type="text" {...register("user_id", {required: "内容の入力は必須です", pattern: { value: /^[a-zA-Z]+$/, message: "英単語のみ入力してください",},
                    })} />
                    {errors.user_id && <div>{errors.user_id.message as string}</div>}
                </Field.Root>
                <Field.Root invalid={!!errors.name} data-testid="name">
                    <label>お名前</label>
                    <Input type="text" {...register("name", {required: "内容の入力は必須です" })} />
                    {errors.name && <div>{errors.name.message as string}</div>}
                </Field.Root>
                <Field.Root invalid={!!errors.description} data-testid="description">
                    <label>自己紹介</label>
                    <Input type="text" {...register("description", {required: "内容の入力は必須です"})} />
                    {errors.description && <div>{errors.description.message as string}</div>}
                </Field.Root>
                <Field.Root invalid={!!errors.likeTechnology}>
                    <label>好きな技術</label>
                        <NativeSelect.Root>
                        <NativeSelect.Field {...register("likeTechnology", { required: "内容の入力は必須です" })}>
                            <option value="">Select option</option>
                            <option value="1">React</option>
                            <option value="2">TypeScript</option>
                            <option value="3">Github</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    {errors.likeTechnology && <div>{errors.likeTechnology.message as string}</div>}
                </Field.Root>
                <Field.Root invalid={!!errors.githubId}>
                    <label>GithubId</label>
                    <Input type="text" {...register("githubId")} />
                    {errors.githubId && <div>{errors.githubId.message as string}</div>}
                </Field.Root>
                <Field.Root invalid={!!errors.qiitaId}>
                    <label>QiitaId</label>
                    <Input type="text" {...register("qiitaId")} />
                    {errors.qiitaId && <div>{errors.qiitaId.message as string}</div>}
                </Field.Root>
                <Field.Root invalid={!!errors.xId}>
                    <label>XId</label>
                    <Input type="text" {...register("xId")} />
                    {errors.xId && <div>{errors.xId.message as string}</div>}
                </Field.Root>
                <Button type="submit" data-testid="button">Submit</Button>
            </Stack>
        </form>
    )
});