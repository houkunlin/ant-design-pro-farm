import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

export const Route = createFileRoute('/_pro_layout/')({
  component: lazy(() => import('@/pages/EmptyPage.tsx')),
});
