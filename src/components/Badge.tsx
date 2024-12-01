import {
  UnseenBadge,
  KnockProvider,
  KnockFeedProvider,
  NotificationFeedPopover,
} from "@knocklabs/react";
import { createRef } from "react";
import "./Badge.css";
const Badge = ({
  userId,
  feedId,
  apiKey,
}: {
  userId: string;
  feedId: string;
  apiKey: string;
}) => {
  return (
    <KnockProvider apiKey={apiKey} userId={userId}>
      <KnockFeedProvider feedId={feedId}>
        <div id="badge">
          <UnseenBadge badgeCountType="unread" />
          <NotificationFeedPopover
            onClose={() => {}}
            buttonRef={createRef<HTMLElement>()}
            isVisible={false}
          />
        </div>
      </KnockFeedProvider>
    </KnockProvider>
  );
};

export default Badge;
