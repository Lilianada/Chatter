const stats = [
    { id: 1, name: 'Writers on the platform', value: '800K+' },
    { id: 2, name: 'Articles published', value: '1M+' },
    { id: 3, name: 'Total articles read', value: '100M+' },
    { id: 4, name: 'Paid out to writers', value: '$70M' },
  ]
  
  export default function Stats() {
    return (
      <div className="bg-blue-50 py-20 sm:py-20 w-11/12 rounded-xl m-auto">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Trusted by writers worldwide
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
              The go-to platform for top writers from all over the world.
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col bg-gray-500/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
  }
  