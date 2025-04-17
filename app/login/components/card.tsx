'use client'
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import React from "react";
import authClient from "@/lib/auth-client"; //

export default function Card() {

  const signIn = async ({provider, callbackURL}: {provider:("google" | "github"); callbackURL:string}) => {
    await authClient.signIn.social({
      provider,
      callbackURL, 
      disableRedirect: true,
  });
  }
 
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4 transition-all duration-300">
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800">Jump back in!</h3>
          <p className="mt-3  text-gray-500">Sign In to continue</p>
        </div>
        <Button
          variant={"outline"}
          className={`w-full flex items-center justify-center gap-3 py-6 text-gray-700 border-gray-300 cursor-pointer hover:border-[#8b3dff] hover:text-[#b3dff] transition-all duration-300 group transform hover:scale-[1.01] active:scale-[0.99]`}
          onClick={() => signIn({provider:'google', callbackURL: '/'})}
        >
          <div className="bg-white rounded-full p-1 flex items-center justify-center group-hover:bg-[#8b3dff]/10 transition-colors">
            <LogIn className="w-5 h-5 group-hover:text-[#8b3dff] transition-colors duration-300" />
          </div>
          <span className="font-medium">Continue with google</span>
        </Button>
      </div>
    </div>
  );
}
