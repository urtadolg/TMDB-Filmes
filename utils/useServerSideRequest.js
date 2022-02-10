import axios from "axios";

export const sendMovieDetailsRequest = async (movieId) => {
  try {
    const releaseInformations = await findReleaseInformations(movieId);

    const requestUrl = buildURL(releaseInformations, movieId);

    const response = await axios.get(requestUrl);

    const formatedMovieData = formatMovieData(response, releaseInformations);

    return formatedMovieData;
  } catch (error) {
    const customError =
      "Detalhes do filme não encontrado. Por favor, tente novamente mais tarde.";
    console.log(error);

    return {
      error: customError,
      main_details: {
        title: "Detalhes não encontrado",
        overview: customError,
      },
    };
  }
};

async function findReleaseInformations(movieId) {
  const requestUrl = `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${process.env.API_KEY}`;

  const response = await axios.get(requestUrl);

  const releaseInformationsList = response.data.results;

  const releaseInformationByCountry = findReleaseInformationByCountry(
    releaseInformationsList
  );

  const firstReleaseInformations = releaseInformationsList[0];

  if (releaseInformationByCountry.length == 0) {
    const selectedReleaseInformations = formatReleaseData(
      firstReleaseInformations
    );

    return selectedReleaseInformations;
  }

  const selectedReleaseInformations = selectReleaseByCountryPriority(
    releaseInformationByCountry
  );

  return selectedReleaseInformations;
}

function findReleaseInformationByCountry(releaseInformationsList) {
  const releaseInformationByCountry = releaseInformationsList.reduce(
    (result, item) => {
      const country = item.iso_3166_1;
      const release_type = item.release_dates[0].type;

      if ((country == "BR") | (country == "US") | (release_type == 1)) {
        const formatedReleaseData = formatReleaseData(item);

        result.push(formatedReleaseData);
      }

      return result;
    },
    []
  );

  return releaseInformationByCountry;
}

function formatReleaseData(releaseData) {
  if (!releaseData) {
    return {
      country: "NA",
      age_group: "Faixa etária não encontrada",
      release_date: "Data de lançamento desconhecida",
      release_type: "NA",
    };
  }

  const country = releaseData.iso_3166_1;
  const certification = releaseData.release_dates[0].certification;
  const releaseDate = releaseData.release_dates[0].release_date;

  return {
    country,
    age_group: handleAgeGroup(certification),
    release_date: handleReleaseDate(releaseDate, country),
    release_type: releaseData.release_dates[0].type,
  };
}

function selectReleaseByCountryPriority(releaseInformations) {
  const foundBrRelease = releaseInformations.find(
    (item) => item.country === "BR"
  );

  if (foundBrRelease) {
    return foundBrRelease;
  }

  const foundUsRelease = releaseInformations.find(
    (item) => item.country === "US"
  );

  if (foundUsRelease) {
    return foundUsRelease;
  }

  const foundPremiereRelease = releaseInformations.find(
    (item) => item.release_type === 1
  );

  return foundPremiereRelease;
}

function handleAgeGroup(certification) {
  if (certification == "") {
    return "Faixa Etária não encontrada";
  }

  const ageGroup = parseInt(certification);

  if (isNaN(ageGroup)) {
    return `Faixa Etária: ${certification}`;
  }

  return `${ageGroup} anos`;
}

function handleReleaseDate(releaseDate, country) {
  if (!releaseDate) {
    return "Data de lançamento desconhecida";
  }

  const fullDate = releaseDate.slice(0, 10);
  const day = fullDate.slice(-2);
  const month = fullDate.slice(5, 7);
  const year = fullDate.slice(0, 4);

  return `${day}/${month}/${year} (${country})`;
}

