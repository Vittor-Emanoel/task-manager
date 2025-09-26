import { Toaster } from "./components/ui/sonner";
import { Router } from "./router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from 'nuqs/adapters/react';
const queryClient = new QueryClient();

function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Router />
        <Toaster />
      </NuqsAdapter>
    </QueryClientProvider>
  );
}

export default App;
