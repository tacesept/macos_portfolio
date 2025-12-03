import type { HTMLAttributes } from "react";

const Sidebar = (props: HTMLAttributes<HTMLDivElement>) => {
  const { children, ...rest } = props;
  return (
    <div
      className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col p-5 space-y-3 overflow-y-scroll"
      {...rest}
    >
      {children}
    </div>
  );
};
export default Sidebar;
