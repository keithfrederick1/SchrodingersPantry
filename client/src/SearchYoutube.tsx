import React from 'react';
import axios from 'axios';

const finalURL = 'https://www.googleapis.com/youtube/v3/';
const YOUTUBE_KEY = 'AIzaSyASkBskNLM6_d51ncg_q5MmkzXfV9XJR3c';

interface SearchProps {
  meal: string
}

//take meal from props passed from a clicked recipe
export default function SearchYoutube ({ meal }: SearchProps) {
  const [video, setVideo] = React.useState<object>({});

  //search youtube api for that meal, displaying top result
  axios.get(`${finalURL}search?part=snippet&q=best way to cook ${meal}&key=${YOUTUBE_KEY}&maxResults=1`)
    .then((data): any => {
      setVideo(data);
    })
    .catch((err) => {
    console.error(`could not fetch video because: ${err}`);
    });
  return (
    <div>
      {/* USE VIDEO THAT WAS ASSIGNED IN STATE*/}
     {/* <iframe width="120" height="90" src=`https://www.youtube.com/embed/${video.id.videoId}` title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>*/}
    </div>
  )
}


