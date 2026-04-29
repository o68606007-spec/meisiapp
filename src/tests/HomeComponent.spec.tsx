import { Home } from "../components/Home";
import { render, screen } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";


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

describe("Home", () => {
  it("Title", () => {
    render(
      <MemoryRouter>
      <ChakraProvider value={defaultSystem}>
        <Home />
      </ChakraProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: "デジタル名刺アプリ" })).toBeInTheDocument();
  });
  it("IDを入力してボタンを押すと/cards/:idに遷移する(useNavigateのパスをみる)", async () => {
    render(
      <MemoryRouter>
        <ChakraProvider value={defaultSystem}>
          <Home />
        </ChakraProvider>
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const input = await screen.getByLabelText("ID");
    await user.type(input, "1");
    const button = await screen.getByRole("button", { name: "名刺を見る" });
    await user.click(button);
    expect(mockedNavigator).toHaveBeenCalledWith("/cards/1");
  });

  it("IDを入力しないでボタンを押すとエラーメッセージが表示される", async () => {
    render(
      <MemoryRouter>
      <ChakraProvider value={defaultSystem}>
        <Home />
      </ChakraProvider>
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const input = await screen.getByLabelText("ID");
    await user.clear(input);
    const button = await screen.getByRole("button", { name: "名刺を見る" });
    await user.click(button);
    expect(await screen.findByTestId("id")).toHaveTextContent("内容の入力は必須です");
  });

  it("新規登録はこちらを押すと/cards/registerに遷移する", async () => {
    render(
      <MemoryRouter>
        <ChakraProvider value={defaultSystem}>
          <Home />
        </ChakraProvider>
      </MemoryRouter>
    );
    const link = await screen.getByTestId("register-link");
    expect(link).toHaveAttribute("href", "/cards/register");
  });
});