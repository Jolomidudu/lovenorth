"use client";

import { Profile } from "@/lib/types";
import { Heart, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { DEFAULT_USER_PROFILE } from "@/lib/storage";

interface MatchModalProps {
  profile: Profile;
  onClose: () => void;
}

export default function MatchModal({ profile, onClose }: MatchModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm bg-gradient-to-b from-[#1a1a1f] to-[#0f0f12] rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-in">
        {/* Header */}
        <div className="pt-8 pb-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#ff4458] to-pink-500 mb-4 shadow-lg shadow-[#ff4458]/40">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ff4458] to-pink-400 bg-clip-text text-transparent">
            It&apos;s a Match!
          </h2>
          <p className="mt-2 text-white/60 text-sm">
            You and {profile.name} liked each other
          </p>
        </div>

        {/* Photos */}
        <div className="flex justify-center items-center gap-[-12px] px-6 py-4">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#ff4458] shadow-lg -mr-4 z-10">
            <img
              src={DEFAULT_USER_PROFILE.photos[0]}
              alt="You"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#ff4458] shadow-lg">
            <img
              src={profile.photos[0]}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-8 pt-4 space-y-3">
          <Link
            href="/matches"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl bg-gradient-to-r from-[#ff4458] to-[#ff2d4a] text-white font-semibold btn-press"
          >
            <MessageCircle className="w-5 h-5" />
            Send a Message
          </Link>
          <button
            onClick={onClose}
            className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 text-white/80 font-medium hover:bg-white/10 transition btn-press"
          >
            Keep Swiping
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
