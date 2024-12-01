import {
  KnockProvider,
  KnockFeedProvider,
  NotificationFeed,
  NotificationCell,
} from "@knocklabs/react";

import "@knocklabs/react/dist/index.css";
import { useEffect, useState, useRef } from "react";
import type {
  ColorMode,
  FilterStatus,
  NotificationFeedHeaderProps,
} from "@knocklabs/react";

const NotificationInbox = ({
  userId,
  feedId,
  apiKey,
}: {
  userId: string;
  feedId: string;
  apiKey: string;
}) => {
  const [colorTheme, setcolorTheme] = useState<ColorMode>("light");

  useEffect(() => {
    const colorMode = localStorage.getItem("color-theme") || "light";

    setcolorTheme(colorMode as ColorMode);
  }, []);

  return (
    <KnockProvider apiKey={apiKey} userId={userId}>
      <KnockFeedProvider colorMode={colorTheme} feedId={feedId}>
        <>
          <NotificationFeed
            renderItem={({ item, ...props }) => (
              <NotificationCell {...props} item={item} />
            )}
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
            renderHeader={(props: NotificationFeedHeaderProps) => (
              <div className="dark:text-white text-gray-500 flex flex-col sm:flex-row items-center justify-between px-4 py-2 dark:bg-gray-700 space-y-2 sm:space-y-0">
                <div>Notificaciones</div>

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
                  <button
                    onClick={(e) =>
                      props.onMarkAllAsReadClick &&
                      props.onMarkAllAsReadClick(e, [])
                    }
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
export default NotificationInbox;
