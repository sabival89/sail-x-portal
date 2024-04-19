import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SailX from "./SailX";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SailX />
    </QueryClientProvider>
  );
}

export default App;
