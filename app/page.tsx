import { CreateScreen } from "@/components/create-screens";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import LoaderWrapper from "@/components/loader";

export default function Home() {
  return (
    <>
      <LoaderWrapper>
        <div className="flex flex-col h-screen">
          <Header />
          <CreateScreen />
          <Footer />
        </div>
      </LoaderWrapper>
    </>
  );
}
