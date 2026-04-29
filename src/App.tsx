import { Router } from "./router/Router";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function App() {

  return (
    <>
      <ChakraProvider value={defaultSystem}>
        <Router />
      </ChakraProvider>
    </>
  );
}