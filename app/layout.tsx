import "./globals.css";
import "./app.css";
import { PerformCheck } from "@/components/Check";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PerformCheck>{children}</PerformCheck>
      </body>
    </html>
  );
}
