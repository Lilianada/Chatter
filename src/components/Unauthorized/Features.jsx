import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Draft your first article.',
    description:
      "Chatter's intuitive editor is perfect for writers of all levels. It offers a smooth, distraction-free writing experience with advanced formatting options.",
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Hit Publish.',
    description: "Publishing is a breeze on Chatter. A single click and your article is live, ready to captivate readers globally.",
    icon: LockClosedIcon,
  },
  {
    name: 'Become a worldwide writer.',
    description: "Chatter is your portal to global recognition. Engage with an international audience, build a loyal readership, and receive invaluable feedback, all while growing your influence in the writing community.",
    icon: ServerIcon,
  },
]

export default function Features() {
  return (
    <div className="overflow-hidden bg-green-600 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-yellow-500">Start Publishing</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Writing made easy</p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
              At Chatter, we provide a seamless and engaging platform for writers to share their thoughts, stories, and expertise with a global audience.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-500" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  )
}
