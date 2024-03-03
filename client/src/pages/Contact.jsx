import React from "react";
import phone from '../images/toolstore/telefono.png';
import location from '../images/toolstore/location3.png';
import message from '../images/toolstore/message.png';

const Contact = () => {
  return (
    <>
      <section className="main-contact-section">
        <a
          href="https://www.google.com/maps/place/C.+Anselmo+Solar,+52,+33204+Gij%C3%B3n,+Asturias/@43.5306354,-5.644582,17z/data=!3m1!4b1!4m6!3m5!1s0xd367b7d96127bd5:0xc16f7aa563e5d3c6!8m2!3d43.5306354!4d-5.644582!16s%2Fg%2F11c28d_s0v?entry=ttu"
          target="_blank"
        >
          Calle Anselmo Solar 52
        </a>
        <a href="mailto:correo@gmail.com">Envianos un Email</a>
        <a href="">984 70 09 04</a>
      </section>

      <section className="header-contact">
        <h1>Contacto</h1>
        <button>Enviar</button>
      </section>

      <section className="contact-container">
        <div className="image-container">
          <img
            src={phone}
            alt="Imagen 1"
            className="logos"
          />
          <h2>Telefono</h2>
          <p>984 19 48 15</p>
        </div>
        <div className="image-container">
          <img
            src={location}
            alt="Imagen 2"
            className="logos"
          />
          <h2>Direccion</h2>
          <p>C/Aguado 36 33202 Gijon, Asturias</p>
        </div>
        <div className="image-container">
          <img
            src={message}
            alt="Imagen 3"
            className="logos"
          />
          <h2>Mail</h2>
          <p>Envianos un email</p>
        </div>
      </section>

      <section className="form-section">
        <div id="map" className="map"></div>
        <div className="form-container">
          <form action="mailto:correo@gmail.es" method="post" className="form-contact">
            <legend>Escribe un mensaje</legend>
            <div className="form-group">
              <label for="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" required />
            </div>

            <div className="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label for="telefono">Teléfono:</label>
              <input type="tel" id="telefono" name="telefono" />
            </div>

            <div className="form-group">
              <label for="mensaje">Mensaje:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
