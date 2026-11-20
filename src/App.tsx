/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { ParallaxHero } from './components/ParallaxHero';
import { AboutParallaxSection } from './components/AboutParallaxSection';
import { ActiveSkillFilter, ProjectsBento } from './components/ProjectsBento';
import { DossierDirectory } from './components/DossierDirectory';
import { AchievementsTimeline } from './components/AchievementsTimeline';
import { PersonalGallery } from './components/PersonalGallery';
import { SkillsAndContact } from './components/SkillsAndContact';
import { ExperimentalLabSection } from './components/ExperimentalLabSection';
import { ResumeDossierPage } from './components/ResumeDossierPage';
import { SubPageShell } from './components/SubPageShell';
import { Footer } from './components/Footer';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { GhumDetailPage } from './components/GhumDetailPage';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { TouchableSurfaceMouse } from './components/TouchableSurfaceMouse';
import { SELECTED_PROJECTS } from './data/portfolioData';
import type { DossierPageId } from './types/navigation';

const DOSSIER_PAGE_IDS: DossierPageId[] = ['about', 'journey', 'stack', 'gallery', 'resume', 'contact'];

type RouteState =
  | { kind: 'home' }
  | { kind: 'project'; projectId: string }
  | { kind: 'dossier'; pageId: DossierPageId };

function getRouteFromHash(): RouteState {
  if (typeof window === 'undefined') return { kind: 'home' };
  const hash = window.location.hash;

  const projectMatch = hash.match(/^#project\/([a-z0-9-]+)$/i);
  if (projectMatch) {
    const candidate = projectMatch[1].toLowerCase();
    if (candidate === 'ghum') return { kind: 'project', projectId: 'ghum' };
    if (SELECTED_PROJECTS.some((p) => p.id === candidate)) {
      return { kind: 'project', projectId: candidate };
    }
  }

  const pageMatch = hash.match(/^#page\/([a-z0-9-]+)$/i);
  if (pageMatch) {
    const candidate = pageMatch[1].toLowerCase() as DossierPageId;
    if (DOSSIER_PAGE_IDS.includes(candidate)) {
      return { kind: 'dossier', pageId: candidate };
    }
  }

  return { kind: 'home' };
}

export default function App() {
  const [activeSkillFilter, setActiveSkillFilter] = useState<ActiveSkillFilter | null>(null);
  const [route, setRoute] = useState<RouteState>(() => getRouteFromHash());

  // Sync browser Back/Forward hash navigation across Home, Project Pages, and Dossier Pages
  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openProjectPage = useCallback((projectId: string) => {
    setRoute({ kind: 'project', projectId });
    window.history.pushState(null, '', `#project/${projectId}`);
  }, []);

  const openDossierPage = useCallback((pageId: DossierPageId) => {
    setRoute({ kind: 'dossier', pageId });
    window.history.pushState(null, '', `#page/${pageId}`);
  }, []);

  const returnHome = useCallback((targetSection?: 'projects' | 'dossiers') => {
    setRoute({ kind: 'home' });
    const hashTarget = targetSection ? `#${targetSection}` : '#top';
    window.history.pushState(null, '', hashTarget);
    requestAnimationFrame(() => {
      if (targetSection) {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);

  const closeProjectPage = useCallback(() => {
    const returnTarget =
      route.kind === 'project' && route.projectId === 'ghum' ? 'dossiers' : 'projects';
    returnHome(returnTarget);
  }, [route, returnHome]);

  const handleSelectSkillFilter = (
    filter: ActiveSkillFilter | null,
    scrollToProjects = false
  ) => {
    setActiveSkillFilter(filter);
    if (filter && scrollToProjects) {
      returnHome('projects');
    }
  };

  const isGhumOpen = route.kind === 'project' && route.projectId === 'ghum';
  const selectedProject =
    route.kind === 'project' && !isGhumOpen
      ? SELECTED_PROJECTS.find((p) => p.id === route.projectId) ?? null
      : null;

  return (
    <MotionConfig reducedMotion="user">
      <Analytics />
      <ScrollProgressBar />
      <TouchableSurfaceMouse />
      <AnimatePresence mode="wait">
        {isGhumOpen ? (
          <GhumDetailPage key="project-page-ghum" onBack={closeProjectPage} />
        ) : selectedProject ? (
          <ProjectDetailPage
            key={`project-page-${selectedProject.id}`}
            project={selectedProject}
            onBack={closeProjectPage}
            onSelectProject={openProjectPage}
          />
        ) : route.kind === 'dossier' ? (
          <SubPageShell
            key={`dossier-page-${route.pageId}`}
            pageId={route.pageId}
            onBack={() => returnHome('dossiers')}
            onNavigatePage={openDossierPage}
          >
            {route.pageId === 'about' && <AboutParallaxSection />}
            {route.pageId === 'journey' && <AchievementsTimeline />}
            {route.pageId === 'stack' && (
              <>
                <SkillsAndContact
                  activeSkillFilter={activeSkillFilter}
                  onSelectSkillFilter={handleSelectSkillFilter}
                  onJumpToProjects={() => returnHome('projects')}
                  section="skills"
                />
                <ExperimentalLabSection />
              </>
            )}
            {route.pageId === 'gallery' && (
              <PersonalGallery onOpenGhum={() => openProjectPage('ghum')} />
            )}
            {route.pageId === 'resume' && <ResumeDossierPage />}
            {route.pageId === 'contact' && (
              <SkillsAndContact
                activeSkillFilter={activeSkillFilter}
                onSelectSkillFilter={handleSelectSkillFilter}
                section="contact"
              />
            )}
          </SubPageShell>
        ) : (
          <div key="portfolio-home" className="min-h-screen flex flex-col bg-[#fff1e8] text-[#3e1f0f]">
            <Navbar
              onOpenDossier={openDossierPage}
              onOpenGhum={() => openProjectPage('ghum')}
            />
            <main className="flex-1">
              <ParallaxHero
                onOpenProject={openProjectPage}
                onOpenDossier={openDossierPage}
              />
              <ProjectsBento
                activeSkillFilter={activeSkillFilter}
                onClearSkillFilter={() => setActiveSkillFilter(null)}
                onOpenProject={openProjectPage}
              />
              <DossierDirectory
                onOpenDossier={openDossierPage}
                onOpenGhum={() => openProjectPage('ghum')}
              />
            </main>
            <Footer
              onOpenDossier={openDossierPage}
              onOpenGhum={() => openProjectPage('ghum')}
            />
          </div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
