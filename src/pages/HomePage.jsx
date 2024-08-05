import Header from "../components/Header.jsx"
import Introduction from "../components/Introduction.jsx";
import About from "../components/About.jsx";
import Skills from "../components/Skills.jsx";
import Projects from "../components/Projects.jsx";
import Contact from "../components/Contact.jsx";

export default function HomePage() {
	return (
		<div className="flex flex-col gap-10">
			<Header />
			<Introduction />
			<About />
			<Skills />
			<Projects />
			<Contact />
		</div>
	)
}