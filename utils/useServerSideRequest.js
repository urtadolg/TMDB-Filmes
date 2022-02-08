import axios from "axios";

export const sendMovieDetailsRequest = async (movieId) => {
  try {
    const releaseInformations = await findReleaseInformations(movieId);

    const requestUrl = buildURL(releaseInformations, movieId);

    const response = await axios.get(requestUrl);

    const formatedMovieData = formatMovieData(response, releaseInformations);

    return formatedMovieData;
  } catch (error) {
    console.log(error);
    return {
      error:
        "Detalhes do movie não encontrado. Por favor, tente novamente mais tarde.",

      main_details: {
        overview: "",
        title: "",
      },
    };
  }
};

async function findReleaseInformations(movieId) {
  const requestUrl = `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${process.env.API_KEY}`;

  const response = await axios.get(requestUrl);

  const releaseInformationsList = response.data.results;

  const reducedReleaseInformation = reduceReleaseInformation(
    releaseInformationsList
  );

  const firstReleaseInformations = releaseInformationsList[0];

  if (reducedReleaseInformation.length == 0) {
    const selectedReleaseInformations = formatReleaseData(
      firstReleaseInformations
    );

    return selectedReleaseInformations;
  }

  const selectedReleaseInformations = selectReleaseByCountryPriority(
    reducedReleaseInformation
  );

  return selectedReleaseInformations;
}

function reduceReleaseInformation(releaseInformationsList) {
  const reducedReleaseInformation = releaseInformationsList.reduce(
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

  return reducedReleaseInformation;
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
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=pt-BR&append_to_response=release_dates,credits`;
  }

  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=release_dates,credits`;
}

function formatMovieData(response, releaseInformations) {
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
      overview: response.data.overview,

      people: formatPeople(response.data.credits.crew),
    },

    cast: {
      list: [],
    },

    trailer: {
      videoLink: "",
    },

    see_also: {
      list: [],
    },
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
