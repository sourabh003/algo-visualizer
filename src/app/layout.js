import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const META_TITLE = "Algorithm Visualiser";
const META_DESCRIPTION =
	"A web-based tool to visualize algorithms like sorting, searching, and pathfinding in real-time.";
const META_IMAGE =
	"https://algo-visualizer-iota-ruddy.vercel.app/intro-banner.png";

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
	openGraph: {
		title: META_TITLE,
		description: META_DESCRIPTION,
		url: "https://algo-visualizer-iota-ruddy.vercel.app",
		siteName: META_TITLE,
		images: [
			{
				url: META_IMAGE, // Replace with your actual OG image
				width: 1200,
				height: 630,
				alt: "Algorithm Visualizer Screenshot",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: META_TITLE,
		description: META_DESCRIPTION,
		images: [META_IMAGE], // Replace with your OG image
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
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
