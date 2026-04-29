export class Users {
    constructor(
        public user_id: string,
        public name: string,
        public description: string,
        public github_id: string | undefined,
        public qiita_id: string | undefined,
        public x_id: string | undefined,
        public user_skill: {
            skill_id: string,
            skills: {
                name: string;
            };
        }[],
    ) { }
    public static newUsers(
        user_id: string,
        name: string,
        description: string,
        github_id: string | undefined,
        qiita_id: string | undefined,
        x_id: string | undefined,
        user_skill: {
            skill_id: string;
            skills: {
                name: string;
            };
        }[]
    ): Users {
        return new Users(
            user_id,
            name,
            description,
            github_id ? `https://github.com/${github_id}` : undefined,
            qiita_id ? `https://qiita.com/${qiita_id}` : undefined,
            x_id ? `https://x.com/${x_id}` : undefined, 
            user_skill
        );
    }
}