import {
  KnockProvider,
  KnockFeedProvider,
  NotificationFeedPopover,
  NotificationIconButton,
  type NotificationFeedHeaderProps,
  FilterStatus,
  NotificationCell,
} from "@knocklabs/react";
import "./BellNotification.css";
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
            renderItem={({ item, ...props }) => (
              <div className="dark:bg-gray-600 dark:text-white!important">
                <NotificationCell {...props} item={item} />
              </div>
            )}
            renderHeader={(props: NotificationFeedHeaderProps) => (
              <div className="dark:text-white text-gray-500 flex flex-col sm:flex-row items-center justify-between px-4 py-2 dark:bg-gray-700 space-y-2 sm:space-y-0">
                <div>
                  <select
                    onChange={(e) => {
                      const filter = e.target.value as FilterStatus;

                      props.setFilterStatus(filter);
                    }}
                    className="bg-white dark:bg-gray-800 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1"
                  >
                    <option value="all">Todas</option>
                    <option value="unread">No leídas</option>
                    <option value="read">Leídas</option>
                  </select>
                </div>
                <div>
                  {/* TODO: implement it */}
                  <button
                    onClick={(e) => props.onMarkAllAsReadClick?.(e, [])}
                    className="text-blue-500"
                  >
                    Marcar todas como leídas
                  </button>
                </div>
              </div>
            )}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  );
};
export default BellNotification;
