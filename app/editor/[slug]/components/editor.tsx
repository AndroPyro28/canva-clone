"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Canvas } from "./canvas";
import {type Canvas as TCanvas} from "fabric"
import { useParams, useRouter } from "next/navigation";
import { useEditorStore } from "@/hooks/use-editor-store";
import { useQueryProcessor } from "@/hooks/use-tanstack-query";
import { TDesignSchema } from "@/schema/design";

type editorParams = {
  slug: string;
};
export const Editor = () => {
  const params = useParams<editorParams>();
  const router = useRouter();
  const designId = params?.slug;
  const [loadAttempted, setLoadAttempted] = useState(false);

  const { canvas, setDesignId, resetStore, setName } = useEditorStore();

  const { isLoading, isError, refetch, data } =
    useQueryProcessor<TDesignSchema>({
      url: `/v1/design/${designId}`,
      key: ["editor"],
      options: {
        enabled: false,
      },
    });

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
    refetch();
    setLoadAttempted(false);
  }, [designId]);

  useEffect(() => {
    if (isLoading && !canvas && designId) {
      const timer = setTimeout(() => {
        if (isLoading) {
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [canvas, designId, isLoading]);

  useEffect(() => {
    if (canvas) {
      console.log("canvas is now available in editor");
    }
  }, [canvas]);

  // load the design

  const loadDesign = useCallback(async () => {
    if (!canvas || !designId || loadAttempted) return;

    try {
      setLoadAttempted(true);
      const response = await refetch();
      console.log("design data", response.data);

      if (response.isSuccess && response.data) {
        // set the design ID just incase after getting the data
        setDesignId(designId);
        const design = response.data;
        setName(design.name)
        try {
          if (!design.canvasData) {
            console.log("no canvas data");
            canvas.clear();
            canvas.setWidth(design.width);
            canvas.setHeight(design.height);
            canvas.backgroundColor = "white";
            canvas.renderAll();
            return;
          } 

          // if there is a canvas data
          // check if there is canvas with and height
          if(design.width && design.height) {
            canvas.setDimensions({
              height: design.height,
              width: design.width
            })
          }
          const canvasData:any = typeof design.canvasData === "string" ?
          JSON.parse(design.canvasData) : design.canvasData
          const hasObjects = !!(canvasData._objects && canvas._objects?.length > 0)

          if(canvasData.background) {
            canvas.backgroundColor = canvasData.background
          } else {
            canvas.backgroundColor = "#ffffff"
          }

          if(!hasObjects) {
            canvas.renderAll()
            return true
          }

          canvas.loadFromJSON(design.canvasData).then(canvas => canvas.requestRenderAll())

        } catch (error) {
          console.error("error loading canvas data");
        } 
      }
    } catch (error) {
      console.error("failed to load design");
    }
  }, [canvas, designId, loadAttempted, setDesignId]);

  useEffect(() => {
    if (designId && canvas && !loadAttempted) {
      loadDesign();
    } else if (!designId) {
      router.replace(`/`);
    }
  }, [canvas, designId, loadDesign, loadAttempted, router]);

  return (
    <>
      <Canvas />
    </>
  );
};
