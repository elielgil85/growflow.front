'use client';

import React, { useState, useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarFooter } from '@/components/ui/sidebar';
import { Home, ListTodo, BarChart2, Settings, Leaf, LogOut } from 'lucide-react';
import { useTaskStore } from '@/store/task-store';
import GardenView from '@/components/views/garden-view';
import TaskListView from '@/components/views/task-list-view';
import StatsView from '@/components/views/stats-view';
import CustomizeView from '@/components/views/customize-view';
import { useI18n } from '@/context/i18n-context';
import { useAuth } from '@/context/auth-context';
import { type Task } from '@/types';

type View = 'garden' | 'tasks' | 'stats' | 'customize';

function MainApp() {
  const [view, setView] = useState<View>('garden');
  const { t } = useI18n();
  const { logout, isAuthenticated, fetchTasks } = useAuth();
  const { setTasks } = useTaskStore();
  
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const viewTitles: Record<View, string> = {
    garden: t('sidebar.garden'),
    tasks: t('sidebar.tasks'),
    stats: t('sidebar.stats'),
    customize: t('sidebar.customize'),
  };

  useEffect(() => {
    const getTasks = async () => {
      if (isAuthenticated) {
        try {
          setIsLoadingTasks(true);
          const tasksData: Task[] = await fetchTasks();
          setTasks(tasksData);
          setError(null);
        } catch (err) {
          console.error('Failed to get tasks:', err);
          setError('Falha ao carregar as tarefas. Por favor, tente novamente.');
        } finally {
          setIsLoadingTasks(false);
        }
      } else {
        setIsLoadingTasks(false);
      }
    };
  
    getTasks();
  }, [isAuthenticated, fetchTasks, setTasks]);

  const renderView = () => {
    switch (view) {
      case 'garden':
        return <GardenView />;
      case 'tasks':
        return <TaskListView />;
      case 'stats':
        return <StatsView />;
      case 'customize':
        return <CustomizeView />;
      default:
        return <GardenView />;
    }
  };

  return (
    <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-4">
              <Leaf className="text-primary h-8 w-8" />
              <h1 className="text-2xl font-headline font-bold text-foreground group-data-[collapsible=icon]:hidden">GrowFlow</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setView('garden')} isActive={view === 'garden'} tooltip={t('sidebar.garden')}>
                  <Home />
                  <span>{t('sidebar.garden')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setView('tasks')} isActive={view === 'tasks'} tooltip={t('sidebar.tasks')}>
                  <ListTodo />
                  <span>{t('sidebar.tasks')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setView('stats')} isActive={view === 'stats'} tooltip={t('sidebar.stats')}>
                  <BarChart2 />
                  <span>{t('sidebar.stats')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setView('customize')} isActive={view === 'customize'} tooltip={t('sidebar.customize')}>
                  <Settings />
                  <span>{t('sidebar.customize')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton onClick={logout} tooltip="Sair">
                        <LogOut />
                        <span>Sair</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <div className="p-4 md:p-6 h-full flex flex-col">
                <header className="flex items-center justify-between md:justify-end mb-6 shrink-0">
                    <SidebarTrigger className="md:hidden" />
                    <h1 className="text-3xl font-headline capitalize font-bold">{viewTitles[view]}</h1>
                </header>
                <div className="flex-grow overflow-hidden">
                    {isLoadingTasks ? (
                        <div className="flex flex-col gap-4 items-center justify-center h-full">
                            <Leaf className="h-12 w-12 animate-spin text-primary" />
                            <p className="text-lg text-muted-foreground font-headline">{t('loading.message')}</p>
                        </div>
                    ) : (
                       renderView()
                    )}
                </div>
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}


export default function GrowFlowApp() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen bg-background">
          <Leaf className="h-16 w-16 animate-spin text-primary" />
          <p className="text-xl text-muted-foreground font-headline">Carregando...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null; 
  }

  return <MainApp />
}
