import {
  ContactWindow,
  FinderWindow,
  ImageWindow,
  PhotosWindow,
  ResumeWindow,
  SafariWindow,
  TerminalWindow,
  TextWindow,
} from "#windows";

const WindowTabs = () => {
  return (  
    <>
      <FinderWindow />
      <TerminalWindow />
      <SafariWindow />
      <ResumeWindow />
      <TextWindow />
      <ImageWindow />
      <ContactWindow />
      <PhotosWindow />
    </>
  );
};
export default WindowTabs;
