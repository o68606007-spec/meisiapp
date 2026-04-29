import { memo, FC, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Card, Text, Button } from "@chakra-ui/react";
import DOMPurify from "dompurify";
import { FaGithub } from "react-icons/fa";
import { SiQiita, SiX } from "react-icons/si";
import { useNavigate } from "react-router-dom";

import { getTableLib } from "../lib/GetTableLib";
import { Users } from "../domain/GetTableDomain";


export const Cards: FC = memo(() => {
    const { id } = useParams();
    const [supabaseData, setSupabaseData] = useState<Users[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const homeOnClick = useCallback(() => {
        navigate("/")
    },[navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTableLib(String(id));
                setSupabaseData(data);
            } catch (error) {
                console.error("Error fetching supabase data:", error);
            }
        };
        fetchData();
        setLoading(false);
    }, [id, loading]);

    if (loading && supabaseData.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <Card.Root width="320px">
            <Card.Body gap="2">
            {supabaseData.map((user) => (
                <div key={user.user_id} data-testid="card">
                    <Text data-testid="name">名前: {user.name}</Text>
                    <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`自己紹介: ${user.description}`) }} data-testid="description"></Text>
                    <Text>
                        {user.user_skill.map((us) => (
                        <span key={us.skill_id} data-testid="skill">
                            SKILL: {us.skills.name}
                        </span>
                        ))}
                    </Text>
                    {user.github_id && (
                        <Text><a href={user.github_id} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <FaGithub size={24} data-testid="github" />
                        </a></Text>
                    )}
                    {user.qiita_id && (
                        <Text><a href={user.qiita_id} target="_blank" rel="noopener noreferrer" aria-label="Qiita">
                            <SiQiita size={24} data-testid="qiita" />
                        </a></Text>
                    )}
                    {user.x_id && (
                        <Text><a href={user.x_id} target="_blank" rel="noopener noreferrer" aria-label="X">
                            <SiX size={24} data-testid="x" />
                        </a></Text>
                    )}
                </div>
            ))}
            <Button colorScheme="blue" size="xs" p="4" m="4" gap="10" onClick={() => homeOnClick()} data-testid="home-button">
                ホームへ
            </Button>
            </Card.Body>
        </Card.Root>
    )
});