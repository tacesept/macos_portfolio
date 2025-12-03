import useWindowStore, { type WindowKey } from "#store/window";
import useWindowSizeStore from "#store/windowSize";

const WindowControls = ({ target }: { target: WindowKey }) => {
  const { closeWindow } = useWindowStore();
  const { togglewindowSize } = useWindowSizeStore();
  return (
    <div className="flex gap-2">
      <span
        className="size-5 rounded-full bg-[#ff6157] cursor-pointer"
        onClick={() => closeWindow(target)}
      />
      <span className="size-5 rounded-full bg-[#ffc030]" />
      <span
        className="size-5 rounded-full bg-[#2acb42] cursor-pointer"
        onClick={togglewindowSize}
      />
    </div>
  );
};
export default WindowControls;
