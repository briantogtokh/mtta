import { Link } from "wouter";
import Navigation from "@/components/navigation";
import PageWithLoading from "@/components/PageWithLoading";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const BranchesPage = () => {
  const { data: branches = [], isLoading } = useQuery({
    queryKey: ["/api/branches"],
  });

  return (
    <PageWithLoading>
      <Navigation />
      <div className="main-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Салбар холбоод
            </h1>
            <p className="text-xl text-gray-300">
              Монголын ширээний теннисний салбар холбоодын жагсаалт
            </p>
          </div>

          {isLoading ? (
            <div className="text-center text-gray-300">Уншиж байна...</div>
          ) : branches.length === 0 ? (
            <p className="text-gray-300">Салбар холбоо бүртгэгдээгүй байна.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {branches.map((branch: any) => (
                <Link key={branch.id} href={`/branches/${branch.id}`} className="block">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{branch.location}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-2">
                        Тэргүүлэгч: {branch.leader}
                      </p>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {branch.activities}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWithLoading>
  );
};

export default BranchesPage;

