import { Card, CardContent } from "@/components/ui/card";

const certifications = [
  { name: "GMP", fullName: "Good Manufacturing Practice", issuedBy: "FDA" },
  { name: "ISO 9001", fullName: "Quality Management System", issuedBy: "Bureau Veritas" },
  { name: "ISO 14001", fullName: "Environmental Management", issuedBy: "Bureau Veritas" },
  { name: "FDA", fullName: "US Food and Drug Administration", issuedBy: "FDA" },
];

export function CertGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {certifications.map((cert) => (
        <Card key={cert.name} className="text-center">
          <CardContent className="py-6">
            <div className="w-16 h-16 mx-auto mb-3 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-primary-600">{cert.name}</span>
            </div>
            <p className="font-medium text-sm">{cert.fullName}</p>
            <p className="text-xs text-gray-500 mt-1">{cert.issuedBy}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
