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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
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

            body {
              font-family: 'SpoqaHanSansNeo', sans-serif;
            }
              html, body {
              height: 100%; /* body와 html의 높이를 100%로 설정 */
              margin: 0;     /* 기본 여백 제거 */
              padding: 0;    /* 기본 패딩 제거 */
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
