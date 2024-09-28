"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'

const menuItems = [
  { name: 'Sales', href: '#' },
  {
    name: 'Products',
    href: '#',
    submenu: [
      { name: 'Electronics', href: '#' },
      { name: 'Clothing', href: '#' },
      { name: 'Books', href: '#' },
    ],
  },
  {
    name: 'Services',
    href: '#',
    submenu: [
      { name: 'Consulting', href: '#' },
      { name: 'Design', href: '#' },
      { name: 'Development', href: '#' },
    ],
  },
  { name: 'Contact', href: '#' },
]

export default function ResponsiveNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name)
  }

  return (
    <nav className="bg-gradient-to-r from-[#004493] via-[#002E62] to-[#001731] p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-white">
            Result.IO
          </a>
          <div className="hidden md:flex space-x-4 mr-12">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className="inline-block ml-1 w-4 h-4" />
                  )}
                </a>
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-1">
                      {item.submenu.map((subitem) => (
                        <a
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                        >
                          {subitem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 flex flex-col items-center"
          >
            {menuItems.map((item) => (
              <div key={item.name} className="w-full">
                <button
                  onClick={() => toggleSubmenu(item.name)}
                  className="w-full text-center text-white py-2 hover:bg-[#002E62] transition-colors duration-200"
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown
                      className={`inline-block ml-1 w-4 h-4 transition-transform duration-200 text-center ${
                        openSubmenu === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
                {item.submenu && openSubmenu === item.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#ffffff] text-[#002E62] flex flex-col items-center text-center"
                  >
                    {item.submenu.map((subitem) => (
                      <a
                        key={subitem.name}
                        href={subitem.href}
                        className="block py-2 px-8  text-sm text-[#002E62] font-bold  text-center hover:bg-[#004493] transition-colors duration-200"
                      >
                        {subitem.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
