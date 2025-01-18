import React, { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import { pauseImg, playImg, replayImg } from "../utils"

const VideoCarousel = () => {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })

    const [loadedData, setloadedData] = useState([])

    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause()
            } else {
                startPlay && videoRef.current[videoId].play()
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    useEffect(() => {
        const currentProgress = 0
        let span = videoSpanRef.current

        if (span[videoId]) {
            //animate the progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {},
                onComplete: () => {},
            })
        }
    }, [videoId, startPlay])

    const handleProcess = (type, i) => {
        switch (type){
            case 'video-end':
                setVideo((pre) => ({...pre, isEnd: true, videoId: i +1 }))
                break;
            case "video-last":
                setVideo((pre) => ({...pre, isLastVideo: true}))
                break
            case "video-reset":
                setVideo((pre) => ({...pre, isLastVideo: false, videoId: 0}))
                break

            case "play":
                setVideo((pre) => ({...pre, isPlaying: !pre.isPlaying}))
                break
            default:
                return video;
        }
    }

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider">
                        <div className="video-carousel_container">
                            <div className="flex-center h-full w-full overflow-hidden rounded-3xl bg-black">
                                <video
                                    id="video"
                                    playsInline={true}
                                    preload="auto"
                                    muted
                                    ref={(el) => (videoRef.current[i] = el)}
                                    onPlay={() => {
                                        setVideo((prevVideo) => ({
                                            ...prevVideo,
                                            isPlaying: true,
                                        }))
                                    }}
                                >
                                    <source src={list.video} type="video/mp4"></source>
                                </video>
                            </div>

                            <div className="absolute left-[5%] top-12 z-10">
                                {list.textLists.map((text) => (
                                    <p key={text} className="text-xl font-medium md:text-2xl">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex-center relative mt-10">
                <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
                    {videoRef.current.map((_, i) => (
                        <span
                            key={i}
                            ref={(el) => (videoDivRef.current[i] = el)}
                            className="rouded-full relative mx-2 h-3 w-3 cursor-pointer bg-gray-200"
                        >
                            <span
                                className="rouded-full absolute h-full w-full"
                                ref={(el) => (videoSpanRef.current[i] = el)}
                            />
                        </span>
                    ))}
                </div>

                <button className="control-btn">
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                        onClick={
                            isLastVideo
                                ? () => handleProcess("video-reset")
                                : !isPlaying
                                  ? () => handleProcess("play")
                                  : () => handleProcess("pause")
                        }
                    ></img>
                </button>
            </div>
        </>
    )
}

export default VideoCarousel
