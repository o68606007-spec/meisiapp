import { render, screen } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Cards } from "../components/Card";
let mockData: any[] = [];


// useParamのモック準備
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

describe("Card", () => {
  it("Name", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Cards />
      </ChakraProvider>
    );
    await screen.findByTestId("card");
    expect(await screen.getByTestId("name")).toHaveTextContent("名前: testA");
  });
  it("Description", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Cards />
      </ChakraProvider>
    );
    await screen.findByTestId("card");
    expect(await screen.getByTestId("description")).toHaveTextContent("自己紹介: test description");
  });
  it("Skill", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Cards />
      </ChakraProvider>
    );
    await screen.findByTestId("card");
    expect(await screen.getByTestId("skill")).toHaveTextContent("SKILL: React");
  });
  it("Github", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Cards />
      </ChakraProvider>
    );
    await screen.findByTestId("card");
    expect(await screen.getByTestId("github")).toBeInTheDocument();
  });
  it("Qiita", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Cards />
      </ChakraProvider> 
    )
    await screen.findByTestId("card");
    expect(await screen.getByTestId("qiita")).toBeInTheDocument();
  });
  it("X", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Cards />
      </ChakraProvider> 
    )
    await screen.findByTestId("card");
    expect(await screen.getByTestId("x")).toBeInTheDocument();
  });
  it("Home Button", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Cards />
      </ChakraProvider> 
    )
    await screen.findByTestId("card");
    const user = userEvent.setup();
    const homeButton = await screen.getByTestId("home-button");
    await user.click(homeButton);
    expect(mockedNavigator).toHaveBeenCalledWith("/");
  });
});