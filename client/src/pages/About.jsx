import React from "react";
import Img1 from '../images/toolstore/ferreteriaDependiente.webp';

const About = () => {
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

      <section className="about-us">
        <div className="col-about-1">
          <h3>FERRETERÍA EN GIJÓN</h3>
          <h1>Nuestra ferretería</h1>
          <p>
            Ferretería VegaGrande es una empresa familiar con más de 50 años de
            experiencia en el sector, dando respuesta día a día a las
            necesidades de nuestros clientes.Nuestro compromiso es brindar una
            atención personalizada, buscando su satisfacción e intentando
            siempre encontrar soluciones a lo que nos piden. Nuestros padres
            abrieron la ferretería hace 52 años, con toda la ilusión y
            dedicación del mundo, por eso es tan importante para nosotros seguir
            su legado. Hoy en día, seguimos manteniendo ese trato cercano y
            estamos siempre a tu disposición para resolver cualquier duda o para
            facilitarte los artículos que no logras encontrar. Nuestros clientes
            nos conocen porque tenemos la capacidad de resolver sus problemas y
            encontrar aquellos productos que necesitan. ¿Estás buscando algo que
            no encuentras? Nosotros lo buscamos por ti incluso si no lo tenemos
            en la tienda, ven a visitarnos y te atenderemos encantados.
          </p>
        </div>

        <img
          src={Img1}
          alt="ferreteriaDependiente"
        />

        <a href="https://www.google.es/maps/place/Ferreter%C3%ADa+Vegagrande/@43.5306393,-5.6471569,17z/data=!3m1!4b1!4m6!3m5!1s0xd367b7d95bc8409:0xabc51fb94544c57b!8m2!3d43.5306354!4d-5.644582!16s%2Fg%2F11c1nvwrw1?entry=ttu">
          {" "}
          Donde Estamos
        </a>
      </section>
    </>
  );
};

export default About;
