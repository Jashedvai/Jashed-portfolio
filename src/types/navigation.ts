export type DossierPageId = 'about' | 'journey' | 'stack' | 'gallery' | 'resume' | 'contact';

export interface DossierDirectoryEntry {
  id: DossierPageId | 'ghum';
  index: string;
  title: string;
  category: string;
  summary: string;
  targetType: 'dossier' | 'project';
}
