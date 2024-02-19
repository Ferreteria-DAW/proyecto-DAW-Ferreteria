import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className=" bg-indigo-300 flex justify-center items-center">
      <header className=" bg-zinc-700 p-10">
        <h1 className=" text-5xl py-3 font-bold">Ferretería VegaGrande</h1>
        <p className=" text-emerald-50 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
          quidem magni illo tempore necessitatibus assumenda et porro debitis?
          Quisquam eaque quos vitae quo beatae itaque ad consequuntur in libero
          ex? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus odit sint laborum, similique qui natus velit iure
          corporis placeat aspernatur quod, error hic impedit voluptate amet ut
          est, alias officiis.
        </p>

        <Link className=" text-indigo-300 text-lg" to={'/register'}>
          ¿Aún no tienes cuenta? Crea una y descubre los mejores precios
        </Link>
      </header>
    </section>
  );
};

export default HomePage;
