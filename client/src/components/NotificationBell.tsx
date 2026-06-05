import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, BellRing, Check, CheckCheck, MessageSquare, ArrowUp, MessageCircle, Info, Zap } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TYPE_ICONS = {
  reply: MessageSquare,
  upvote: ArrowUp,
  chat: MessageCircle,
  mention: Zap,
  system: Info,
};

const TYPE_COLORS = {
  reply: "text-blue-400",
  upvote: "text-green-400",
  chat: "text-purple-400",
  mention: "text-yellow-400",
  system: "text-muted-foreground",
};

export default function NotificationBell() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const { data: unreadCount = 0, refetch: refetchCount } = trpc.notifications.getUnreadCount.useQuery(
    undefined,
    { enabled: isAuthenticated, refetchInterval: 10000 }
  );

  const { data: notifications = [], refetch: refetchAll } = trpc.notifications.getAll.useQuery(
    undefined,
    { enabled: isAuthenticated, refetchInterval: isAuthenticated ? 10000 : false }
  );

  const markRead = trpc.notifications.markRead.useMutation({
    onSuccess: () => { refetchCount(); refetchAll(); },
  });

  const markAllRead = trpc.notifications.markAllRead.useMutation({
    onSuccess: () => { refetchCount(); refetchAll(); },
  });

  if (!isAuthenticated) return null;

  const hasUnread = unreadCount > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative p-2">
          {hasUnread ? (
            <BellRing className="w-5 h-5 text-primary animate-[wiggle_0.5s_ease-in-out]" />
          ) : (
            <Bell className="w-5 h-5 text-muted-foreground" />
          )}
          {hasUnread && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center px-1 leading-none">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[360px] p-0 glass-card border-border/50 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm">Notifications</span>
            {hasUnread && (
              <span className="px-1.5 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold">
                {unreadCount} new
              </span>
            )}
          </div>
          {hasUnread && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground h-7 px-2 gap-1"
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending}
            >
              <CheckCheck className="w-3 h-3" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Notification list */}
        <ScrollArea className="max-h-[420px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Bell className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">You're all caught up</p>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {notifications.map((notif) => {
                const Icon = TYPE_ICONS[notif.type] || Info;
                const iconColor = TYPE_COLORS[notif.type] || "text-muted-foreground";
                return (
                  <div
                    key={notif.id}
                    className={cn(
                      "flex gap-3 px-4 py-3 hover:bg-accent/30 transition-colors cursor-pointer group",
                      !notif.isRead && "bg-primary/5"
                    )}
                    onClick={() => {
                      if (!notif.isRead) markRead.mutate({ id: notif.id });
                      if (notif.link) setOpen(false);
                    }}
                  >
                    {/* Icon */}
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                      !notif.isRead ? "bg-primary/15" : "bg-secondary/50"
                    )}>
                      <Icon className={cn("w-4 h-4", iconColor)} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn(
                          "text-sm leading-snug",
                          !notif.isRead ? "font-medium text-foreground" : "text-muted-foreground"
                        )}>
                          {notif.title}
                        </p>
                        {!notif.isRead && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">
                        {new Date(notif.createdAt).toLocaleString([], {
                          month: "short", day: "numeric",
                          hour: "2-digit", minute: "2-digit"
                        })}
                      </p>
                    </div>

                    {/* Mark read button on hover */}
                    {!notif.isRead && (
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-primary/10"
                        onClick={(e) => { e.stopPropagation(); markRead.mutate({ id: notif.id }); }}
                        title="Mark as read"
                      >
                        <Check className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="px-4 py-2.5 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              Showing last {notifications.length} notifications
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
