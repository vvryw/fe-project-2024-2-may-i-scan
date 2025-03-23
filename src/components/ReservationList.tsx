// "use client"
// import { useAppSelector, AppDispatch } from "@/redux/store"
// import { useDispatch } from "react-redux"
// import { removeBooking } from "@/redux/features/bookSlice"
// import { removeReservation } from "@/redux/features/reserveSlice"
// import { BookingItem } from "../../interface"
// import { ReservationItem } from "../../interface"

// export default function ReservationList() {
    
//     const reserveItems = useAppSelector( (state) => state.reserveSlice.reserveItems )
//     const dispatch = useDispatch<AppDispatch>()

//     return (
//         <div>
//         {
//             reserveItems.length === 0 ?
//             (
//                 <p className="text-gray-500 text-center py-5">No Massage Reservation</p>
//             )
//             :
//             (
//                 reserveItems.map( (ReservationItem) => (
//                 <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-3" key={`${ReservationItem.nameLastname}-${ReservationItem.reserveDate}`} >
//                         <div className="text-xl font-semibold">{ReservationItem.nameLastname}</div>
//                         <div className="text-md">Contact: {ReservationItem.tel}</div>
//                         <div className="text-md">Massage Shop: {ReservationItem.massageShop}</div>
//                         <div className="text-md">Booking Date: {ReservationItem.reserveDate}</div>

//                         <button 
//                         className="block rounded-md bg-sky-600 text-white shadow-sm my-2
//                         hover:bg-indigo-600 px-3 py-2
//                         active:bg-indigo-700 active:scale-95" 
//                         onClick={ () => dispatch(removeReservation(ReservationItem)) } >
//                             Remove from Booking List
//                         </button>
//                 </div>
//             ) )
//             )
//         }
//         </div>
//     )
// }

'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { ReservationItem , MassageItem } from '../../interface'

export default function ReservationList() {
  const { data: session } = useSession() //debug show only user's reserve
  const [reservations, setReservations] = useState<ReservationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.accessToken) return //debug show only user's reserve

    console.log("user token: " , session?.accessToken)

    const fetchReservations = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/reservations', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
          },
        })

        if (!res.ok) {
          throw new Error('Failed to fetch reservations')
        }

        const data = await res.json()
        setReservations(data.data || [])
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    // const fetchReservations = async () => {
    //   try {
    //     const token = localStorage.getItem('token') // or get from useSession if using NextAuth

    //     const res = await fetch('http://localhost:5000/api/v1/reservations', {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //       },
    //     })

    //     console.log("user's token: ", token)

    //     if (!res.ok) {
    //       throw new Error('Failed to fetch reservations')
    //     }

    //     const data = await res.json()
    //     setReservations(data.data || []) // adjust based on your backend response shape
    //   } catch (err) {
    //     console.error('Error:', err)
    //   } finally {
    //     setLoading(false)
    //   }
    // }

    fetchReservations()
  }, [session])
  // }, [])

  return (
    <div>
      {loading ? (
        <p className="text-gray-500 text-center py-5">Loading reservations...</p>
      ) : reservations.length === 0 ? (
        <p className="text-gray-500 text-center py-5">No Massage Reservations</p>
      ) : (
        reservations.map((item) => (
          <div
              className="bg-slate-200 rounded px-5 mx-5 py-2 my-3"
              key={item._id}
          >
            {
            item.massageShop ? 
            (
            <>
                <div className="text-xl font-semibold">{item.massageShop.name}</div>
                <div className="text-md">Address: {item.massageShop.address}</div>
                <div className="text-md">Contact: {item.massageShop.phoneNumber}</div>
            </>
            ) 
            : 
            (
                <div className="text-red-500">Massage shop data not available</div>
            )}
        </div>
        ))
      )}
    </div>
  )
}
