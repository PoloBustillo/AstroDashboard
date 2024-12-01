import {
  KnockProvider,
  KnockFeedProvider,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";

import "@knocklabs/react/dist/index.css";

import type { User } from "@auth/core/types";
import { useState, useRef } from "react";

const BellNotification = ({
  user,
  feedId,
  apiKey,
}: {
  user: User;
  feedId: string;
  apiKey: string;
}) => {
  const notifButtonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setisVisible] = useState(false);

  return (
    <KnockProvider apiKey={apiKey} userId={user.idUser}>
      <KnockFeedProvider feedId={feedId}>
        <>
          <div className="text-black dark:text-white">
            <NotificationIconButton
              badgeCountType="unread"
              ref={notifButtonRef}
              onClick={(e) => setisVisible(!isVisible)}
            />
          </div>

          <NotificationFeedPopover
            EmptyComponent={
              <div className="dark:text-white text-gray-500 flex items-center justify-center h-full dark:bg-gray-700">
                <div className="text-center">
                  <p>No hay notificaciones</p>
                  <p className="text-sm text-gray-400">
                    Revisa más tarde para nuevas notificaciones
                  </p>
                </div>
              </div>
            }
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setisVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  );
};
export default BellNotification;
