import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { movieActions } from "../../../store/movieSlice";
import Head from "next/head";
import MovieDetail from "../../../components/main/movie_detail/MovieDetail";
import { sendMovieDetailsRequest } from "../../../utils/useServerSideRequest";

const HomePage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(movieActions.stopLoadingState()), []);

  return (
    <React.Fragment>
      <Head>
        <meta name="description" content={props.main_details.overview} />
        <title>{props.main_details.title}</title>
      </Head>

      {!props.error ? (
        <MovieDetail {...props} />
      ) : (
        <div
          style={{ textAlign: "center", fontSize: "1.5rem", margin: "5rem" }}
        >
          <h1>Ops...</h1>
          <p>{props.error}</p>
        </div>
      )}
    </React.Fragment>
  );
};

export async function getStaticPaths() {
  return {
    fallback: "blocking",
    paths: [
      {
        params: {
          movieId: "634649",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const movieId = context.params.movieId;

  const movieDetailsData = await sendMovieDetailsRequest(movieId);

  return {
    props: movieDetailsData,
    revalidate: 3600,
  };
}

export default HomePage;
