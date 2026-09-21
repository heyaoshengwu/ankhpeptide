"use client";

import dynamic from "next/dynamic";

const MoleculeViewer = dynamic(() => import("@/components/3d/molecule-viewer"), {
  ssr: false,
  loading: () => null,
});

export default function MoleculeViewerWrapper() {
  return <MoleculeViewer />;
}
