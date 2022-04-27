import { teammates } from "../data/teammate";

export default function TeammateSection() {
  return (
    <div className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Team Developer
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {teammates.map((teammate, index) => (
            <div key={index} className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img alt={teammate.name} className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={teammate.image} />
                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-gray-900">{teammate.name}</h2>
                  <h3 className="text-gray-500 mb-3">{teammate.title}</h3>
                  <p className="mb-4">{teammate.content}</p>
                </div>
              </div>
            </div>

          ))}

        </div>
      </div>
    </div>

  );
}
