import type {
  CardYoutubeProps,
  CardYoutubeNotificationProps,
} from "./card-youtube-notification.types";

import YouTube, { YouTubeEvent } from "react-youtube";

import classNames from "classnames";
import { Button } from "@/components";
import { ToggleButton } from "@/components/adapters/ToggleButton";
import { useState } from "react";
import { Card, CardElevations } from "@andrevantunes/andrevds";
import { DismissedWrapper } from "../DismissedWrapper";

const CardYoutubeNotification = ({
  id,
  closeable,
  closed,
  reopenAfterDays,
  closingMessage,
  ...props
}: CardYoutubeNotificationProps) => {
  const [isClosed, setIsClosed] = useState(closed);

  if (!props.videoId || closed) return null;

  const isCloseEnabled = Boolean(id && closeable);

  return (
    <DismissedWrapper
      id={id}
      closeable={closeable}
      closed={isClosed}
      reopenAfterDays={reopenAfterDays}
      closingMessage={closingMessage}
    >
      <CardYoutube {...props} isCloseEnabled={isCloseEnabled} onClose={() => setIsClosed(true)} />
    </DismissedWrapper>
  );
};

const CardYoutube = ({
  children,
  className,
  style,
  onClose,
  isCloseEnabled,
  closeButton,
  videoId,
  ...props
}: CardYoutubeProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [video, setVideo] = useState<YouTubeEvent["target"]>(null);

  const videoThumbnail = `url("https://img.youtube.com/vi/${videoId}/maxresdefault.jpg")`;

  const handleClick = () => {
    setIsPlaying(true);
    if (video) video.playVideo();
  };

  const handleReady = (event: YouTubeEvent) => setVideo(event.target);

  const computedStyle: any = {
    ...style,
    "--thumbnail": videoThumbnail,
  };

  const cn = classNames("card-youtube-notification", className, {
    "card-youtube-notification--is-playing": isPlaying,
    "card-youtube-notification--is-paused": isPaused,
  });

  const shouldClose = isCloseEnabled && (!isPlaying || isPaused);

  return (
    <Card elevation={CardElevations.Low} className={cn} {...props} style={computedStyle}>
      <div className="card-youtube-notification__thumbnail">
        <ToggleButton
          className="card-youtube-notification__play-button"
          iconName="play"
          onClick={handleClick}
        />
      </div>
      {shouldClose && (
        <Button
          variant="text"
          size="sm"
          onClick={onClose}
          className="card-youtube-notification__close-button"
          label="Fechar"
          {...closeButton}
        />
      )}
      <YouTube
        ref={video}
        className="card-youtube-notification__content"
        videoId={videoId}
        onReady={handleReady}
        onPause={() => setIsPaused(true)}
        onPlay={() => setIsPaused(false)}
        onEnd={() => setIsPlaying(false)}
        opts={{ playerVars: { rel: 0, showinfo: 0, modestbranding: 0 } }}
      />
    </Card>
  );
};

export default CardYoutubeNotification;
