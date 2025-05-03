"use client";
import { Button } from "@/components/ui/button";
import { useMutateProcessor } from "@/hooks/use-tanstack-query";
import {
  Category,
  TCreateOrUpdateDesignSchema,
  TDesignSchema,
} from "@/schema/design";
import { Crown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const Banner = () => {

  const { mutate, isPending} = useMutateProcessor<
    TCreateOrUpdateDesignSchema,
    TDesignSchema
  >({
    url: `/v1/design`,
    method: "POST",
    key: ["designs"],
  });

  const router = useRouter();

  const handleCreateNewDesign = () => {
    const initialDesignData = {
      name: "Untitled design",
      canvasData: null,
      width: 825,
      height: 465,
      category: Category.YOUTUBE_THUMBNAIL,
    };


    mutate(initialDesignData, {
      // onSettled(data, error, variables, context) {},

      onSuccess(data, variables, context) {
        router.push(`/editor/${data?.id}`);
        toast("Design has been created", {
          style: {},
        });
      },

      onError(error, variables, context) {
        console.error("CREATE DESIGN ERROR: ", error);
        toast("Something went wrong", {
          style: {
            background:'red',
            color: 'white',
          },
        });

      },
    });
  };
  return (
    <div className="flex flex-col items-center rounded-xl overflow-hidden bg-gradient-to-r from-[#00c4cc] via-[#8b3dff] to-[#5533ff] text-white p-4 sm:p-6  md:p-8 text-center">
      <div className="flex flex-col sm:flex-row justify-center items-center mb-2 sm:mb-4">
        <Crown className="size-8 sm:size-10 md:size-12 text-yellow-400" />
        <span className="sm:ml-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
          {" "}
          Create Innovative Designs
        </span>
      </div>
      <h2 className=" text-sm sm:text-based md:text-lg font-bold mb-4 sm:mb-6 max-w-2xl mx-auto">
        Design eye-catching thumbnails that get more views
      </h2>

      <Button
        onClick={handleCreateNewDesign}
        className="cursor-pointer text-[#8b3dff] bg-white w-fit hover:bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-2.5"
      >
          {
            isPending && <Loader2 className="animate-spin" />
          }
           Start Designing
      </Button>
    </div>
  );
};
