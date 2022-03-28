import React from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
export default function Home(){
  const navigate = useNavigate()
  return(
  <>
    <div className='backgorund'>
      <div className='backgorund-content-one'>
        <h1>Amethys</h1>
        </div>
        <div className='backgorund-content-two'>
          <h2>About This project</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Tempore neque suscipit ullam excepturi nulla quam eum illum sequi 
            explicabo doloremque nam non earum at dolorum deleniti tenetur,
            consequuntur corporis temporibus nobis expedita vitae reprehenderit, 
            ex harum! Nostrum cupiditate corrupti praesentium, eius omnis ab ipsum
              facilis nihil tempora accusantium. Ipsam amet ratione deleniti molestiae 
              nemo nesciunt nulla, quibusdam possimus tempora magnam sit, ad totam rerum 
              iure, earum dignissimos ipsum dolorum corporis doloribus aperiam ipsa. 
              Quo ullam, quisquam vitae nulla iusto iure perferendis quam quia 
              exercitationem magni, autem sequi minima modi assumenda dignissimos 
              eligendi sint recusandae vero.
            Saepe corrupti dignissimos eius facere!</p>
          <div className='tbns'>
          <button onClick={() => navigate('/login')}>Login</button>
          <label>Or</label>
          <button onClick={() => navigate('/singup')}>Sing up</button>
          </div>
        </div>
    </div>
  </>)
}