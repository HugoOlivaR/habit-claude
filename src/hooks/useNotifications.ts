import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";

export async function checkNotificationPermission(): Promise<boolean> {
  let permissionGranted = await isPermissionGranted();

  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === "granted";
  }

  return permissionGranted;
}

export async function sendTaskNotification(title: string, body: string): Promise<void> {
  const hasPermission = await checkNotificationPermission();

  if (hasPermission) {
    sendNotification({
      title,
      body,
    });
  }
}

export async function sendReminderNotification(categoryName: string, count: number): Promise<void> {
  await sendTaskNotification(
    `${categoryName} Tasks`,
    `You have ${count} task${count > 1 ? "s" : ""} to complete.`
  );
}
