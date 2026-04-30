import { Router } from "./router/Router.js";

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