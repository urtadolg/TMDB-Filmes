import { useRouter } from "next/router";
import React, { useEffect } from "react";
import DetailsLoadingPage from "../../../components/ui/DetailsLoadingPage";

const LoadingPage = () => {
  const router = useRouter();
  const { filmId } = router.query;

  useEffect(() => {
    router.push(`/details/${filmId}`);
  }, []);

  return <DetailsLoadingPage />;
};

export default LoadingPage;
