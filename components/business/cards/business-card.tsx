"use client";
import React from "react";
import { BusinessState } from "@/utils/types/business";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Globe, Clock, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useBusiness } from "@/context/business";
import DescriptionModal from "@/components/modals/description-modal";

export default function BusinessCard({
  business,
}: {
  business: BusinessState;
}) {
  const {
    openDescriptionModal,
    setOpenDescriptionModal,
    isDashboardPage,
    togglePublished,
    isEditPage,
    loading,
  } = useBusiness();

  return (
    <Card className="w-full max-w-2xl mx-auto" style={{ height: "354px" }}>
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <div className="w-16 h-16 relative overflow-hidden rounded-md">
          {business?.logo ? (
            <Image
              src={business.logo}
              alt={business.name}
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-xs">No Logo</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <CardTitle className="text-lg line-clamp-1">
            {business.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {business?.category || "Category"}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-sm mb-4 line-clamp-3">
          {business?.description && (
            <div dangerouslySetInnerHTML={{ __html: business.description }} />
          )}
        </div>

        <div className="space-y-2">
          <InfoItem icon={MapPin} text={business?.address || "Address"} />
          <InfoItem icon={Phone} text={business?.phone || "Phone"} />
          <InfoItem icon={Mail} text={business?.email || "Email"} />
          <InfoItem icon={Globe} text={business?.website || "Website"} />
          <InfoItem icon={Clock} text={business?.hours || "Hours"} />
        </div>
      </CardContent>

      <DescriptionModal />
    </Card>
  );
}

function InfoItem({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center text-sm">
      <Icon className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
      <span className="line-clamp-1">{text}</span>
    </div>
  );
}
