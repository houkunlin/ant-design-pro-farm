import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/layouts/layout.tsx";

export const Route = createFileRoute('/_pro_layout')({
  component: Layout,
})
