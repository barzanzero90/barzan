import { BsTelephone } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa6";
import MyCV from "../assets/MyCV.pdf";
import Avatar from "../assets/images/avatar.png";

export default function Introduction() {
	return (
		<div id="home" className="flex lg:flex-row flex-wrap flex-col-reverse justify-around items-center gap-3 pt-10">
			<div className="flex flex-col justify-start items-start gap-1">
				<h1 className="text-4xl font-semibold">Hello, my name is</h1>
				<h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5E43D5]/40 to-[#5E43D5]">Barzan</h2>
				<h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5E43D5]/40 to-[#5E43D5]">Front-end Web Developer</h2>

				<div className="flex gap-3 py-2">
					<a href="tel:+9647518980248" className="cursor-pointer border border-[#5E43D5] rounded-full w-10 h-10 flex justify-center items-center transform transition-all easy-in-out duration-200 hover:bg[#5E43D5]">
						<BsTelephone size={23} />
					</a>

					<a href="https://www.instagram.com/baarzan5" target="_blank" className="cursor-pointer border border-[#5E43D5] rounded-full w-10 h-10 flex justify-center items-center transform transition-all easy-in-out duration-200 hover:bg[#5E43D5]">
						<FaInstagram size={23} />
					</a>

					<a href="https://snapchat.com/t/TbQkTCtv" target="_blank" className="cursor-pointer border border-[#5E43D5] rounded-full w-10 h-10 flex justify-center items-center transform transition-all easy-in-out duration-200 hover:bg[#5E43D5]">
						<FaSnapchat size={23} />
					</a>
				</div>

				<a href={MyCV} download className="border border-[#5E43D5] py-1 px-5 rounded-md text-[#5E43D5] transform transition-all easy-in-out duration-200 hover:bg-[#5E43D5] hover:text-[#fff] cursor-pointer">
					Donwload CV
				</a>
			</div>

			<div>
				<img src={Avatar} alt="image" className="h-[300px]" />
			</div>
		</div>
	)
}