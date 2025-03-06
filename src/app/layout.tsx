import { Metadata } from "next";
import "./globals.css";
import Footer from "./Component/Common/Footer";
import Header from "./Component/Common/Login_Header";

export const metadata: Metadata = {
  title: "K-visa Partner",
  description: "K-visa Partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        {/* 폰트 파일 로드 */}
        <style>
          {`
            @font-face {
              font-family: 'SpoqaHanSansNeo';
              src: url('/fonts/SpoqaHanSansNeo-Regular.otf') format('opentype');
              font-weight: normal;
              font-style: normal;
            }
            @font-face {
              font-family: 'SpoqaHanSansNeo';
              src: url('/fonts/SpoqaHanSansNeo-Bold.otf') format('opentype');
              font-weight: bold;
              font-style: normal;
            }

            html,body {
              font-family: 'SpoqaHanSansNeo', sans-serif;
           
            }
         
        }
   
          `}
        </style>
      </head>
      <body style={{ touchAction: "manipulation" }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
