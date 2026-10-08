"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { sidebarData, getSubItemUrl } from "@/components/app-sidebar";

interface RouteMeta {
  title: string;
  parentTitle?: string;
  url?: string;
}

interface CrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

// Hoist static lookup maps outside the component (Vercel Best Practice: js-index-maps & rendering-hoist-jsx)
const routeLookup = new Map<string, RouteMeta>();

for (const item of sidebarData.navMain) {
  if (item.url && item.url !== "#") {
    routeLookup.set(item.url, {
      title: item.title,
      url: item.url,
    });
  }

  if (item.items && item.items.length > 0) {
    for (const subItem of item.items) {
      if (subItem.url && subItem.url !== "#") {
        const fullUrl = getSubItemUrl(item.url, subItem.url);
        routeLookup.set(fullUrl, {
          title: subItem.title,
          parentTitle: item.title,
          url: fullUrl,
        });
      }
    }
  }
}

function formatSegmentTitle(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function resolveBreadcrumbs(pathname: string): CrumbItem[] {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  // Root or /dashboard
  if (normalizedPath === "/" || normalizedPath === "/dashboard") {
    return [{ label: "Dashboard", isCurrentPage: true }];
  }

  // Exact match from dynamic sidebar data
  const exactMatch = routeLookup.get(normalizedPath);
  if (exactMatch) {
    const crumbs: CrumbItem[] = [{ label: "Dashboard", href: "/dashboard" }];

    if (exactMatch.parentTitle) {
      crumbs.push({ label: exactMatch.parentTitle });
    }

    crumbs.push({
      label: exactMatch.title,
      isCurrentPage: true,
    });

    return crumbs;
  }

  // Fallback for nested or parameterized sub-routes
  const segments = normalizedPath.split("/").filter(Boolean);
  const crumbs: CrumbItem[] = [{ label: "Dashboard", href: "/dashboard" }];

  let accumulatedPath = "";
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]!;
    accumulatedPath += `/${segment}`;
    const isLast = i === segments.length - 1;

    // Check if the accumulated path matches any known route in sidebarData
    const matched = routeLookup.get(accumulatedPath);
    const label = matched ? matched.title : formatSegmentTitle(segment);

    if (isLast) {
      crumbs.push({ label, isCurrentPage: true });
    } else {
      crumbs.push({
        label,
        href: matched ? matched.url : accumulatedPath,
      });
    }
  }

  return crumbs;
}

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Derive crumbs synchronously during render without useEffect (Vercel Best Practice: rerender-derived-state-no-effect)
  const crumbs = resolveBreadcrumbs(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <React.Fragment key={`${crumb.label}-${index}`}>
              <BreadcrumbItem>
                {crumb.isCurrentPage || isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : crumb.href ? (
                  <BreadcrumbLink render={<Link href={crumb.href} />}>
                    {crumb.label}
                  </BreadcrumbLink>
                ) : (
                  <span className="text-muted-foreground">{crumb.label}</span>
                )}
              </BreadcrumbItem>
              {!isLast ? <BreadcrumbSeparator /> : null}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
