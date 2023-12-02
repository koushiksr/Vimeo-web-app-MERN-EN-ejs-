import React, { useState } from "react";
import "./Home.css";
import tus from "tus-js-client";
import axios from "axios";

const REACT_APP_ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const headerPost = {
  Accept: "application/vnd.vimeo.*+json;version=3.4",
  Authorization: `bearer ${REACT_APP_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

function App() {
  const [description, setDescription] = useState("");
  const [percentage, setPercentage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [fileUploading, setFileUploading] = useState(false);
  const [upload, setUpload] = useState({});
  const [date, setDate] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
  const [dateError, setDateError] = useState("");
  const [uploadCompleted,setUploadCompleted]=useState(false)

  const handleChange = async (eventObject) => {
    const file = eventObject.target.files[0];
    if (
      !file ||
      !file.type.startsWith("video/") ||
      !["video/mp4", "video/webm"].includes(file.type.toLowerCase())
    ) {
      alert("Please select a valid video file (MP4 or WebM).");
      return;
    }

    const fileName = file.name;
    const fileSize = file.size.toString();
    const currentDate = new Date();
    const options = { timeZone: "Asia/Kolkata" };
    const formattedDate = currentDate.toLocaleString("en-US", options);
    // console.log(fileName, fileSize, file, formattedDate);
    try {
      const response = await axios({
        method: "post",
        url: `https://api.vimeo.com/me/videos`,
        headers: headerPost,
        data: {
          upload: {
            approach: "tus",
            size: fileSize,
          },
          name: fileName,
          // description: description,
          upload_date: formattedDate,
        },
      });
      setUpload(response)
      const upload = new tus.Upload(file, {
        endPoint: "https://api.vimeo.com/me/videos",
        uploadUrl: response.data.upload.upload_link,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        headers: {},
        onError: function (error) {
          console.error("Failed because: " + error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          setFileUploading(true);
          setPercentage(((bytesUploaded / bytesTotal) * 100).toFixed(2));
          console.log(
            bytesUploaded,
            bytesTotal,
            (bytesUploaded / bytesTotal) * 100 + "%"
          );
        },
        onSuccess: function () {
          setFilename(upload.file.name);
          // console.log("Download %s from %s", upload.file.name, upload.url);
          // console.log(upload, "upload");
          // setUpload(upload);
          setUploadCompleted(true)
          setVideoUrl(upload.url);
        },
      });

      upload.start();
    } catch (error) {
      console.error(
        "Error creating video:",
        error.response ? error.response.data : error.message,
        alert(error.response ? error.response.data.error : error.message)
      );
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");

  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setDateError("");

  };

  const handleDataSubmit = async () => {

    try {
      // const upload ={
        
      //     data: {
      //         uri: "/videos/889069191",
      //         name: "your_video_file.mp4",
      //         description: null,
      //         type: "video",
      //         link: "https://vimeo.com/889069191",
      //         player_embed_url: "https://player.vimeo.com/video/889069191?h=ebd4f52620",
      //         duration: 0,
      //         width: 400,
      //         language: null,
      //         height: 300,
      //         embed: {
      //             html: "<iframe src=\"https://player.vimeo.com/video/889069191?title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;airplay=0&amp;audio_tracks=0&amp;chapters=0&amp;chromecast=0&amp;closed_captions=0&amp;transcript=0&amp;player_id=0&amp;app_id=282526\" width=\"400\" height=\"300\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" title=\"your_video_file.mp4\"></iframe>",
      //             badges: {
      //                 hdr: false,
      //                 live: {
      //                     streaming: false,
      //                     archived: false
      //                 },
      //                 staff_pick: {
      //                     normal: false,
      //                     best_of_the_month: false,
      //                     best_of_the_year: false,
      //                     premiere: false
      //                 },
      //                 vod: false,
      //                 weekend_challenge: false
      //             },
      //             interactive: false,
      //             buttons: {
      //                 watchlater: true,
      //                 share: true,
      //                 embed: true,
      //                 hd: false,
      //                 fullscreen: true,
      //                 scaling: true,
      //                 like: true
      //             },
      //             logos: {
      //                 vimeo: true,
      //                 custom: {
      //                     active: false,
      //                     url: null,
      //                     link: null,
      //                     use_link: false,
      //                     sticky: false
      //                 }
      //             },
      //             play_button: {
      //                 position: "auto"
      //             },
      //             title: {
      //                 name: "user",
      //                 owner: "user",
      //                 portrait: "user"
      //             },
      //             end_screen: [],
      //             playbar: true,
      //             quality_selector: null,
      //             pip: true,
      //             autopip: true,
      //             volume: true,
      //             color: "00adef",
      //             colors: {
      //                 color_one: "000000",
      //                 color_two: "00adef",
      //                 color_three: "ffffff",
      //                 color_four: "000000"
      //             },
      //             event_schedule: true,
      //             has_cards: false,
      //             outro_type: "videos",
      //             show_timezone: false,
      //             cards: [],
      //             airplay: true,
      //             audio_tracks: true,
      //             chapters: true,
      //             chromecast: true,
      //             closed_captions: true,
      //             transcript: true,
      //             uri: null,
      //             email_capture_form: null,
      //             speed: true
      //         },
      //         created_time: "2023-11-28T12:43:00+00:00",
      //         modified_time: "2023-11-28T12:43:00+00:00",
      //         release_time: "2023-11-28T12:43:00+00:00",
      //         content_rating: [
      //             "unrated"
      //         ],
      //         content_rating_class: "unrated",
      //         rating_mod_locked: false,
      //         license: null,
      //         privacy: {
      //             view: "anybody",
      //             embed: "public",
      //             download: false,
      //             add: true,
      //             comments: "anybody"
      //         },
      //         pictures: {
      //             uri: null,
      //             active: false,
      //             type: "default",
      //             base_link: "https://i.vimeocdn.com/video/default",
      //             sizes: [
      //                 {
      //                     width: 100,
      //                     height: 75,
      //                     link: "https://i.vimeocdn.com/video/default_100x75",
      //                     link_with_play_button: "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_100x75&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
      //                 },
      //                 {
      //                     width: 200,
      //                     height: 150,
      //                     link: "https://i.vimeocdn.com/video/default_200x150",
      //                     link_with_play_button: "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_200x150&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
      //                 },
      //                 {
      //                     width: 295,
      //                     height: 166,
      //                     link: "https://i.vimeocdn.com/video/default_295x166",
      //                     link_with_play_button: "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_295x166&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
      //                 },
      //                 {
      //                     width: 640,
      //                     height: 360,
      //                     link: "https://i.vimeocdn.com/video/default_640x360",
      //                     link_with_play_button: "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_640x360&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
      //                 },
      //                 {
      //                     width: 960,
      //                     height: 540,
      //                     link: "https://i.vimeocdn.com/video/default_960x540",
      //                     link_with_play_button: "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_960x540&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
      //                 },
      //                 {
      //                     width: 1280,
      //                     height: 720,
      //                     link: "https://i.vimeocdn.com/video/default_1280x720",
      //                     link_with_play_button: "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_1280x720&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
      //                 },
      //                 {
      //                     width: 1920,
      //                     height: 1080,
      //                     link: "https://i.vimeocdn.com/video/default_1920x1080",
      //                     link_with_play_button: "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2Fdefault_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
      //                 }
      //             ],
      //             resource_key: null
      //         },
      //         tags: [],
      //         stats: {
      //             plays: 0
      //         },
      //         categories: [],
      //         metadata: {
      //             connections: {
      //                 comments: {
      //                     uri: "/videos/889069191/comments",
      //                     options: {
      //                         external: false
      //                     },
      //                     total: 0
      //                 },
      //                 credits: {
      //                     uri: "/videos/889069191/credits",
      //                     options: {
      //                         external: false
      //                     },
      //                     total: 0
      //                 },
      //                 likes: {
      //                     uri: "/videos/889069191/likes",
      //                     options: {
      //                         external: false
      //                     },
      //                     total: 0
      //                 },
      //                 pictures: {
      //                     uri: "/videos/889069191/pictures",
      //                     options: {
      //                         external: false
      //                     },
      //                     total: 0
      //                 },
      //                 texttracks: {
      //                     uri: "/videos/889069191/texttracks",
      //                     options: {
      //                         external: false
      //                     },
      //                     total: 0
      //                 },
      //                 related: {
      //                     uri: "/categories/569/videos",
      //                     options: {
      //                         parameters: {
      //                             filter: "related",
      //                             per_page: 10,
      //                             page: 1
      //                         }
      //                     },
      //                     total: 0
      //                 },
      //                 recommendations: {
      //                     uri: "/categories/569/videos",
      //                     options: {
      //                         parameters: {
      //                             filter: "recommendations",
      //                             per_page: 5,
      //                             page: 1
      //                         }
      //                     },
      //                     total: 0
      //                 },
      //                 volume: {
      //                     uri: "/videos/889069191/volume",
      //                     options: {
      //                         external: false
      //                     }
      //                 },
      //                 versions: {
      //                     uri: "/videos/889069191/versions",
      //                     options: {
      //                         external: false
      //                     }
      //                 },
      //                 available_albums: {
      //                     uri: "/videos/889069191/available_albums",
      //                     options: {
      //                         external: false
      //                     }
      //                 },
      //                 available_channels: {
      //                     uri: "/videos/889069191/available_channels",
      //                     options: {
      //                         external: false
      //                     }
      //                 }
      //             },
      //             interactions: {
      //                 watchlater: {
      //                     uri: "/users/123456/watchlater/889069191",
      //                     options: {
      //                         external: false,
      //                         added: false,
      //                         added_time: null
      //                     }
      //                 },
      //                 like: {
      //                     uri: "/users/123456/like/889069191",
      //                     options: {
      //                         external: false,
      //                         added: false,
      //                         added_time: null
      //                     }
      //                 },
      //                 report: {
      //                     uri: "/videos/889069191/report",
      //                     options: {
      //                         external: false,
      //                         added: false,
      //                         added_time: null
      //                     }
      //                 },
      //                 follow: {
      //                     uri: "/users/123456/follow/889069191",
      //                     options: {
      //                         external: false,
      //                         added: false,
      //                         added_time: null
      //                     }
      //                 }
      //             },
      //             is_vimeo_create: false,
      //             is_screen_record: false,
      //             live_event: null,
      //             is_live: false,
      //             is_vod: false,
      //             is_fullscreen: false,
      //             viewer_auth: null,
      //             is_trailer: false,
      //             has_custom_overlay: false,
      //             override_drm: null,
      //             has_custom_logo: false,
      //             has_outro: false,
      //             vod_type: null,
      //             app: null,
      //             has_tvod: false,
      //             premiered: null,
      //             is_playable: true,
      //             has_presets: false,
      //             type: "video",
      //             uri: "/videos/889069191"
      //         },
      //         app: {
      //             name: "api",
      //             version: "3.11.0"
      //         },
      //         status: 200
      //     },
      //     headers: {
      //         server: "nginx",
      //         content_type: "application/vnd.vimeo.video+json",
      //         vary: "Accept",
      //         status: "200 OK",
      //         request_id: "1ab2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
      //         date: "Mon, 28 Nov 2023 12:43:00 GMT",
      //         location: "https://api.vimeo.com/videos/889069191",
      //         exception_message: null,
      //         expires: "Mon, 28 Nov 2023 12:43:00 GMT",
      //         x_frame_options: "deny",
      //         cache_control: "no-store, no-cache, private",
      //         x_vimeo_request_id: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
      //         x_content_type_options: "nosniff",
      //         strict_transport_security: "max-age=15552000; includeSubDomains; preload",
      //         pragma: "no-cache",
      //         x_vimeo_version: "1.0.0",
      //         x_vimeo_error_message: null,
      //         x_vimeo_device_id: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
      //         allow: "GET, HEAD, PUT, PATCH, POST, DELETE",
      //         x_vimeo_round_trip_time: "36",
      //         x_vimeo_signature: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6"
          
      // }
      
      // }
  if (!description.trim()) {
      setDescriptionError("Description is required.");
      return;
    }

    if (!date) {
      setDateError("Date is required.");
      return;
    }
    if (!uploadCompleted) {
      setDateError("upload in not completed");
      return;
    }
    // console.log(upload,'response');
    // console.log(upload.data,'response.data');
    // console.log(upload.data.uri,'response.data.uri');
      if (Object.keys(upload).length > 0 &&date&&description) {
        // console.log(upload, "upload2");
        const parts = upload.data.uri.split("/");
        const videoID = parts[2];
        console.log(videoID,'video id');

        const response = await axios.post("/upload", { videoID, description,date });
      if (response.status === 201) {
        console.log("Data posted successfully", response.data.newData);
        alert('data posted successfully')
      } else {
        console.error("Failed to post data");
        alert('Failed to post data')

      }
    }else{
        console.log('video not uploaded and check all the feilds');
        alert('video not uploaded check all the feilds')
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="sub-container">
        <input
          className="fileInput"
          onChange={handleChange}
          type="file"
          accept="video/*"
        />
        {fileUploading && (
          <div className="progressBarContainer">
            <div className="progressBar" style={{ width: `${percentage}%` }}>
              {`${percentage}%`}
            </div>
          </div>
        )}
        <textarea
          className="descriptionInput"
          id="textbox"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter Description"
        />
        {descriptionError && <p className="error" style={{ color: 'red' }}>{descriptionError}</p>}

        <label className="date-div">
          Date:{" "}
          <input
            type="date"
            className="date"
            value={date}
            onChange={handleDateChange}
          />
        </label>
        {dateError && <p  className="error" style={{ color: 'red' }}>{dateError}</p>}

        <h4 className="result">File Name: {filename}</h4>
        <h4 className="result">Video URL: {videoUrl}</h4>
        <button onClick={handleDataSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;