import { AppointmentDetailClient } from "./AppointmentDetailClient";

export default async function AppointmentDetailPage({ params }) {
  const resolved = await params;
  return <AppointmentDetailClient id={resolved.id} />;
}
