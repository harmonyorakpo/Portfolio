import { motion } from "framer-motion";
import { IProject } from "../model/project.model";
import SectionHeader from "./SectionHeader";
import { Link } from "react-router-dom";

const Projects = () => {
  const projects: IProject[] = [
    {
      title: "My Portfolio",
      id: "01",
      description: "React | Typescript | Tailwind",
      link: "View Project",
      about:
        "This is my portfolio website where I showcase my projects and skills.",
      roles: ["UI/UX Designer", "Frontend Developer"],
      responsibilities: [
        "Designed and developed the portfolio website using React and Tailwind CSS",
        "Ensuring a responsive and visually appealing layout.",
        "Created reusable components to enhance maintainability and scalability.",
        "Implemented smooth scrolling and navigation for a better user experience.",
      ],
      technicalStack: [
        "React",
        "Typescript",
        "Tailwind CSS",
        "JavaScript",
        "HTML",
        "CSS",
      ],
      image: "/images/portfolio.png",
    },
    {
      title: "Touchstone Learning Portal",
      id: "02",
      description: "Angular 18 | PrimeNG | NGXS | RxJs | TypeScript",
      link: "View Project",
      about:
        "The Touchstone Learning Portal is a competency-based, multimodal educational platform designed to support International Medical Graduates (IMGs) and visa-trainee physicians as they transition into residency training programs in Ontario. The portal emphasizes structured learning, clinical simulations, mentorship, and real-time learner support aligned with CanMEDS frameworks.",
      roles: ["Frontend Developer"],
      responsibilities: [
        "Developed the frontend using Angular 18 with NGXS for centralized state management across modules.",
        "Built interactive dashboards for Pre-Residency, Family Medicine, and Canadian Medicine Primer programs using PrimeNG components.",
        "Implemented dynamic learning modules, simulation scheduling tools, and mentorship consultation interfaces.",
        "Optimized application performance through lazy loading, virtual scrolling, and modular architecture.",
        "Integrated RESTful and GraphQL APIs for authentication, learner data, course progress, and feedback submissions.",
        "Collaborated with backend engineers, curriculum designers, and SMEs in Agile sprints to deliver learner-centric features.",
      ],
      technicalStack: [
        "Angular 18",
        "PrimeNG",
        "NGXS",
        "RxJs",
        "TypeScript",
        "HTML",
        "SCSS",
      ],
      image: "",
      url: "https://touchstoneinstitute.ca/learning/",
    },
    {
      title: "Touchstone Exam Portal",
      id: "03",
      description: "Angular 19 | PrimeFaces | RxJs | NgXS | Signals",
      link: "View Project",
      about:
        "The Touchstone Exam Portal is an advanced platform designed to support international medical professionals preparing for certification exams such as IENCAP, IGOEE, and other assessments required for practicing in Canada. The platform emphasizes structured learning and real-time feedback for exam readiness.",
      roles: ["Frontend Developer"],
      responsibilities: [
        "Developed the frontend of the exam portal using Angular 19 with state management handled via NgXS and Angular Signals.",
        "Designed interactive components with PrimeFaces to support exam simulations, practice tests, and structured assessments.",
        "Integrated RxJs for managing reactive data flows across modules.",
        "Built dynamic dashboards and performance tracking tools to provide real-time feedback and analytics to users.",
        "Collaborated with educators and stakeholders to translate curriculum requirements into functional UI components.",
        "Ensured mobile responsiveness and accessibility for users across multiple devices.",
        "Optimized the platform's performance to handle high user concurrency during exam simulations and timed assessments.",
      ],
      technicalStack: [
        "Angular 19",
        "PrimeFaces",
        "RxJs",
        "NgXS",
        "Angular Signals",
        "Typescript",
        "HTML",
        "CSS",
        "SCSS",
      ],
      image: "",
      url: "https://portal.tsin.ca",
    },
    {
      title: "Store Paddy",
      id: "04",
      description: "React | Typescript | Tailwind | Redux",
      link: "View Project",
      about:
        "Store Paddy is a web-based application tailored for businesses like pharmaceuticals, drink depots, and retail stores. It provides essential tools such as Point of Sale (POS), inventory management, and financial tracking to streamline daily operations and business management.",
      roles: ["Frontend Developer"],
      responsibilities: [
        "Developed a responsive and scalable web interface using React, Typescript, and Tailwind CSS.",
        "Implemented a fully functional Point of Sale (POS) system to handle real-time transactions and receipt generation.",
        "Built modules for inventory stacking, stock updates, and low-stock alerts to manage supplies efficiently.",
        "Integrated income and expense tracking with data visualization to provide financial insights.",
        "Utilized Redux for centralized state management across multiple modules including products, transactions, and user sessions.",
        "Worked closely with stakeholders to ensure the app met the diverse needs of various retail sectors.",
        "Optimized performance and ensured cross-browser compatibility for smooth user experience.",
      ],
      technicalStack: [
        "React",
        "Typescript",
        "Tailwind CSS",
        "Redux",
        "JavaScript",
        "HTML",
        "CSS",
      ],
      image: "",
    },
    {
      title: "New Internet Banking",
      id: "05",
      description: "Angular 19 | Bootstrap | RxJs | Chart.js | Npmjs",
      link: "View Project",
      about:
        "A modernized internet banking platform revamped from Angular 8 to Angular 19, featuring improved performance, new functionalities, and enhanced UI/UX. The application is used for financial transactions, account management, and customer support.",
      roles: ["Frontend Developer", "UI/UX Designer"],
      responsibilities: [
        "Migrated the application from Angular 8 to Angular 19 with a step-by-step upgrade approach.",
        "Implemented new features including interactive dashboards and secure form handling.",
        "Fixed existing bugs to enhance performance, reliability, and user experience.",
        "Used ngx-mask for form input formatting and validation.",
        "Integrated Chart.js to display financial data visually.",
        "Designed and updated multiple pages to align with modern design principles.",
        "Collaborated with backend developers and QA to ensure smooth integration and testing.",
      ],
      technicalStack: [
        "Angular 19",
        "Typescript",
        "Bootstrap",
        "RxJs",
        "Chart.js",
        "ngx-mask",
        "HTML",
        "SCSS",
        "CSS",
        "Npmjs packages",
      ],
      image: "/images/Internet_Banking.png",
    },
    {
      title: "Account Opening Web Engine",
      id: "06",
      description: "Angular 14 | Tailwind | RxJs | Npmjs",
      link: "View Project",
      about:
        "A comprehensive web engine built for streamlined account opening processes across multiple customer categories including Non-Resident Nigerians, Retail, and Corporate clients.",
      roles: ["Frontend Developer", "UI/UX Designer"],
      responsibilities: [
        "Developed dynamic forms and workflows for multiple account types using Angular 14 and RxJs.",
        "Implemented input masking and validation using ngx-mask for better data accuracy and user experience.",
        "Used Tailwind CSS to design clean and responsive user interfaces.",
        "Integrated reusable components to ensure consistency and reduce redundancy.",
        "Collaborated with backend teams for API integration and data submission flows.",
        "Handled edge-case validation scenarios and ensured the platform met compliance standards.",
        "Utilized various npm packages to enhance functionality and maintain best development practices.",
      ],
      technicalStack: [
        "Angular 14",
        "Typescript",
        "RxJs",
        "ngx-mask",
        "Tailwind CSS",
        "HTML",
        "SCSS",
        "CSS",
        "Npmjs packages",
      ],
      image: "/images/AOWE.png",
    },
    {
      title: "API Management Portal",
      id: "07",
      description: "Angular 14 | Tailwind | RxJs | Npmjs",
      link: "View Project",
      about:
        "A secure and scalable web platform developed for onboarding companies integrating with the bank's internal APIs. The application provides key features like secure API key generation, session and profile management, and encrypted real-time operations with a strong emphasis on security and usability.",
      roles: ["Frontend Engineer"],
      responsibilities: [
        "Developed the frontend architecture using Angular 14 and Angular Material for a clean, scalable design.",
        "Integrated ngx-mask for advanced input formatting and validation (e.g., IP address restrictions) to improve security and user experience.",
        "Implemented OTP-based authorization to protect sensitive operations such as API key generation and profile updates.",
        "Designed and enforced role-based access control using route guards to manage platform access securely.",
        "Built reusable and responsive UI components with Tailwind CSS and Angular Material to ensure adaptability for future use cases.",
        "Collaborated closely with backend engineers to ensure smooth API integrations and secure data transactions.",
        "Focused on real-time encrypted data handling and session management to prevent fraud and maintain high security standards.",
      ],
      technicalStack: [
        "Angular 14",
        "Typescript",
        "RxJs",
        "Tailwind CSS",
        "Angular Material",
        "ngx-mask",
        "SCSS",
        "HTML",
        "CSS",
        "Npmjs packages",
      ],
      image: "/images/API_Mgt_Portal.png",
    },
    {
      title: "Nurse Ready Admin Portal",
      id: "08",
      description: "Angular 14 | PrimeFaces | RxJs",
      link: "View Project",
      about:
        "The NurseReady Admin Portal is a centralized platform designed to manage and generate competency assessments for nurses who have relocated to Canada and completed mandatory training. It streamlines the evaluation process and ensures that all assessments meet regional healthcare standards.",
      roles: ["Frontend Developer"],
      responsibilities: [
        "Developed and maintained the admin portal using Angular 14 and PrimeFaces for rich, interactive UI components.",
        "Built dynamic dashboards and form-based workflows to generate and manage competency assessments.",
        "Integrated RxJs for reactive state management and data flow within the application.",
        "Collaborated with stakeholders to ensure the platform met the requirements of healthcare regulators.",
        "Ensured a responsive and accessible design for ease of use across devices.",
        "Implemented secure login and access control for administrative users.",
        "Tested and optimized the performance of key components to handle large datasets and complex form logic.",
      ],
      technicalStack: [
        "Angular 14",
        "PrimeFaces",
        "RxJs",
        "Typescript",
        "HTML",
        "CSS",
        "SCSS",
      ],
      image: "",
    },
  
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col mb-24 px-4 sm:px-6 md:px-12 lg:px-24 max-w-screen-xl mx-auto"
    >
      <SectionHeader title="Projects" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col"
      >
        <hr className="border-gray-900" />

        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={item}
            className="flex flex-col w-full"
          >
            <Link
              to={`/projects/${project.id}`}
              state={{ project }}
              className="block hover:bg-gray-900 rounded-md transition duration-300 ease-in-out w-full"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex flex-col md:flex-row justify-between py-6 px-2 sm:px-4 md:px-6 lg:px-8 cursor-pointer gap-4"
              >
                <div className="flex flex-row items-start md:items-center w-full gap-4">
                  <span className="font-thin text-gray-500">{project.id}</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg sm:text-xl text-white mb-1">
                      {project.title}
                    </span>
                    <span className="text-sm text-gray-300">
                      {project.description}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-start md:justify-end text-sm font-semibold text-gray-400 hover:text-primary w-auto md:w-full">
                  {project.link}
                </div>
              </motion.div>
            </Link>
            <hr className="border-gray-900" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;
