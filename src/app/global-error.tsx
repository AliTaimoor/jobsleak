"use client";

import Error from "next/error";
import React from "react";
export default function GlobalError() {
  return (
    <html>
      <body>
        <Error statusCode={500} />
      </body>
    </html>
  );
}
