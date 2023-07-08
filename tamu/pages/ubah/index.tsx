import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";
import Link from "next/link"
 
 const koneksiTamu = axios.create({
  
  baseURL: "http://127.0.0.1:5000/api/tamu" 
});

export default function FormTamu() {
    const [statenama, setNama] = useState("");
    const [stateid_book, setid_book] = useState("");
    const [statetgl_ci, settgl_ci] = useState("2018-07-22");
    const [statetgl_co, settgl_co] = useState("2018-07-22");
    const [statektp, setktp] = useState("");
    const [tamu, settamu] =  useState(null);

    const [stateedit,setEdit]=useState("");

    const handleDelete = (event) => {
            event.preventDefault();
            var id_book = event.target.value;
            koneksiTamu.delete(`/${id_book}`)
              .then(response => {
                console.log('Data berhasil dihapus:', response.data);
                settamu(
                  tamu.filter((tamu) => {
                     return tamu.id_book !== id_book;
                  }))
             
                // Lakukan langkah-langkah lain setelah penghapusan data
              })
              .catch(error => {
                console.error('Gagal menghapus data:', error);
              })
          }

          const handleSubmitEdit =  (event) => {
    
            event.preventDefault();
            const address = "/"+event.target.id_book.value;
            alert(address);
            //const formData = new FormData(event.target);
            const formData = {
              id_book: event.target.id_book.value,
              nama: event.target.nama.value,
              tgl_ci: event.target.tgl_ci.value,
              tgl_co: event.target.tgl_co.value
          
          }
            alert(formData);
            koneksiTamu
              .put( address,formData)
              .then((res) => {
                console.log(res);
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
             
          }

          function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }

        const handleEdit = (event) => {
            event.preventDefault();
            var id_book = event.target.value;
            
               const tamEdit =  tamu.filter((tamu) => {
                     return tamu.id_book == id_book;
                  });
                  if(tamEdit!=null){

                    setNama(tamEdit[0].nama);
                    setid_book(tamEdit[0].id_book);
                    settgl_ci(formatDate(tamEdit[0].tgl_ci));
                    settgl_co(formatDate(tamEdit[0].tgl_co));
                    setktp(tamEdit[0].ktp);
                  }
          }
  useEffect(() => {
      async function gettamu() {
        const response = await koneksiTamu.get("/").then(function (axiosResponse) {
            settamu(axiosResponse.data.data); 
     
         })
         .catch(function (error) {   
          alert('error from mahasiswa in api mahasiswa: '+error);
         });;
          }
      gettamu();
    }, []);
  
   
if(tamu==null){
return(
  <div>
    waiting...
  </div>
)
}else{

  return (
    <center>
    <div className="style0">
    <div className='navbar'>
        <ul id="navbar">
          <li><Link href="/">BERANDA</Link><br></br></li>
          <li><Link href="/booking">DAFTAR</Link><br></br></li>
          <li><Link href="/ubah">UBAH DATA BOOKING</Link><br></br></li>
          <li><Link href="/list">LIST BOOKING</Link><br></br></li>
        </ul>
    </div>
    <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}>
 
          <table border={0}>
            <tbody>
            <tr>
            <td> <label> Id Booking:</label></td>
            <td><input type="text" id="id_book"  value={stateid_book} name="id_book"/>
              {/* onChange={handleOnchangeNim}  /> */}
              </td>
        </tr>
        <tr>
            <td>  <label> Nama:</label></td>
            <td><input type="text" id="nama"  value={statenama} name="nama"
               onChange={(e) => setNama(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Tanggal Check In:</label></td>
            <td>  <input type="date" value={statetgl_ci} name="tgl_ci"  onChange={(e) => settgl_ci(e.target.value)}
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> Tanggal Check Out:</label></td>
            <td>  <input type="date" value={statetgl_co} name="tgl_co"  onChange={(e) => settgl_co(e.target.value)}
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> Foto Ktp:</label></td>
            <td>  <img src={statektp} width="80"/> </td>
        </tr>
            </tbody>
          </table>
          <input type="submit" />
          </form>  
        <br/>
        <br/>
       
      <h2>Ubah Data Booking Hotel</h2>
    
        <table border={1} id="tampilantabel">
            <thead>
                <tr>
                  <td><b>Id Booking</b></td> 
                <td><b>Nama</b></td>
                <td><b>Tanggal Check In</b></td>
                <td><b>Tanggal Check Out</b></td>
                <td><b>Foto Ktp</b></td>
                <td colSpan={2}><b>Action</b></td>
                </tr>
            </thead>
            <tbody id="tabeldalam">
            {tamu.map((tam) => 
                <tr>
                    <td>{tam.id_book}</td>
                    <td>{tam.nama}</td>
                    <td>{tam.tgl_ci}</td>
                    <td>{tam.tgl_co}</td>
                    <td><img src={tam.ktp} width="80"/></td>
                   <td><button onClick={handleEdit} value={tam.id_book}>edit</button></td>
                   <td><button onClick={handleDelete} value={tam.id_book}>delete</button></td>
                </tr>
           )}     
                   </tbody>
          </table>
         
          </div>
          </center>
        )
}
  
  }
