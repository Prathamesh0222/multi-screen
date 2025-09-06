import { CreateScreen } from "@/components/create-screens";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <CreateScreen />
      <Footer />
    </div>
  );
}
