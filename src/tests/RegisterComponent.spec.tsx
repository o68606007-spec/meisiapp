import { Register } from "../components/Register";
import { render, screen } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

let mockData: any[] = [];
// Navigatorモック準備
const mockedNavigator = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
    useNavigate: () => mockedNavigator,
  };
});

vi.mock("../lib/GetTableLib", () => ({
  getTableLib: vi.fn(() => Promise.resolve(mockData)),
}));

vi.mock("../utils/supabase", () => ({
  supabase: {
    from: () => ({
      insert: vi.fn(async (newData) => {
        mockData.push({
          id: String(mockData.length + 1),
          ...newData[0],
        });
        return { error: null };
      }),
      select: () => ({
        eq: () => ({
        single: vi.fn(async (_key, id) => {
        const data = mockData.find((d) => d.id === id);
        return { data, error: null };
          }),
        }),
      })
    })
  }
})
);;

vi.mock("@chakra-ui/react", async () => {
  const actual = await vi.importActual("@chakra-ui/react");
  return {
    ...actual,
    Portal: ({ children }: any) => children,
  };
});

beforeEach(() => {
  mockData = [
    {
      user_id: "1",
      name: "testA",
      description: "test description",
      user_skill: [
        {
          skill_id: "1",
          skills: { name: "React" },
        },
      ],
      github_id: "testA-github",
      qiita_id: "testA-qiita",
      x_id: "testA-x",
    },
  ];
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("Register_Test", () => {
    it("入力", async () => {
        render(
            <ChakraProvider value={defaultSystem}>
                <Register />
            </ChakraProvider>
        );
        const user = userEvent.setup();
        const inputUserId = await screen.getByLabelText("好きな英単語");
        const inputName = await screen.getByLabelText("お名前");
        const inputDescription = await screen.getByLabelText("自己紹介");
        const inputLikeTechnology = await screen.getByLabelText("好きな技術");
        const inputGithubId = await screen.getByLabelText("GithubId");
        await user.type(inputUserId, "testuser");
        await user.type(inputName, "テストユーザー1");
        await user.type(inputDescription, "これはテストユーザーの自己紹介です。");
        await user.selectOptions(inputLikeTechnology, "1");
        await user.type(inputGithubId, "testuser-github");
        const button = await screen.getByRole("button", {name: "Submit"});
        await user.click(button);
        expect(mockedNavigator).toHaveBeenCalledWith("/");
    });

    it("IDがないときにエラーメッセージがでる", async () => {
      render(
          <ChakraProvider value={defaultSystem}>
              <Register />
          </ChakraProvider>
      );
      const user = userEvent.setup();
      const inputUserId = await screen.getByLabelText("好きな英単語");  
      const inputName = await screen.getByLabelText("お名前");
      const inputDescription = await screen.getByLabelText("自己紹介");
      const inputLikeTechnology = await screen.getByLabelText("好きな技術");
      const inputGithubId = await screen.getByLabelText("GithubId");
      await user.clear(inputUserId);
      await user.type(inputName, "テストユーザー2");
      await user.type(inputDescription, "これはテストユーザーの自己紹介です。");
      await user.selectOptions(inputLikeTechnology, "1");
      await user.type(inputGithubId, "testuser-github");
      const button = await screen.getByRole("button", {name: "Submit"});
      await user.click(button);
      expect(await screen.findByTestId("user-id")).toHaveTextContent("内容の入力は必須です");
    });

    it("名前がないときにエラーメッセージがでる", async () => {
      render(
          <ChakraProvider value={defaultSystem}>
              <Register />
          </ChakraProvider>
      );
      const user = userEvent.setup();
      const inputUserId = await screen.getByLabelText("好きな英単語");  
      const inputName = await screen.getByLabelText("お名前");
      const inputDescription = await screen.getByLabelText("自己紹介");
      const inputLikeTechnology = await screen.getByLabelText("好きな技術");
      const inputGithubId = await screen.getByLabelText("GithubId");
      await user.type(inputUserId, "testusertwo");
      await user.clear(inputName);
      await user.type(inputDescription, "これはテストユーザーの自己紹介です。");
      await user.selectOptions(inputLikeTechnology, "1");
      await user.type(inputGithubId, "testuser-github");
      const button = await screen.getByRole("button", {name: "Submit"});
      await user.click(button);
      expect(await screen.findByTestId("name")).toHaveTextContent("内容の入力は必須です");
    });

    it("紹介分がないときにエラーメッセージがでる", async () => {
      render(
          <ChakraProvider value={defaultSystem}>
              <Register />
          </ChakraProvider>
      );
      const user = userEvent.setup();
      const inputUserId = await screen.getByLabelText("好きな英単語");  
      const inputName = await screen.getByLabelText("お名前");
      const inputDescription = await screen.getByLabelText("自己紹介");
      const inputLikeTechnology = await screen.getByLabelText("好きな技術");
      const inputGithubId = await screen.getByLabelText("GithubId");
      await user.type(inputUserId, "testuserthree");
      await user.type(inputName, "テストユーザー3");
      await user.clear(inputDescription);
      await user.selectOptions(inputLikeTechnology, "1");
      await user.type(inputGithubId, "testuser-github");
      const button = await screen.getByRole("button", {name: "Submit"});
      await user.click(button);
      expect(await screen.findByTestId("description")).toHaveTextContent("内容の入力は必須です");
    });

    it("オプションを入力しなくても登録ができる", async () => {
        render(
            <ChakraProvider value={defaultSystem}>
                <Register />
            </ChakraProvider>
        );
        const user = userEvent.setup();
        const inputUserId = await screen.getByLabelText("好きな英単語");
        const inputName = await screen.getByLabelText("お名前");
        const inputDescription = await screen.getByLabelText("自己紹介");
        const inputLikeTechnology = await screen.getByLabelText("好きな技術");
        await user.type(inputUserId, "testuserfour");
        await user.type(inputName, "テストユーザー4");
        await user.type(inputDescription, "これはテストユーザーの自己紹介です。");
        await user.selectOptions(inputLikeTechnology, "1");
        const button = await screen.getByRole("button", {name: "Submit"});
        await user.click(button);
        expect(mockedNavigator).toHaveBeenCalledWith("/");
    });
});