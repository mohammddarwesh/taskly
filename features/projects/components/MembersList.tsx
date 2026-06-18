import { ProjectMember } from '../types/project.types';
import { MemberRow } from './MemberRow';

interface Props {
  members: ProjectMember[];
}

export function MembersList({ members }: Props) {
  if (members.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary">
        No members found in this project.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {members.map((member) => (
        <MemberRow key={member.id} member={member} />
      ))}
    </div>
  );
}