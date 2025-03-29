import { AlignEndHorizontal, Search } from "lucide-react";
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
			<div className="text-white text-3xl">Algorithm Visualizer</div>
			<div className="grid grid-cols-1 gap-3 place-items-center mt-10">
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
		</div>
	);
}
