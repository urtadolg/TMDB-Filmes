import { useRouter } from "next/router";
import React, { useEffect } from "react";
import DetailsLoadingPage from "../../../components/ui/DetailsLoadingPage";

const LoadingPage = () => {
  const router = useRouter();
  const movieId = router.query.movieId;

  useEffect(() => {
    router.replace(`/details/${movieId}`);
  }, [router, movieId]);

  return <DetailsLoadingPage />;
};

export default LoadingPage;
