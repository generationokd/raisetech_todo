import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Router } from './router/Router';

export default function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <RecoilRoot>
          <Router />
        </RecoilRoot>
      </BrowserRouter>
    </ChakraProvider>
  );
}
