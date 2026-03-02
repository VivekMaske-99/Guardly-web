import React from "react";

const Scan = () => {
  // In development we have two hosting options:
  // 1. When the backend is running on 3001 we can load the scanner page
  //    directly from there so that its API calls go straight to the same
  //    origin and avoid proxy issues.
  // 2. Otherwise fall back to the static copy served by Vite at /doc-scan.
  // Always load the scanner UI from our own host under /doc-scan.
  // In development this will pick up the static copy at public/doc-scan or
  // the standalone backend if you're running it separately, and in
  // production the root Express server will mount the scanner at that path.
  const iframeSrc = "/doc-scan/";

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={iframeSrc}
        title="Document Scanner"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
};

export default Scan;
