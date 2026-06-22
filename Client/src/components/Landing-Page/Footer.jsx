import React from 'react'
import {
  FaFacebook,
  FaGithubSquare,
  FaInstagramSquare,
  FaTwitterSquare
} from 'react-icons/fa'
import { Link } from 'react-router'
function Footer() {
  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3  gap-8 text-gray-300">
      <div>
        <h1 className="w-full text-3xl font-bold text-blue-500">StudyHive</h1>
        <p className="py-2 font-bold ">
          A solo platform that provides a variety of tools to help you stay
          focused and productive while studying.
        </p>
        <div className="flex justify-between my-6 md:w-[75%]">
          <Link to="https://www.github.com/OikawaToru1">
            <FaFacebook size={30} />
          </Link>
          <Link to="https://www.github.com/OikawaToru1">
            <FaGithubSquare size={30} />
          </Link>
          <Link to="https://www.github.com/OikawaToru1">
            <FaInstagramSquare size={30} />
          </Link>
          <Link to="https://www.github.com/OikawaToru1">
            <FaTwitterSquare size={30} />
          </Link>
        </div>
      </div>

      <div className="lg:col-span-2 flex mt-9 justify-end">
        <div>
          <h6 className="font-medium text-gray-400">
            <Link to="https://www.linkedin.com/in/aniket-adhikari01/">
              Aniket Adhikari.
            </Link>
          </h6>
          <ul >
            <li className="py-2 text-sm">
              <Link to="https://github.com/OikawaToru1">Github</Link>
            </li>
            <li className="py-2 text-sm">
              <Link to="https://www.linkedin.com/in/aniket-adhikari01/">LinkedIn</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer