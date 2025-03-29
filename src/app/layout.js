import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const META_TITLE = "Algorithm Visualiser";
const META_DESCRIPTION = "Visualise how some of the core algorithms work";

export const metadata = {
	title: META_TITLE,
	description: META_DESCRIPTION,
	icons: [
		{
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			url: "/logo.png",
		},
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Head>
				<meta property="og:title" content={META_TITLE} />
				<meta property="og:description" content={META_DESCRIPTION} />
				<meta property="og:image" content="https://res.cloudinary.com/dvd6k9jub/image/upload/v1743259721/Algorithm_Visualiser_ihw35k.png" />
			</Head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				cz-shortcut-listen="true"
			>
				<Toaster position="bottom-center" />
				{children}
			</body>
		</html>
	);
}
