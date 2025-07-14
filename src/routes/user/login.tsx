import { createFileRoute } from '@tanstack/react-router'
import { lazy } from "react";

export const Route = createFileRoute('/user/login')({
  component: lazy(() => import('@/pages/user/login.tsx')),
})
