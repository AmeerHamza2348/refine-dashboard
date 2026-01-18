"use client";

import { Suspense } from "react";

import { WelcomePage } from "@refinedev/core";
import DashboardPage from "@app/dashboard/page";

export default function IndexPage() {
  return (
    <Suspense>
      <DashboardPage />
    </Suspense>
  );
}
