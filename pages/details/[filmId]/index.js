import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { filmActions } from "../../../store/filmSlice";
import Head from "next/head";
import FilmDetail from "../../../components/main/film_detail/FilmDetail";

const HomePage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filmActions.stopLoadingState());
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta name="description" content={props.description} />
        <title>{props.title}</title>
      </Head>
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
    "https://api.themoviedb.org/3/movie/634649?api_key=" + process.env.API_KEY
  );

  const data = await response.json();

  console.log(data);

  return {
    props: {},
    revalidate: 3600,
  };
}

export default HomePage;
