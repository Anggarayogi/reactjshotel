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

    const handleSubmitAdd =  (event) => {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiTamu
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
     
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
    <div className="style0"> 
    <center> <h1>Formulir Booking Hotel</h1>
    <div>
    <div className='navbar'>
        <ul id="navbar">
          <li><Link href="/">BERANDA</Link><br></br></li>
          <li><Link href="/booking">DAFTAR</Link><br></br></li>
          <li><Link href="/ubah">UBAH DATA BOOKING</Link><br></br></li>
          <li><Link href="/list">LIST BOOKING</Link><br></br></li>
        </ul>
    </div>
       <form id="formadd" onSubmit={handleSubmitAdd} >
        <table border={0}>
            <tbody>
            <tr>
            <td> <label> Id Booking:</label></td>
            <td><input type="text" id="id_book" name="id_book"/>
        
              </td>
        </tr>
        <tr>
            <td>  <label> Nama:</label></td>
            <td><input type="text" id="nama"   name="nama" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Tanggal Check In:</label></td>
            <td>  <input type="date" name="tgl_ci"
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> Tanggal Check Out:</label></td>
            <td>  <input type="date" name="tgl_co"
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> Foto Ktp:</label></td>
            <td>   <input
                    type="file" name="image"/>  </td>
        </tr>
            </tbody>
          </table>
          <input type="submit" />
          </form>  
        </div>
        </center>
        </div>
 
      )
}
  
  }