function buildURL(releaseInformations, movieId) {
  if (releaseInformations.country == "BR") {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=pt-BR&append_to_response=release_dates,credits,videos,similar`;
  }

  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=release_dates,credits,videos,similar`;
}

async function formatMovieData(response, releaseInformations) {
  const formatedMovieData = {
    main_details: {
      poster: `http://image.tmdb.org/t/p/w500/${response.data.poster_path}`,
      title: response.data.title,
      summary: {
        age_group: releaseInformations.age_group,
        releaseDate: releaseInformations.release_date,
        genres: response.data.genres.map((item) => item.name),
        runtime: formatRunTime(response.data.runtime),
      },
      vote_average: formatVoteAverage(response.data.vote_average),
      overview: await formatOverviewText(
        response.data.overview,
        response.data.id,
        response.data.original_language
      ),

      people: formatPeople(response.data.credits.crew),
    },

    cast: formatCastList(response.data.credits.cast),

    trailer: await formatTrailerlink(
      response.data.videos.results,
      response.data.original_language,
      response.data.id
    ),

    see_also: formatSeeAlsoList(response.data.similar.results),
  };

  return formatedMovieData;
}

function formatRunTime(minutes) {
  if ((minutes == null) | (minutes == 0)) {
    return "Duração Não Encontrada";
  }

  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;
  const hoursText = `00${hours}`.slice(-2);
  const minutesText = `00${min}`.slice(-2);

  return `${hoursText}:${minutesText}`;
}

function formatVoteAverage(voteAverage) {
  if (voteAverage == 0) {
    return "NA";
  }

  return `${voteAverage * 10}%`;
}

function formatPeople(crewList) {
  const filteredCrewList = crewList.reduce((result, item) => {
    if (
      (item.job === "Director") |
      (item.job === "Characters") |
      (item.job === "Screenplay")
    ) {
      result.push({
        name: item.name,
        role: item.job,
      });
    }

    return result;
  }, []);

  return filteredCrewList;
}

function formatCastList(castList) {
  const formatedCastList = castList.map((item) => {
    return {
      name: item.name,
      profile_pic: `http://image.tmdb.org/t/p/w185/${item.profile_path}`,
      character_name: item.character,
    };
  });

  return formatedCastList;
}

async function formatTrailerlink(trailersList, original_language, movie_id) {
  if (trailersList.length == 0) {
    trailersList = await originalLangTrailerRequest(
      original_language,
      movie_id
    );
  }

  let formatedTrailersList = trailersList.reduce((result, item) => {
    if ((item.type == "Trailer") | (item.type == "Clip")) {
      result.push({
        name: item.name,
        link: item.key,
      });
    }

    return result;
  }, []);

  if (formatedTrailersList.length == 0) {
    return {
      name: "NA",
      link: "",
    };
  }

  if (formatedTrailersList.length > 0) {
    formatedTrailersList = formatedTrailersList[0];

    if (formatedTrailersList.length > 0) {
      return formatedTrailersList[0];
    }

    return formatedTrailersList;
  }

  return formatedTrailersList;
}

async function originalLangTrailerRequest(original_language, movie_id) {
  const requestUrl = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${process.env.API_KEY}&language=${original_language}`;

  const trailerListResponse = await axios.get(requestUrl);

  return trailerListResponse.data.results;
}

function formatSeeAlsoList(moviesList) {
  const selectedMoviesList = moviesList.slice(0, 6);

  const formatedMoviesList = selectedMoviesList.map((movie) => {
    return {
      banner: `http://image.tmdb.org/t/p/w185${movie.poster_path}`,
      title: movie.title,
      date: formatDate(movie.release_date),
      id: movie.id,
    };
  });

  return formatedMoviesList;
}

function formatDate(date) {
  if (!date) {
    return "NA";
  }

  const day = date.slice(-2);
  const month = getMonthName(date.slice(5, 7));
  const year = date.slice(0, 4);

  return `${day} ${month} ${year}`;
}

function getMonthName(month) {
  const monthNames = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];

  return monthNames[month - 1];
}

async function formatOverviewText(overview, movie_id, original_language) {
  if (overview.length == 0) {
    const requestUrl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.API_KEY}&language=${original_language}`;

    overview = await axios.get(requestUrl);

    return overview.data.overview;
  }

  return overview;
}
