import React from "react";
import FilmDetail from "../../../components/main/film_detail/FilmDetail";

const HomePage = (props) => {
  return (
    <React.Fragment>
      <FilmDetail />
    </React.Fragment>
  );
};

/* export async function getServerSideProps(context) {
  const req = context.req; //get filmId

  //server request (all requests)
  return {
    props: {},
  };
} */

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: {
          filmId: "634649",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const filmId = context.params.filmId;

  const response = await fetch(
    "https://api.themoviedb.org/3/movie/634649?api_key="
  );

  const data = await response.json();

  console.log(data);

  return {
    props: {},
    revalidate: 3600,
  };
}

export default HomePage;
