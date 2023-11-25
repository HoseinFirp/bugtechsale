import { Link } from "react-router-dom";
import { useDarkContext } from "../App";

function AboutUs() {
  const { isDark } = useDarkContext();

  return (
    <div className={` h-full pb-36 ${isDark ? "" : "bg-gray-200"}`}>
      <h1 className={`${isDark?'':'text-gray-600  '} bg-transparent text-7xl ml-5 mb-10 pt-5`}>BugTech</h1>
      <p className={`${isDark?'':'text-gray-600  '} mt-5 ml-10 mr-10`}>
        BugTech is an American global online shop focusing on high tech and
        startup companies. It was founded in June 2005 by Archimedes Ventures,
        led by partners Michael Arrington and Keith Teare. In 2010, AOL acquired
        the company for approximately $25 million.
      </p>
      <h1 className={`${isDark?'':'text-gray-600  '} bg-transparent text-2xl mt-10 ml-5`}>History</h1>
      <p className={ `${isDark?'':'text-gray-600  '} mt-5 ml-10 mr-10`}>
        BugTech was founded in June 2005 by Archimedes Ventures, led by partners
        Michael Arrington and Keith Teare. In 2010, AOL acquired the company for
        approximately $25 million. As of 2013, BugTech was available in English,
        Chinese (managed by Chinese tech news company, TechNode), and Japanese.
        BugTech France was folded into the main BugTech.com site in October
        2012. Boudless (formerly Verizon Media Japan), the Japanese subsidiary
        of the BugTech's parent company, closed BugTech Japan in May 2022
        according to its "global strategy". Ethereum founder Vitalik Buterin at
        the BugTech event in 2015 Following the acquisition of AOL and Yahoo by
        Verizon, BugTech was owned by Verizon Media from 2015 through 2021. In
        August 2020, COO of BugTech, Ned Desmond, stepped down after 8 years in
        the company. He announced that he would join venture capital firm, SOSV
        in December 2020 as senior operating partner. His former role at BugTech
        was replaced by Matthew Panzarino, former editor-in-chief, and Joey
        Hinson, director of business operations. In 2021 Verizon sold its media
        assets, including AOL, Yahoo, and BugTech, to the private equity firm
        Apollo Global Management, and Apollo integrated them into a new entity
        called Yahoo.
      </p>
      <div className="flex justify-center  mt-10">
        <Link to={"/"}>
          <button className="btn">&larr; Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default AboutUs;
