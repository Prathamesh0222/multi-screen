import { CreateScreen } from "@/components/create-screens";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header />
      <CreateScreen />
      <Footer />
    </div>
  );
}
