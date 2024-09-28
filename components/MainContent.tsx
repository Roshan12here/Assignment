"use client"

import { useState, useEffect, useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Flag, Trash2, GraduationCap, Mail, Phone, MapPin, Calendar, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from 'framer-motion'

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  picture: string;
  dob: string;
  location: string;
  major: string;
  gpa: string;
}

export default function StudentCardGrid() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 12

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('https://randomuser.me/api/?results=50&seed=abc123')
        const data = await response.json()
        const formattedStudents: Student[] = data.results.map((user: any, index: number) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          phone: user.phone,
          picture: user.picture.large,
          dob: new Date(user.dob.date).toLocaleDateString(),
          location: `${user.location.city}, ${user.location.country}`,
          major: ['Computer Science', 'Engineering', 'Biology', 'Psychology'][Math.floor(Math.random() * 4)],
          gpa: (Math.random() * 3 + 1).toFixed(2)
        }))
        setStudents(formattedStudents)
      } catch (err) {
        setError('Failed to fetch students. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const filteredStudents = useMemo(() => {
    return students.filter(student =>
      Object.values(student).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [students, searchTerm])

  const totalPages = Math.ceil(filteredStudents.length / cardsPerPage)
  const currentStudents = useMemo(() => {
    const indexOfLastCard = currentPage * cardsPerPage
    const indexOfFirstCard = indexOfLastCard - cardsPerPage
    return filteredStudents.slice(indexOfFirstCard, indexOfLastCard)
  }, [filteredStudents, currentPage])

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-gray-100 to-gray-200">
        <motion.h1 
          className="text-4xl font-bold mb-6 text-[#004493] text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Student Directory
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="space-y-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-gray-100 to-gray-200">
        <motion.h1 
          className="text-4xl font-bold mb-6 text-[#004493] text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Student Directory
        </motion.h1>
        <motion.p 
          className="text-red-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {error}
        </motion.p>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <motion.h1 
        className="text-4xl font-bold mb-6 text-[#004493] text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Student Directory
      </motion.h1>
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        
     <div className="relative w-full max-w-sm">
  <Input
    type="text"
    placeholder="Search students..."
    value={searchTerm}
    onChange={handleSearch}
    className="pl-10 pr-4 py-2 rounded-full border border-gray-300 shadow-md transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:shadow-lg hover:shadow-lg"
  />
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
</div>

        <div className="flex items-center space-x-2 bg-white rounded-full shadow-md p-1">
          <Button onClick={prevPage} disabled={currentPage === 1} variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 transition-colors duration-300">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium px-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={nextPage} disabled={currentPage === totalPages} variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 transition-colors duration-300">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
      <AnimatePresence>
        {filteredStudents.length === 0 ? (
          <motion.p 
            className="text-center text-gray-500 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No students found matching your search criteria.
          </motion.p>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {currentStudents.map((student) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl group bg-white hover:bg-gradient-to-br  from-[#E6F1FE] via-[#CCE3FD] to-[#E6F1FE]">
                  <CardHeader className="bg-gradient-to-r from-[#004493] via-[#002E62] to-[#001731] text-white p-4  transition-all duration-500">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={student.picture} alt={student.name} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="overflow-hidden">
                        <CardTitle className="text-lg truncate group-hover:text-yellow-300 transition-colors duration-300">{student.name}</CardTitle>
                        <CardDescription className="text-gray-200 truncate group-hover:text-white transition-colors duration-300">{student.major}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 group-hover:bg-transparent transition-colors duration-300">
                    <p className="flex items-center text-sm  transition-colors duration-300">
                      <GraduationCap className="mr-2 h-4 w-4" /> {student.major}
                    </p>
                    <p className="mt-2 text-sm  transition-colors duration-300">GPA: {student.gpa}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col   justify-between group-hover:bg-transparent transition-colors duration-300">
                    <div className="space-x-1">
                      <Button variant="ghost" size="icon" className="hover:bg-white/20 transition-colors duration-300 ">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-white/20 transition-colors duration-300 ">
                        <Flag className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-white/20 transition-colors duration-300 ">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedStudent(student)}
                          className=" w-full bg-[#002E62] text-[#ffffff] hover:bg-[#ffffff]    transition-all duration-300"
                        >
                          Show More
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-gradient-to-r from-[#004493] via-[#002E62] to-[#001731] text-[#ffffff]">
                        <DialogHeader>
                          <DialogTitle>{selectedStudent?.name}</DialogTitle>
                          <DialogDescription className='text-slate-200'>Student Details</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="flex justify-center">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src={selectedStudent?.picture} alt={selectedStudent?.name} />
                              <AvatarFallback>{selectedStudent?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Badge className='bg-[#ffffff] text-[#002E62] hover:bg-blue-100 hover:text-[#002E62]'>Major</Badge>
                            <span className="col-span-3">{selectedStudent?.major}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Badge className='bg-[#ffffff] text-[#002E62]  hover:bg-blue-100 hover:text-[#002E62]'>GPA</Badge>
                            <span className="col-span-3">{selectedStudent?.gpa}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Mail className="h-4 w-4" />
                            <span className="col-span-3">{selectedStudent?.email}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Phone className="h-4 w-4" />
                            <span className="col-span-3">{selectedStudent?.phone}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <MapPin className="h-4 w-4" />
                            <span className="col-span-3">{selectedStudent?.location}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Calendar className="h-4 w-4" />
                            <span className="col-span-3">{selectedStudent?.dob}</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}