// This function is for getting the 'time ago' when the youtube videos were published
function getTimeAgo(date) {
  const parsedDate = Date.parse(date);

  // we instantiate a RelativeTimeFormat object to be able to get the time ago
  const rtf = new Intl.RelativeTimeFormat();

  // here we will calculate how many seconds have passed since the date we want until now
  const getSecondsDiff = (timestamp) => {
    // we use Date.now to get the timestamp of the current time
    // since the timestamps are given in milliseconds we will divide them
    // by 1000 to get only seconds
    return (Date.now() - timestamp) / 1000;
  };

  // This object will contain the units and their respective values to determine
  // the message we will display according to the number of seconds of difference
  // between the two dates
  const DATE_UNITS = {
    month: 2628288,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  // here we will evaluate if the number of seconds elapsed between the dates
  // are more than any of the date units to then determine how the time ago
  // will be displayed, for example if the seconds elapsed are more than 3600
  // we will display the time ago in hours and not in minutes or seconds
  const getUnitAndValueDate = (secondsElapsed) => {
    for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
      if (secondsElapsed >= secondsInUnit || unit === "second") {
        const value = Math.floor(secondsElapsed / secondsInUnit) * -1;

        return { value, unit };
      }
    }
  };

  const secondsElapsed = getSecondsDiff(parsedDate);
  const { value, unit } = getUnitAndValueDate(secondsElapsed);

  // the RelativeTimeFormat object will generate a formatted relative date
  // using the amount of time and the unit we want to display
  // so if the calculation in the getUnitAndValue was 10 and the unit is
  // day we should have a result like '10 days ago', so this RelativeTimeFormat
  // will also traduce this according to the language of the browser, and if the language is not supported
  // the default will be English
  return rtf.format(value, unit);
}

// Fetching YouTube API to get latest videos of my channel
async function fetchChannelVideos() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "472d624bcdmsh944d67a1e8c7b79p189978jsn159e7d26ff58",
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };

  const result = await fetch(
    "https://youtube-v31.p.rapidapi.com/search?channelId=UCioHXaF2-XV-cUT6uuah-ng&part=snippet%2Cid&order=date&maxResults=5",
    options
  );

  const data = await result.json();
  const videos = data.items;

  return videos;
}

async function renderYoutubeVideoCards() {
  const videos = await fetchChannelVideos();

  const youtubeVideosCarrousel = document.querySelector(
    ".youtube__videos-carrousel-container"
  );

  const videoCards = [];

  for (let i = 0; i < videos.length - 1; i++) {
    const youtubeVideoCard = document.createElement("a");
    youtubeVideoCard.href = `https://www.youtube.com/watch?v=${videos[i].id.videoId}`;
    youtubeVideoCard.target = "_blank";
    youtubeVideoCard.rel = "noopener noreferrer";
    youtubeVideoCard.classList.add("youtube__video-card");

    const youtubeVideoThumbnail = document.createElement("img");
    youtubeVideoThumbnail.classList.add("youtube__video-thumbnail");
    youtubeVideoThumbnail.src = videos[i].snippet.thumbnails.medium.url;
    youtubeVideoThumbnail.alt = videos[i].snippet.title;

    const youtubeVideoContent = document.createElement("div");
    youtubeVideoContent.classList.add("youtube__video-content");

    const youtubeVideoTitle = document.createElement("h3");
    youtubeVideoTitle.classList.add(
      "youtube__video-title",
      "heading",
      "heading_quicksand"
    );
    const youtubeVideoTitleStrongElement = document.createElement("strong");
    const youtubeVideoTitleText = videos[i].snippet.title;
    youtubeVideoTitleStrongElement.append(youtubeVideoTitleText);
    youtubeVideoTitle.append(youtubeVideoTitleStrongElement);

    const youtubeVideoDataContainer = document.createElement("div");
    youtubeVideoDataContainer.classList.add("youtube__video-data-container");

    const youtubeVideoData = document.createElement("div");
    youtubeVideoData.classList.add("youtube__video-data");

    const youtubeVideoDate = document.createElement("p");
    youtubeVideoDate.classList.add("paragraph", "youtube__video-date");
    const youtubeVideoDateText = getTimeAgo(videos[i].snippet.publishedAt);
    youtubeVideoDate.append(youtubeVideoDateText);

    const youtubeLinkIconContainer = document.createElement("div");
    youtubeLinkIconContainer.classList.add("youtube__link-icon-container");

    const youtubeLinkIcon = document.createElement("img");
    youtubeLinkIcon.classList.add("youtube__link-icon");
    youtubeLinkIcon.src = "assets/icons/link_icon_blue.png";
    youtubeLinkIcon.alt = "link to video";

    youtubeLinkIconContainer.append(youtubeLinkIcon);

    youtubeVideoData.append(youtubeVideoDate);

    youtubeVideoDataContainer.append(
      youtubeVideoData,
      youtubeLinkIconContainer
    );

    youtubeVideoContent.append(youtubeVideoTitle, youtubeVideoDataContainer);

    youtubeVideoCard.append(youtubeVideoThumbnail);
    youtubeVideoCard.append(youtubeVideoContent);

    videoCards.unshift(youtubeVideoCard);
  }

  youtubeVideosCarrousel.append(...videoCards);

  console.log(videoCards);
  console.log(videos);
}

renderYoutubeVideoCards();
