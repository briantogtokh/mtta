import Navigation from "@/components/navigation";
import PageWithLoading from "@/components/PageWithLoading";

const NationalTeamPage = () => {
  return (
    <PageWithLoading>
      <Navigation />
      <div className="main-bg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Үндэсний шигшээ</h1>
          <p className="text-xl text-gray-300">Монголын ширээний теннисний үндэсний шигшээ багийн тухай мэдээлэл</p>
        </div>
      </div>
    </PageWithLoading>
  );
};

export default NationalTeamPage;
