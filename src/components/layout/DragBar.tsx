export function DragBar() {
  return (
    <div
      data-tauri-drag-region
      className="fixed top-0 left-0 right-0 h-7 z-50 cursor-grab active:cursor-grabbing"
    />
  );
}
