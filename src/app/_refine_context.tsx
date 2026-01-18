"use client";

import { Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import "@/app/globals.css";
import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";
import { dataProvider } from "@providers/data-provider";
import { BookOpen, LayoutDashboardIcon } from "lucide-react";
import { Layout } from "@components/refine-ui/layout/layout";
import { Outlet } from "react-router";

type RefineContextProps = {
  children: React.ReactNode;
};

export const RefineContext = ({ children }: RefineContextProps) => {
  const notificationProvider = useNotificationProvider();

  return (
    <RefineKbarProvider>
      <ThemeProvider>
        <Refine
          dataProvider={dataProvider}
          notificationProvider={notificationProvider}
          routerProvider={routerProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
          resources={[
            {
              name: "dashboard",
              list: "/dashboard",
              meta: { label: "Dashboard", icon: <LayoutDashboardIcon /> },
            },
            {
              name: "subjects",
              list: "/subjects",
              create: "/subjects/create",
              meta: { label: "Subjects", icon: <BookOpen /> },
            },
          ]}
        >
          <Layout>
            <Outlet />
            {children}
          </Layout>
        </Refine>
      </ThemeProvider>
    </RefineKbarProvider>
  );
};
