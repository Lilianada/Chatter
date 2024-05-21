import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function SelectCategories({
  categories,
  selectedCategory,
  onChange
}) {
  return (
    <Listbox value={selectedCategory} onChange={onChange}>
      {({ open }) => (
        <div className='mt-8'>
          <Listbox.Label className="block text-normal font-medium text-neutral-900">Select Category</Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-1/3 mt-2 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selectedCategory || "Select a category"}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-1/3 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {categories.map((category, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-yellow-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-8 pr-4 capitalize'
                      )
                    }
                    value={category.id}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate capitalize')}>
                          {category.id}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-chocolate' : 'text-yellow-500',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5 capitalize'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
