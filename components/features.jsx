'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  collection,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../app/firebase';

export default function Features() {

  const [tab, setTab] = useState(1)
  const [items, setItems] = useState([]);
  

  const tabs = useRef(null)

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement) tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`
  }

  useEffect(() => {
    heightFix()
  }, [])
  
  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

    });
  });

  return (
    <section className="relative">

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 bg-gray-100 pointer-events-none mb-16" aria-hidden="true"></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4"></h1>
            <p className="text-xl text-gray-600"></p>
          </div>

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Explore the solutions</h1>
            <p className="text-xl text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.</p>
          </div>

          {/* Section content */}
          <div>
            <div className='bg-color-100'>
              <Table>
                <TableHeader>
                  <TableRow >
                    <TableHead className="w-[100px] text-center">Posición</TableHead>
                    <TableHead className="w-[100px] text-center">Nombre del jugador</TableHead>
                    <TableHead className="w-[100px] text-center">Puntuación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.slice(0,10).map((item, index) => (
                    
                    <TableRow key={item.invoice}>
                      <TableCell className="font-medium w-[100px] text-center">{index + 1}</TableCell>
                      <TableCell className="font-medium w-[100px] text-center">{item.paymentStatus}</TableCell>
                      <TableCell className="font-medium w-[100px] text-center">{item.paymentMethod}</TableCell>
                    </TableRow>
                  ))}
                  
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4"></h1>
            <p className="text-xl text-gray-600"></p>
          </div>


        </div>
      </div>
    </section>
  )
}