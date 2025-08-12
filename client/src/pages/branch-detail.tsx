import Navigation from "@/components/navigation";
import PageWithLoading from "@/components/PageWithLoading";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const BranchDetailPage = () => {
  const [, params] = useRoute("/branches/:id");
  const branchId = params?.id;

  const { data: branch, isLoading } = useQuery({
    queryKey: ["/api/branches", branchId],
    enabled: !!branchId,
  });

  return (
    <PageWithLoading>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center">Уншиж байна...</div>
        ) : !branch ? (
          <div className="text-center">Салбар холбоо олдсонгүй</div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{branch.location}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {branch.leader && (
                <div>
                  <strong>Тэргүүлэгч:</strong> {branch.leader}
                </div>
              )}
              {branch.boardMembers && (
                <div>
                  <strong>Тэргүүлэгч гишүүд:</strong> {branch.boardMembers}
                </div>
              )}
              {branch.address && (
                <div>
                  <strong>Хаяг:</strong> {branch.address}
                </div>
              )}
              {branch.activities && (
                <div>
                  <strong>Үйл ажиллагаа:</strong> {branch.activities}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </PageWithLoading>
  );
};

export default BranchDetailPage;

