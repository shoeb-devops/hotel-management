import RoomDetailClient from "@/components/website/RoomDetailClient";

export function generateStaticParams() {
  return [
    { id: "standard-room" },
    { id: "deluxe-king-suite" },
    { id: "executive-suite" },
    { id: "presidential-suite" },
    { id: "family-suite" },
    { id: "honeymoon-villa" },
  ];
}

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  return <RoomDetailClient slug={params.id} />;
}
