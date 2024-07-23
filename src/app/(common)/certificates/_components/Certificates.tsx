import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CalendarIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CertificatesProps {
  certificateId: string;
  courseName: string;
  issuedDate: string;
  issuerName: string;
  issuerProfile: string;
  courseCategory: string;
  courseThumbnail: string;
}

const Certificates = ({
  certificateId,
  courseName,
  issuedDate,
  issuerName,
  courseCategory,
  courseThumbnail,
  issuerProfile,
}: CertificatesProps) => {
  return (
    <Link href={`/certificate/${certificateId}`} className="block">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <CardHeader className="p-0 border-b">
          <div className="relative h-56 w-full">
            <Image
              src={courseThumbnail}
              alt={courseName}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg "
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 text-center">
          <h2 className="text-xl font-semibold line-clamp-2 mb-2">
            {courseName}
          </h2>
        </CardContent>
        <CardFooter className="p-0 flex flex-col gap-2">
          <div className="flex justify-between items-center w-full px-4 py-2">
            <Badge className="bg-primary text-primary-foreground">
              {courseCategory}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground gap-2">
              <CalendarIcon size={16} />
              <span>{issuedDate}</span>
            </div>
          </div>
          <Link href={issuerProfile} className="w-full">
            <Button
              variant={"link"}
              className="w-full border-0 rounded-none font-bold hover:scale-110"
            >
              from {issuerName}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default Certificates;
