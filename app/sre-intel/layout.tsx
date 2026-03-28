import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SRE Intel | Neeraja Khanapure",
  description:
    "Live production SRE knowledge assistant. Ask real questions about Kubernetes, Terraform, Kafka, observability, and cloud reliability.",
};

export default function SreIntelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
