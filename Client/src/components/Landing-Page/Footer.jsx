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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas debitis
          ipsa beatae quae impedit quod soluta, perferendis commodi voluptates.
          Ullam.
        </p>
        <div className="flex justify-between my-6 md:w-[75%]">
          <FaFacebook size={30} />
          <FaGithubSquare size={30} />
          <FaInstagramSquare size={30} />
          <FaTwitterSquare size={30} />
        </div>
      </div>

      <div className="lg:col-span-2 flex mt-9 justify-end">
        <div>
          <h6 className="font-medium text-gray-400">
            <Link to="https://www.linkedin.com/in/aniket-adhikari01/">
              Aniket
            </Link>
          </h6>
          <ul>
            <li className="py-2 text-sm">
              <Link >
                Facebook
              </Link>
            </li>
            <li className="py-2 text-sm">
              <Link to="">Insta</Link>
            </li>
            <li className="py-2 text-sm">
              <Link to="https://github.com/OikawaToru1">Github</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer