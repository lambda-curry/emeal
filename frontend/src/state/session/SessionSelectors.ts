import { SessionState } from './SessionProvider';

export const isAuthenticated = (state: SessionState) => !!state.user.name;
export const selectedProject = (state: SessionState) => state.selectedProject;
export const selectDefaultProject = (state: SessionState) =>
  state.projects[0]?.id;
