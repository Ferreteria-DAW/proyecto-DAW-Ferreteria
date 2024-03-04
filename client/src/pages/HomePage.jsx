import React from "react";
import { Link } from "react-router-dom";
import Products from "../components/Products";

import Card from "../components/Card";
import img1 from "../images/toolstore/key-chain.png";
import img2 from "../images/toolstore/faucet.png";
import img3 from "../images/toolstore/toolbox.png";
import img4 from "../images/toolstore/paint.png";
import img5 from "../images/toolstore/kitchen.png";
import img6 from "../images/toolstore/light-bulb.png";
import tool1 from "../images/toolstore/herramienta1.jpg";
import tool2 from "../images/toolstore/herramienta2.jpg";
import prices from "../images/toolstore/precios.png";
import img7 from "../images/toolstore/img-footer.avif";
import img8 from "../images/toolstore/correct.png";
import meet1 from "../images/toolstore/meet-us1.png";
import meet2 from "../images/toolstore/meet-us2.png";

const HomePage = () => {
  return (
    // <Products />
    <main>
      <section className="main-contact-section">
        <Link
          to="https://www.google.com/maps/place/C.+Anselmo+Solar,+52,+33204+Gij%C3%B3n,+Asturias/@43.5306354,-5.644582,17z/data=!3m1!4b1!4m6!3m5!1s0xd367b7d96127bd5:0xc16f7aa563e5d3c6!8m2!3d43.5306354!4d-5.644582!16s%2Fg%2F11c28d_s0v?entry=ttu"
          target="_blank"
        >
          Calle Anselmo Solar 52
        </Link>
        <Link to="mailto:correo@gmail.com">Envianos un Email</Link>

        <Link to="">984 70 09 04</Link>
      </section>

      <section className="section-tours-title">
        <h3>FERRETERIA CON 50 AÑOS DE HISTORIA</h3>
        <h1>Nuestros Productos</h1>
        <p>
          <strong>Tenemos todo lo que necesita</strong> ¿Lo duda? Ven a
          visitarnos y encontrá exactamente lo que está buscando
        </p>
      </section>
      <section className="section-tours">
        <Card
          img={img1}
          category={"Cerrajeria"}
          title={"Llaves y cerraduras"}
          description={" Copias de Llaves, bombines, cerraduras, pomos..."}
        />
        <Card
          img={img2}
          category={"Fontaneria"}
          title={"Grifería"}
          description={
            " Vendemos todo tipo de herramientas y accesorios de fontanería."
          }
        />
        <Card
          img={img3}
          category={"Herramientas"}
          title={"Bricolaje"}
          description={
            " Tenemos a la venta herramientas manuales, eléctricas y de batería"
          }
        />
        <Card
          img={img4}
          category={"Pintura"}
          title={"Materiales para pintar"}
          description={
            "Disponemos de pinturas profesionales para exterior, interior o muebles"
          }
        />
        <Card
          img={img5}
          category={"Decoracion"}
          title={"Menaje"}
          description={
            " Baterías de cocina, cubertería, percheros, alfombras..."
          }
        />
        <Card
          img={img6}
          category={"Iluminacion"}
          title={"Electricidad"}
          description={"Bombillas, cables, enchufes, conectores..."}
        />
      </section>

      <section className="professionalism-section">
        <h3>PROFESIONALIDAD Y EXCELENCIA</h3>
        <h2>Ferretería en Gijón</h2>
        <div className="professionalism-container">
            <p>
              Si necesitas hacer una copia de una llave en Gijón, ¡estás en el
              lugar correcto! Realizamos copias de llaves para cualquier tipo de
              cerradura. También puedes encontrar una amplia variedad de
              cerraduras para puertas y armarios en nuestra tienda. Además,
              ofrecemos una selección de pinturas de calidad, así como productos
              de droguería y todo tipo de menaje del hogar. No nos olvidamos de
              las herramientas. Disponemos de una amplia variedad de herramientas
              de calidad para todo tipo de proyectos, incluyendo eléctricas y de
              batería. También encontrarás una selección de productos de
              decoración para el hogar, como cuadros, espejos y objetos
              decorativos. Por otro lado, si necesitas cualquier pieza de
              fontanería, ¡no busques más ! Ofrecemos multitud de productos de
              fontanería, como tuberías, grifos y accesorios para baño y cocina.
              También contamos con productos de grifería de calidad para todo tipo
              de necesidades. Si necesitas algo específico que no encuentras en
              nuestra tienda, haremos todo lo posible por conseguirlo para ti. Te
              esperamos en nuestra ferretería en Gijón.
            </p>
          <div className="container-tools">
            <div><img src={tool1} alt="Imagen herramientas" className="img1" />
              <img src={tool2} alt="Imagen herramientas" className="img2" />
            </div>
            <img src={prices} alt="Mensaje precios" className="img3" />
          </div>
        </div>
      </section>

      <section className="quality-section">
        <article>
          <h3>Ferreteria VegaGrande</h3>
          <div className="article-main">
            <p>
              Si necesitas hacer una copia de una llave en Gijón, ¡estás en el
              lugar correcto! <strong></strong>Realizamos copias de llaves para
              cualquier tipo de. También puedes encontrar una amplia
              variedad de cerraduras para puertas y armarios en nuestra tienda.
              Además,
              <strong>ofrecemos una selección de pinturas de calidad</strong>,
              así como productos de droguería y todo tipo de menaje del hogar.
              No nos olvidamos de las herramientas.{" "}
              <strong>
                Disponemos de una amplia variedad de herramientas de calidad
              </strong>{" "}
              para todo tipo de proyectos, incluyendo eléctricas y de batería.{" "}
              <strong>
                También encontrarás una selección de productos de decoración
                para el hogar
              </strong>
              , como cuadros, espejos y objetos decorativos. Por otro lado,{" "}
              <strong>si necesitas cualquier pieza de fontanería</strong>, ¡no
              busques más! Ofrecemos multitud de productos de fontanería, como
              tuberías, grifos y accesorios para baño y cocina. También contamos
              con productos de grifería de calidad para todo tipo de
              necesidades. Si necesitas algo específico que no encuentras en
              nuestra tienda, haremos todo lo posible por conseguirlo para ti.{" "}
              <strong>Te esperamos en nuestra ferretería en Gijón</strong>.
            </p>
            <img
              className="article-image"
              src={img7}
              alt="Imagen herramientas expuestas"
            />
          </div>

          <div className="check-container">
            <div className="check-element">
              <img src={img8} alt="Logo check" className="icon" />
              <p>
                Reparaciones
              </p>
            </div>
            <div className="check-element">
              <img src={img8} alt="Logo check" className="icon" />
              <p>
                Bricolaje
              </p>
            </div>
            <div className="check-element">
              <img src={img8} alt="Logo check" className="icon" />
              <p>
                Decoración
              </p>
            </div>
            <div className="check-element">

              <img src={img8} alt="Logo check" className="icon" />
              <p>
                Obra nueva
              </p>
            </div>
          </div>
        </article>
      </section>


      <section className="meet-us">
        <h3>Ferretería en Gijón</h3>
        <div className="right-container">
          <h2>Conoce Nuestra Ferretería</h2>
          <Link to="/contact">Más Info</Link>
        </div>

        <div className="meet-us__img-container">
          <img src={meet1} alt="" />
          <img src={meet2} alt="" />
          <img src={meet1} alt="" />
          <img src={meet2} alt="" />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
