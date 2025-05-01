"use client";
import React, { useEffect, useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Canvas } from "./canvas";
import { useParams, useRouter } from "next/navigation";
import { useEditorStore } from "@/hooks/use-editor-store";
import { useQueryProcessor } from "@/hooks/use-tanstack-query";

type editorParams = {
  slug: string;
};
export const Editor = () => {
  const params = useParams<editorParams>();
  const router = useRouter();
  const designId = params?.slug;
  // const [loadAttempted, setLoadAttempted] = useState(false)

  const { canvas, setDesignId, resetStore } = useEditorStore();

  const {isLoading, isError, refetch} = useQueryProcessor({
    url: '',
    key: ['editor'],
  })

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

  useEffect(() => {
    refetch()
  }, [designId])

  useEffect(() => {
    if(isLoading && !canvas && designId) {
      const timer = setTimeout(() => {
        if(isLoading) {

        }
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [canvas, designId, isLoading])

  useEffect(() => {
    if(canvas) {
      console.log('canvas is now available in editor')
    }
  }, [canvas])

  // load the design

  return (
    <>
      <Canvas />
    </>
  );
};
