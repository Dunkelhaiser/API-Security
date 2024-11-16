import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import Header from "@/components/Header";

export const metadata: Metadata = {
    title: "API Security",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`font-sans antialiased`}>
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
