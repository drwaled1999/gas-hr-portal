export type NotificationRecord = { id: number; title: string; message: string; unread: boolean; time: string; };
const notificationStore: NotificationRecord[] = [
  { id: 1, title: 'Leave balance updated', message: 'Ahmed Al Qahtani was updated by Sara Khan (HR Admin).', unread: true, time: '2 mins ago' },
  { id: 2, title: 'New employee added', message: 'A new employee record was created in Operations.', unread: false, time: 'Today' }
];
export const notificationsService = {
  getAll: () => notificationStore,
  markRead(id: number) {
    const notification = notificationStore.find((item) => item.id === id);
    if (!notification) return null;
    notification.unread = false;
    return notification;
  }
};
