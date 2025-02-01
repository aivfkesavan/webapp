import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { queryClient } from "../../lib/query-client";

import { Toaster as SonnerToaster } from "../ui/sonner";
import { Toaster } from "../ui/toaster";

type props = Readonly<{
  children: React.ReactNode;
}>

const style = {
  width: "250px"
}

function ClientWrapper({ children }: props) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {children}

        <Toaster />

        <SonnerToaster
          style={style}
        />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default ClientWrapper
