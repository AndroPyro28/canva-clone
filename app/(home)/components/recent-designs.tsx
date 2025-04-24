"use client"
import { useQueryProcessor } from "@/hooks/use-tanstack-query";
import { TDesignSchema } from "@/schema/design";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function RecentDesigns() {

    const {data, isLoading, isError} = useQueryProcessor<TDesignSchema[]>({
      url:`/v1/design`,
      key: ['designs'],
    })

    const router = useRouter()
    const displayDesign = () => {
      if(isLoading) {
        return <Loader2 className="animate-spin" />
      }

      else if(isError) {
        return <p>Fetching designs error</p>
      }

      else if(data && data.length <= 0) {
        return <p>Create your first design</p>
      }
      
      return data?.map((design, index) => (
          <div key={design?.id || index} className="group cursor-pointer" onClick={() => router.push(`/editor/${design.id}`)}>
            <div className="aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden transition-shadow group-hover:shadow-md" />
            <p className="font-bold text-sm truncate">{design?.name}</p>
          </div>
        ))

    } 

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 ">Recent Designs</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {displayDesign()}
      </div>
    </div>
  );
}
