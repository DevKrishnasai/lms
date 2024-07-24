import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="p-8 w-full min-h-[calc(100vh-100px)]">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="flex items-center p-6">
            <Skeleton className="w-[100px] h-[100px] rounded-full mr-6" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="courses">
          <TabsList className="mb-4 w-[240px]"></TabsList>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full mb-4" />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full mb-4" />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full mb-4" />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full mb-4" />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default loading;
