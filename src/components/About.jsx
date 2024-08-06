import Avatar from "../assets/images/avatar.png";

export default function About() {
	return (
		<div id="about" className="lg:p-14 p-2 flex flex-col justify-start items-start gap-3">
			<h1 className="text-4xl">About me</h1>

			<div className="flex flex-wrap justify-around items-center w-full gap-2">
				<img src={Avatar} alt="" className="h-[200px]" />

				<div className="border border-[#31236F] p-1 rounded-md">
					<p className="text-lg lg:max-w-[600px] w-[95%] text-left">
						Greetings, I'm Barzan, a passionate front-end web developer with 1 year of experience creating dynamic and responsive web applications Over the past year, I've developed a variety of projects, including real-time chat apps, e-commerce platforms, and educational websites. ensuring my applications are both functional and visually appealing. I am continuously learning and staying updated with the latest industry trends to enhance my skills and bring innovative solutions to life. I'm excited to collaborate on new projects and contribute to building the future of web development.
					</p>
				</div>
			</div>

		</div>
	)
}