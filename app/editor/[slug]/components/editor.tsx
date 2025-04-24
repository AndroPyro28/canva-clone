"use client";
import React, { useEffect, useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Canvas } from "./canvas";
import { useParams, useRouter } from "next/navigation";
import { useEditorStore } from "@/hooks/use-editor-store";

type editorParams = {
  slug: string;
};
export const Editor = () => {
  const params = useParams<editorParams>();
  const router = useRouter();
  const designId = params?.slug;
  // const [loadAttempted, setLoadAttempted] = useState(false)

  const { canvas, setDesignId, resetStore } = useEditorStore();

  useEffect(() => {
    // first reset the editor store
    resetStore();

    // set the design ID
    if (designId) {
      setDesignId(designId);
    }

    return () => {
      // reset store upon leaving component
      resetStore();
    };
  }, []);

  return (
    <>
      <Canvas />
    </>
  );
};
