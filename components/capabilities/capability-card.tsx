import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CapabilityCardProps {
  title: string;
  description: string;
  metrics?: { label: string; value: string }[];
  icon?: React.ReactNode;
}

export function CapabilityCard({ title, description, metrics, icon }: CapabilityCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary-600">{icon}</div>}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        {metrics && (
          <div className="grid grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="text-2xl font-bold text-primary-600">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.label}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
