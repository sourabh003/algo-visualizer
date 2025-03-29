import { AlignEndHorizontal, Code, Github, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	const menus = [
		{
			label: "Sorting Algorithms",
			path: "/sorting",
			icon: <AlignEndHorizontal size={50} />,
		},
		// {
		// 	label: "Searching Algorithms",
		// 	path: "/sorting",
		// 	icon: <Search size={50} />,
		// },
	];

	return (
		<div className="flex items-center w-screen h-screen justify-center flex-col">
			<div className="flex items-center gap-3 h-[20vh]">
				<img src="/logo.png" alt="" className="w-20" />
				<div className="text-white text-4xl">Algorithm Visualizer</div>
			</div>

			<div className="grid grid-cols-1 gap-3 place-items-center mt-5 flex-1">
				{menus.map((menu) => (
					<div
						key={menu.label}
						className="min-w-[200px] rounded-md hover:bg-[#494F62] transition 300 cursor-pointer text-gray-500 hover:text-white"
					>
						<Link href={menu.path} className="p-4 grid place-items-center">
							{menu.icon}
							<span className="mt-2">{menu.label}</span>
						</Link>
					</div>
				))}
			</div>
			<div className="p-2 text-white text-xs w-full text-center flex items-center justify-center">
				<div className="w-auto mr-2 text-gray-400 hover:text-sky-400 cursor-pointer">
					<a href="https://github.com/sourabh003/algo-visualizer" target="_blank" className="flex items-center">
						<Github className="w-[15px]  mr-1" />
						Github repo
					</a>
                </div>
                &bull;
				<span className="ml-2">
					Created by{" "}
					<a
						href="https://github.com/sourabh003/"
						target="_blank"
						className="text-blue-500 hover:text-sky-300"
					>
						csourabh003
					</a>
				</span>
			</div>
		</div>
	);
}
