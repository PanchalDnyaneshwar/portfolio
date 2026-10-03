"use client";

import dynamic from "next/dynamic";
import { StaticBackgroundFallback } from "./BackgroundScene";

export const BackgroundSceneClient = dynamic(
  () => import("./BackgroundScene").then((mod) => mod.BackgroundScene),
  {
    ssr: false,
    loading: () => <StaticBackgroundFallback />,
  }
);
