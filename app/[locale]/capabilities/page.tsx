import type { Metadata } from "next";
import { CapabilityCard } from "@/components/capabilities/capability-card";
import { CertGrid } from "@/components/capabilities/cert-grid";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { FlaskConical, Ruler, Shield, Truck } from "lucide-react";
import { alternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternates(locale, '/capabilities') };
}

export default function CapabilitiesPage() {
  return (
    <Section>
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Our Capabilities</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            State-of-the-art peptide synthesis facilities with capacity from milligrams to metric tons
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <CapabilityCard
            icon={<FlaskConical className="w-6 h-6" />}
            title="Synthesis Platforms"
            description="Advanced solid-phase and liquid-phase peptide synthesis for various complexity levels"
            metrics={[
              { label: "Daily Capacity", value: "50+" },
              { label: "Sequence Length", value: "Up to 100AA" },
              { label: "Purity Levels", value: "Up to 99.9%" },
            ]}
          />
          <CapabilityCard
            icon={<Ruler className="w-6 h-6" />}
            title="Scale-up Capability"
            description="Seamless transition from R&D to pilot to commercial production"
            metrics={[
              { label: "R&D Scale", value: "mg-g" },
              { label: "Pilot Scale", value: "g-kg" },
              { label: "Commercial", value: "kg-ton" },
            ]}
          />
          <CapabilityCard
            icon={<Shield className="w-6 h-6" />}
            title="Quality Assurance"
            description="Rigorous QC/QA protocols ensuring consistency and compliance"
            metrics={[
              { label: "QC Tests", value: "15+" },
              { label: "Batch Release", value: "< 5 days" },
              { label: "Rejection Rate", value: "< 0.1%" },
            ]}
          />
          <CapabilityCard
            icon={<Truck className="w-6 h-6" />}
            title="Global Logistics"
            description="Reliable cold-chain shipping to destinations worldwide"
            metrics={[
              { label: "Shipping Destinations", value: "60+" },
              { label: "Delivery Success", value: "99.5%" },
              { label: "Cold Chain", value: "-20°C / 4°C" },
            ]}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Certifications</h2>
          <CertGrid />
        </div>
      </Container>
    </Section>
  );
}
