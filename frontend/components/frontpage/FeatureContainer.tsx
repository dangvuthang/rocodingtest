import React from "react";
import {
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Intuitive",
    description:
      "Embedded code editor supports multiple languages Real time coding Exam notification system",
    icon: GlobeAltIcon,
  },
  {
    name: "Manageble",
    description:
      "Allow managing separate examination Can host room and invite students easily Secure identification system",
    icon: ScaleIcon,
  },
  {
    name: "Secure",
    description:
      "Screen tracking system can detect unusual behaviour Camera tracking can record facial expressions Be able to notify the teacher in real-time Provide evidence.",
    icon: LightningBoltIcon,
  },
];

export default function FeatureContainer() {
  return (
    <div id="featurecontainer" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Our Web&apos;s Princibles
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to make online exams.
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            These features below that we proud of to introduce to users.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
