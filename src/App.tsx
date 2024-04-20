import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import "overlayscrollbars/overlayscrollbars.css";
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
