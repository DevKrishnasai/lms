"use client";
import React, { useRef, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Clock } from "lucide-react";

interface CertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  courseDuration: string;
  instructorName: string;
  directorName: string;
  verificationURL: string;
  instructorSignature: string;
  directorSignature: string;
}

const Certificate: React.FC<CertificateProps> = ({
  studentName,
  courseName,
  completionDate,
  courseDuration,
  instructorName,
  directorName,
  verificationURL,
  instructorSignature,
  directorSignature,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    Promise.all([loadImage(instructorSignature), loadImage(directorSignature)])
      .then(() => setImagesLoaded(true))
      .catch((error) => console.error("Error loading images:", error));
  }, [instructorSignature, directorSignature]);

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  });

  const generatePDF = async () => {
    if (certificateRef.current && imagesLoaded) {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [297, 210],
      });

      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save(
        `${studentName.replace(" ", "_")}_${courseName.replace(
          " ",
          "_"
        )}_Certificate.pdf`
      );
    }
  };

  const downloadPNG = async () => {
    if (certificateRef.current && imagesLoaded) {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${studentName.replace(" ", "_")}_${courseName.replace(
        " ",
        "_"
      )}_Certificate.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex w-full h-full flex-col lg:flex-row md:items-center lg:justify-center gap-10 overflow-y-auto p-4">
      <div className="w-screen min-h-[70%] overflow-x-auto lg:w-auto lg:overflow-hidden ">
        <div className="w-[800px] h-[700px] bg-white text-black border border-gray-300 rounded-lg shadow-lg">
          <div
            ref={certificateRef}
            className="relative bg-white  rounded-lg text-center border-4 border-black w-full h-full p-12"
            style={{
              backgroundImage: "url('/certificate-background.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Watermark */}
            <div
              className="absolute inset-0 flex items-center justify-center text-gray-300 opacity-30"
              style={{
                fontSize: "8rem",
                pointerEvents: "none",
                transform: "rotate(-30deg)",
              }}
            >
              <p>YourLMS</p>
            </div>

            {/* Award Icon as SVG */}
            <div className="w-16 h-16 mx-auto mb-4 text-black">
              <Award className="w-full h-full" />
            </div>
            <h1 className="text-4xl font-bold mb-6 text-black">
              Certificate of Achievement
            </h1>
            <p className="text-xl mb-2">This is to certify that</p>
            <p className="text-3xl font-bold mb-2 text-black">{studentName}</p>
            <p className="text-xl mb-2">
              has successfully completed the course
            </p>
            <p className="text-2xl font-bold mb-4 text-black">{courseName}</p>
            <div className="flex justify-center items-center space-x-4 mb-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-black" />
                <p className="text-lg">Completed on: {completionDate}</p>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-4 mb-2">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-black" />
                <p className="text-lg">Course Duration: {courseDuration}</p>
              </div>
            </div>
            <div className="flex justify-between items-baseline mb-10">
              <div>
                <img
                  src={instructorSignature}
                  alt="Instructor Signature"
                  className="w-32 mx-auto mb-2"
                />
                <div className="w-48 border-t-2 border-black mx-auto"></div>
                <p className="mt-2 font-bold text-black">{instructorName}</p>
                <p>Course Instructor</p>
              </div>
              <div>
                <img
                  src={directorSignature}
                  alt="Director Signature"
                  className="w-32 mx-auto mb-2"
                />
                <div className="w-48 border-t-2 border-black mx-auto"></div>
                <p className="mt-2 font-bold text-black">{directorName}</p>
                <p>YourLMS CEO</p>
              </div>
            </div>
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-black text-[10px] mb-1">
              <p className="">Verify at:</p>
              <a
                href={verificationURL}
                className="hover:text-blue-600 hover:underline"
              >
                {verificationURL}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <Card className="border-2 shadow-md">
          <CardHeader className="border-b">
            <h3 className="text-xl font-bold text-center">Course Details</h3>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-2">
              <strong>Course Name:</strong> {courseName}
            </p>
            <p className="text-lg mb-2">
              <strong>Duration:</strong> {courseDuration}
            </p>
            <p className="text-lg mb-2">
              <strong>Completion Date:</strong> {completionDate}
            </p>
            <p className="text-lg mb-2">
              <strong>Instructor:</strong> {instructorName}
            </p>
          </CardContent>
        </Card>
        <div className="flex flex-col space-y-2">
          <Button
            onClick={downloadPNG}
            className="w-full"
            disabled={!imagesLoaded}
          >
            Download PNG Certificate
          </Button>
          <Button
            onClick={generatePDF}
            className="w-full"
            disabled={!imagesLoaded}
          >
            Generate PDF Certificate
          </Button>
          <Button
            onClick={handlePrint}
            className="w-full"
            disabled={!imagesLoaded}
          >
            Print Certificate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
