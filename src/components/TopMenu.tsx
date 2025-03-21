// import styles from './topmenu.module.css'
// import Image from 'next/image';
// import TopMenuItem from './TopMenuItem';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
// import { Link } from '@mui/material';

// export default async function TopMenu() {

//     const session = await getServerSession(authOptions)

//     return (
//         <div className='fixed top-0 left-0 right-0 z-30 h-[50px] flex flex-row bg-white border-b border-gray-300 justify-end'>
//             <div className='flex flex-row absolute left-0 h-full w-full'>
//             {
//                 session? <Link href="/api/auth/signout">
//                     <div className='flex items-center absolute left-0 h-full px-2 text-cyan-600 text-sm'>
//                     Sign-Out of {session.user?.name} </div></Link>
//                 : <Link href="/api/auth/signin">
//                     <div className='flex items-center absolute left-0 h-full px-2 text-cyan-600 text-sm'>
//                     Sign-In</div></Link>
//             }
//             <TopMenuItem title='My Booking' pageRef='/mybooking' />
//             </div>

//             <TopMenuItem title='Booking' pageRef='/booking' />
//             <Image 
//                 src={'/img/logo.png'} 
//                 className='h-100% w-auto'
//                 alt='logo' width={0} height={0} sizes="100vh" 
//             />
//         </div>
//     );
// }
'use client'
import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from 'next/link'; 
import { useSession, signIn, signOut } from 'next-auth/react'

// export default async function TopMenu() {
export default function TopMenu() {
    // const session = await getServerSession(authOptions);
    const { data: session, status } = useSession()

    return (
        <div className='fixed top-0 left-0 right-0 z-30 h-[50px] flex flex-row bg-white
         border-b border-gray-300 items-center px-4'>

            <div className="flex flex-row items-center gap-4">
                {/* {
                    session ? 
                    (
                        <Link href="/api/auth/signout" className='text-cyan-600 text-sm'>
                            Sign-Out of {session.user?.name}
                        </Link>
                    ) 
                    : 
                    (
                        <Link href="/api/auth/signin" className='text-cyan-600 text-sm'>
                            Sign-In
                        </Link>
                    )
                } */}

                {
                    status === 'loading' ? (
                    <span className="text-sm text-gray-500">Loading...</span>
                    ) : session ? (
                    <Link href="/api/auth/signout" className="text-cyan-600 text-sm">
                        Sign-Out of {session.user?.name}
                    </Link>
                    ) : (
                    <Link href="/api/auth/signin" className="text-cyan-600 text-sm">
                        Sign-In
                    </Link>
                    )
                }

                {/* <TopMenuItem title='My Booking' pageRef='/mybooking' /> */}
                <TopMenuItem title='My Resevation' pageRef='/myreservation' />
            </div>

            <div className="flex-grow"></div>

            {/* <div className='w-[90px]'><TopMenuItem title='Booking' pageRef='/booking'/></div> */}
            <div className='w-[90px]'><TopMenuItem title='Reservation' pageRef='/reservation'/></div>
            <div className='w-[70px]'><TopMenuItem title='Home' pageRef='/' /></div>

            <Image 
                src={'/img/logo.png'} 
                alt='logo' 
                width={50} height={50} 
            />
        </div>
    );
}
