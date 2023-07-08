import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="style0">
        <div className="judul">
          <h1>BOOKING HOTEL</h1>
        </div>
        <div className='navbar'>
        <ul id="navbar">
          <li><Link href="/">BERANDA</Link><br></br></li>
          <li><Link href="/booking">DAFTAR</Link><br></br></li>
          <li><Link href="/ubah">UBAH DATA BOOKING</Link><br></br></li>
          <li><Link href="/list">LIST BOOKING</Link><br></br></li>
        </ul>
        </div>
        <br />
    </div>
  )
}