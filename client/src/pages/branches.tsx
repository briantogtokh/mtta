import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import PageWithLoading from "@/components/PageWithLoading";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { insertBranchSchema } from "@shared/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

type CreateBranchForm = z.infer<typeof insertBranchSchema>;

const BranchesPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const { data: branches = [], isLoading } = useQuery({
    queryKey: ["/api/branches"],
  });

  const form = useForm<CreateBranchForm>({
    resolver: zodResolver(insertBranchSchema),
    defaultValues: {
      location: "",
      leader: "",
      boardMembers: "",
      address: "",
      activities: "",
    },
  });

  const createBranchMutation = useMutation({
    mutationFn: async (data: CreateBranchForm) => {
      const res = await apiRequest("/api/branches", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Амжилттай", description: "Салбар холбоо нэмэгдлээ" });
      setShowCreateDialog(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/branches"] });
    },
    onError: () => {
      toast({
        title: "Алдаа",
        description: "Салбар холбоо үүсгэхэд алдаа гарлаа",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CreateBranchForm) => {
    createBranchMutation.mutate(data);
  };

  return (
    <PageWithLoading>
      <Navigation />
      <div className="main-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Салбар холбоод
              </h1>
              <p className="text-xl text-gray-300">
                Монголын ширээний теннисний салбар холбоодын жагсаалт
              </p>
            </div>
            {user && (user as any).role === "admin" && (
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="mtta-green text-white hover:bg-mtta-green-dark">
                    <Plus className="h-4 w-4 mr-2" />
                    Салбар холбоо нэмэх
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Салбар холбоо нэмэх</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Байршил</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="leader"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Тэргүүлэгч</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="boardMembers"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Тэргүүлэгч гишүүд</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Хаяг</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="activities"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Үйл ажиллагаа</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end space-x-2 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowCreateDialog(false)}
                        >
                          Цуцлах
                        </Button>
                        <Button
                          type="submit"
                          className="mtta-green text-white hover:bg-mtta-green-dark"
                          disabled={createBranchMutation.isPending}
                        >
                          {createBranchMutation.isPending
                            ? "Нэмэж байна..."
                            : "Хадгалах"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
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

