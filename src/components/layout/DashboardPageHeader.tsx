interface DashboardPageHeaderProps {
  activeNavItemKey?: string;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

export function DashboardPageHeader({
  activeNavItemKey,
  t,
}: DashboardPageHeaderProps) {
  return (
    <div className="border-b-2 px-6 py-4">
      <h1 className="text-2xl font-bold tracking-tight">
        {t(
          activeNavItemKey
            ? `navigation.sidebar.${activeNavItemKey}`
            : "dashboard.title",
        )}
      </h1>
      <p className="text-muted-foreground">
        {t(
          activeNavItemKey
            ? `dashboard.${activeNavItemKey}.description`
            : "dashboard.description",
          {
            defaultValue: t(`navigation.sidebar.${activeNavItemKey}`),
          },
        )}
      </p>
    </div>
  );
}
